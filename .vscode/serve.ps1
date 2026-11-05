param([switch]$StopExisting)

$ErrorActionPreference = 'Stop'
$root = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$rootPrefix = $root.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
$serverScript = [System.IO.Path]::GetFullPath($PSCommandPath)

if ($StopExisting) {
    $excludedProcessIds = @($PID)
    $ancestor = Get-CimInstance Win32_Process -Filter "ProcessId = $PID" -ErrorAction SilentlyContinue
    while ($ancestor.ParentProcessId) {
        $parentId = [int]$ancestor.ParentProcessId
        $excludedProcessIds += $parentId
        $ancestor = Get-CimInstance Win32_Process -Filter "ProcessId = $parentId" -ErrorAction SilentlyContinue
        if (-not $ancestor) { break }
    }

    $managedProcesses = Get-CimInstance Win32_Process | Where-Object {
        $_.ProcessId -notin $excludedProcessIds -and
        $_.CommandLine -and
        $_.CommandLine.IndexOf($serverScript, [System.StringComparison]::OrdinalIgnoreCase) -ge 0
    }
    foreach ($process in $managedProcesses) {
        Stop-Process -Id $process.ProcessId
    }
    exit 0
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Prefixes.Add('http://127.0.0.1:8080/')
$listener.Prefixes.Add('http://[::1]:8080/')

try {
    $listener.Start()
    Write-Host 'Serving Damol Concept at http://localhost:8080 and http://127.0.0.1:8080'

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $response = $context.Response

        try {
            $relativePath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath.TrimStart('/'))
            if ([string]::IsNullOrWhiteSpace($relativePath)) {
                $relativePath = 'index.html'
            }

            $filePath = [System.IO.Path]::GetFullPath((Join-Path $root $relativePath))
            if (-not $filePath.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase) -or -not [System.IO.File]::Exists($filePath)) {
                $response.StatusCode = 404
                $body = [System.Text.Encoding]::UTF8.GetBytes('Not Found')
                $response.ContentType = 'text/plain; charset=utf-8'
            } else {
                $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
                $contentType = switch ($extension) {
                    '.html' { 'text/html; charset=utf-8' }
                    '.css' { 'text/css; charset=utf-8' }
                    '.js' { 'text/javascript; charset=utf-8' }
                    '.webmanifest' { 'application/manifest+json; charset=utf-8' }
                    '.png' { 'image/png' }
                    '.jpg' { 'image/jpeg' }
                    '.jpeg' { 'image/jpeg' }
                    '.svg' { 'image/svg+xml' }
                    '.json' { 'application/json; charset=utf-8' }
                    default { 'application/octet-stream' }
                }
                $body = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentType = $contentType
            }

            $response.ContentLength64 = $body.Length
            if ($context.Request.HttpMethod -ne 'HEAD') {
                $response.OutputStream.Write($body, 0, $body.Length)
            }
        } catch {
            Write-Error "Request failed: $($_.Exception.Message)"
            $response.StatusCode = 500
        } finally {
            $response.Close()
        }
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
