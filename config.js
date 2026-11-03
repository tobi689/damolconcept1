/* =============================================
   DAMOL CONCEPT — SITE CONFIG
   Edit this file to change prices, counters, 
   services list, FAQs and sample data.
   ============================================= */

// ---- HERO COUNTERS (edit these numbers) ----
window.SITE_CONFIG = {
  counters: {
    projects: 250,
    satisfaction: 98,
    years: 7
  },

  // User-supplied library shelf photos used in the homepage carousel.
  universityLibraries: [
    { image: 'assets/libraries/supplied/library-shelf-1.jpg' },
    { image: 'assets/libraries/supplied/library-shelf-2.jpg' },
    { image: 'assets/libraries/supplied/library-shelf-3.jpg' },
    { image: 'assets/libraries/supplied/library-shelf-4.jpg' },
    { image: 'assets/libraries/supplied/library-shelf-5.jpg' }
  ],

  // ---- PRICES IN NAIRA (NGN) ----
  // Base prices per service & level
  prices: {
    'undergraduate-project': { undergraduate: 35000, postgraduate: 50000 },
    'masters-thesis':        { undergraduate: 60000, postgraduate: 80000 },
    'dissertation':          { undergraduate: 70000, postgraduate: 90000 },
    'questionnaire':         { undergraduate: 15000, postgraduate: 20000 },
    'chapter-four':          { undergraduate: 20000, postgraduate: 30000 },
    'spss-analysis':         { undergraduate: 18000, postgraduate: 25000 },
    'defense-guide':         { undergraduate: 12000, postgraduate: 18000 },
    'proofreading':          { undergraduate: 10000, postgraduate: 15000 },
    'powerpoint':            { undergraduate: 12000, postgraduate: 18000 }
  },

  // Urgency surcharge (added to base price)
  urgency: {
    same_day:   0.5,   // +50% if deadline within 1 day
    three_days: 0.25,  // +25% if deadline within 3 days
    one_week:   0.10,  // +10% if deadline within 7 days
    normal:     0      // no surcharge if deadline > 7 days
  },

  // Deposit percentage
  depositPercent: 0.5,

  // ---- SERVICES LIST ----
  services: [
    { id: 'undergraduate-project', icon: '📚', name: 'Undergraduate Project Writing', desc: 'One-to-one guidance to plan, develop, and improve your project from topic to final review.', details: 'Get practical, step-by-step support for your undergraduate research while staying in control of your ideas and academic work.', includes: ['Topic refinement, objectives, and research questions', 'Chapter structure and literature-search guidance', 'Methodology planning and clear presentation of your own results', 'Editing, referencing, and alignment with your department’s guidelines'] },
    { id: 'masters-thesis',        icon: '🎓', name: "Master's Thesis Support", desc: 'Focused research coaching and editing for postgraduate thesis work.', details: 'Move your thesis forward with structured feedback that respects your university requirements and research decisions.', includes: ['Proposal and chapter-by-chapter review', 'Research design and methods guidance', 'Results presentation and interpretation support', 'Academic editing, referencing, and formatting'] },
    { id: 'dissertation',          icon: '📖', name: 'Dissertation Support', desc: 'Research planning, developmental feedback, and editing for doctoral work.', details: 'Receive a clear, collaborative review process for complex doctoral research, from refining the research plan to preparing a polished draft.', includes: ['Research question and scope refinement', 'Structure and argument development', 'Methods and analysis consultation', 'Detailed editing and submission-readiness checks'] },
    { id: 'questionnaire',         icon: '📋', name: 'Questionnaire Design', desc: 'Develop clear survey questions that align with your objectives and study population.', details: 'Build a questionnaire that is easy to understand, logically ordered, and appropriate for the research questions in your approved study.', includes: ['Question-to-objective mapping', 'Clear wording and response options', 'Layout and flow review', 'Guidance on pilot testing and instrument review'] },
    { id: 'chapter-four',          icon: '📊', name: 'Chapter Four Only', desc: 'Organise your data, tables, and findings into a clear results chapter.', details: 'Get support presenting and explaining your collected data accurately, with a clear link between your research questions, analysis, and findings.', includes: ['Data checking and analysis planning', 'Readable tables and charts', 'Results write-up and interpretation', 'Consistency checks against your methodology'] },
    { id: 'spss-analysis',         icon: '📈', name: 'SPSS Data Analysis', desc: 'Guidance with selecting, running, and interpreting statistical analyses.', details: 'Choose appropriate analyses for your study and learn what the output means. Analysis is based on your data and research design.', includes: ['Data coding and screening guidance', 'Descriptive and inferential analysis support', 'Readable output tables', 'Plain-language interpretation of results'] },
    { id: 'defense-guide',         icon: '🎤', name: 'Defense Reading Guide', desc: 'Prepare to explain your research clearly and confidently at your defense.', details: 'Practise communicating your own research, explaining your methods, and responding thoughtfully to likely questions.', includes: ['Concise project summary', 'Topic-specific practice questions', 'Presentation structure and delivery tips', 'Optional mock defense discussion'] },
    { id: 'proofreading',          icon: '✍️', name: 'Proofreading & Editing', desc: 'Improve clarity, grammar, academic tone, and consistency in your own draft.', details: 'Receive careful editing that improves readability while preserving your meaning, voice, and responsibility for the submitted work.', includes: ['Grammar, punctuation, and sentence clarity', 'Consistency in headings and terminology', 'Reference and citation-format checks', 'Comments on passages that may need your clarification'] },
    { id: 'powerpoint',            icon: '💻', name: 'PowerPoint Presentation', desc: 'Turn your research into clear, well-structured slides for a seminar or defense.', details: 'Organise the key parts of your research into a readable presentation that helps you explain your work to an audience.', includes: ['Logical slide sequence and concise text', 'Tables, charts, and visual hierarchy', 'Consistent academic styling', 'Speaker notes or presentation guidance on request'] }
  ],

  // ---- SAMPLE PROJECTS ----
  samples: [
    {
      tag: 'Faculty of Science · Microbiology',
      title: 'A Study Outline for Testing the Antimicrobial Activity of Selected Plant Extracts',
      dept: 'Microbiology', level: 'B.Sc', pages: 'Outline',
      abstract: 'This illustrative project outline explores how selected plant extracts could be prepared and evaluated for antimicrobial activity against chosen test organisms. It introduces the research problem, explains the proposed laboratory approach, and shows how observations could be recorded and discussed. Any actual results, organisms, procedures, and conclusions must come from the student’s approved study and laboratory data.',
      introduction: 'The introduction would set out the background to antimicrobial research, explain the local and scientific context for selecting the plant materials, and define the problem the study intends to address. It would then state the aim, specific objectives, research questions, scope, and significance, using current sources and the department’s required format.',
      toc: [
        { chapter: true, title: 'CHAPTER ONE: Introduction', page: 1 },
        { chapter: false, title: '1.1 Background of Study', page: 1 },
        { chapter: false, title: '1.2 Statement of the Problem', page: 3 },
        { chapter: false, title: '1.3 Aim and Objectives', page: 5 },
        { chapter: false, title: '1.4 Research Questions', page: 6 },
        { chapter: false, title: '1.5 Scope and Significance', page: 7 },
        { chapter: true, title: 'CHAPTER TWO: Literature Review', page: 9 },
        { chapter: false, title: '2.1 Plant-Derived Compounds', page: 10 },
        { chapter: false, title: '2.2 Antimicrobial Testing Methods', page: 15 },
        { chapter: false, title: '2.3 Review of Related Studies', page: 20 },
        { chapter: true, title: 'CHAPTER THREE: Materials and Methods', page: 27 },
        { chapter: false, title: '3.1 Study Materials and Preparation', page: 28 },
        { chapter: false, title: '3.2 Proposed Laboratory Procedures', page: 31 },
        { chapter: true, title: 'CHAPTER FOUR: Results and Discussion', page: 38 },
        { chapter: false, title: '4.1 Presentation of Observations', page: 39 },
        { chapter: true, title: 'CHAPTER FIVE: Conclusion and Recommendations', page: 48 },
        { chapter: false, title: 'References and Appendices', page: 52 }
      ]
    },
    {
      tag: 'Faculty of Science · Computer Science',
      title: 'Design of a Web-Based Laboratory Equipment Inventory System',
      dept: 'Computer Science', level: 'B.Sc', pages: 'Outline',
      abstract: 'This illustrative project outline presents the design of a web-based system for recording laboratory equipment, tracking availability, and maintaining an organised inventory. It describes a proposed requirements-gathering and software-development process, with attention to user roles, data integrity, and usability. System evaluation and conclusions would be based on implementation evidence collected by the student.',
      introduction: 'The introduction would explain why reliable equipment records matter in teaching laboratories, identify common inventory-management challenges, and define the system proposed to address them. It would present the project aim, specific objectives, scope, significance, and a short explanation of key terms.',
      toc: [
        { chapter: true, title: 'CHAPTER ONE: Introduction', page: 1 },
        { chapter: false, title: '1.1 Background of Study', page: 1 },
        { chapter: false, title: '1.2 Problem Statement and Motivation', page: 3 },
        { chapter: false, title: '1.3 Aim and Objectives', page: 5 },
        { chapter: false, title: '1.4 Scope and Significance', page: 6 },
        { chapter: true, title: 'CHAPTER TWO: Literature Review', page: 8 },
        { chapter: false, title: '2.1 Inventory Information Systems', page: 9 },
        { chapter: false, title: '2.2 Web Application Design Concepts', page: 14 },
        { chapter: false, title: '2.3 Review of Existing Systems', page: 19 },
        { chapter: true, title: 'CHAPTER THREE: System Analysis and Design', page: 25 },
        { chapter: false, title: '3.1 Requirements and Use Cases', page: 26 },
        { chapter: false, title: '3.2 Database and Interface Design', page: 31 },
        { chapter: true, title: 'CHAPTER FOUR: Implementation and Evaluation', page: 39 },
        { chapter: false, title: '4.1 System Modules and Testing', page: 40 },
        { chapter: true, title: 'CHAPTER FIVE: Summary and Conclusion', page: 49 },
        { chapter: false, title: 'References and Appendices', page: 53 }
      ]
    },
    {
      tag: 'Faculty of Science · Chemistry',
      title: 'Assessment of Selected Physicochemical Parameters in a Local Water Source',
      dept: 'Chemistry', level: 'B.Sc', pages: 'Outline',
      abstract: 'This illustrative outline demonstrates a study plan for assessing selected physicochemical parameters in a local water source. It describes how a student could define sampling locations, document approved analytical procedures, and compare measured values with relevant standards. No measurements or claims of water safety are provided here; all findings must be generated from properly collected and analysed samples.',
      introduction: 'The introduction would describe the importance of water-quality monitoring, provide context for the selected water source, and explain the need for the proposed assessment. It would define the research problem, aim, objectives, scope, and significance, while identifying the parameters and standards relevant to the approved study.',
      toc: [
        { chapter: true, title: 'CHAPTER ONE: Introduction', page: 1 },
        { chapter: false, title: '1.1 Background and Context', page: 1 },
        { chapter: false, title: '1.2 Statement of the Problem', page: 3 },
        { chapter: false, title: '1.3 Aim, Objectives, and Research Questions', page: 5 },
        { chapter: true, title: 'CHAPTER TWO: Literature Review', page: 8 },
        { chapter: false, title: '2.1 Water Quality Concepts', page: 9 },
        { chapter: false, title: '2.2 Physicochemical Parameters', page: 14 },
        { chapter: false, title: '2.3 Relevant Standards and Prior Studies', page: 20 },
        { chapter: true, title: 'CHAPTER THREE: Materials and Methods', page: 27 },
        { chapter: false, title: '3.1 Sampling Plan and Sample Handling', page: 28 },
        { chapter: false, title: '3.2 Proposed Laboratory Analysis', page: 32 },
        { chapter: true, title: 'CHAPTER FOUR: Results and Discussion', page: 40 },
        { chapter: false, title: '4.1 Results by Sampling Location', page: 41 },
        { chapter: true, title: 'CHAPTER FIVE: Conclusion and Recommendations', page: 50 },
        { chapter: false, title: 'References and Appendices', page: 54 }
      ]
    },
    {
      tag: 'Faculty of Science · Environmental Science',
      title: 'Review of Solid-Waste Sorting Practices in a Selected Community',
      dept: 'Environmental Science', level: 'B.Sc', pages: 'Outline',
      abstract: 'This illustrative outline describes a community-based study of household solid-waste sorting practices. It shows how a researcher could define the study area, prepare an appropriate data-collection plan, and organise observations or survey responses. The sample contains no real participant data or conclusions; the final analysis must reflect the student’s approved methods and collected evidence.',
      introduction: 'The introduction would explain the environmental context of household waste management, describe the selected community using appropriate sources, and define the problem being investigated. It would set out the aim, objectives, research questions, scope, and significance, with clear attention to ethical data collection where residents are involved.',
      toc: [
        { chapter: true, title: 'CHAPTER ONE: Introduction', page: 1 },
        { chapter: false, title: '1.1 Background of the Study', page: 1 },
        { chapter: false, title: '1.2 Statement of the Problem', page: 4 },
        { chapter: false, title: '1.3 Aim, Objectives, and Research Questions', page: 6 },
        { chapter: false, title: '1.4 Scope and Significance', page: 8 },
        { chapter: true, title: 'CHAPTER TWO: Literature Review', page: 10 },
        { chapter: false, title: '2.1 Solid-Waste Management Concepts', page: 11 },
        { chapter: false, title: '2.2 Waste Sorting and Community Practice', page: 16 },
        { chapter: false, title: '2.3 Related Studies and Research Gap', page: 22 },
        { chapter: true, title: 'CHAPTER THREE: Methodology', page: 29 },
        { chapter: false, title: '3.1 Study Area and Research Design', page: 30 },
        { chapter: false, title: '3.2 Sampling, Instrument, and Ethics', page: 34 },
        { chapter: true, title: 'CHAPTER FOUR: Results and Discussion', page: 42 },
        { chapter: false, title: '4.1 Presentation of Study Findings', page: 43 },
        { chapter: true, title: 'CHAPTER FIVE: Summary and Recommendations', page: 52 },
        { chapter: false, title: 'References and Appendices', page: 56 }
      ]
    }
  ],

  // ---- PROOF SCREENSHOTS ----
  proofCards: [
    { img: 'assets/proof-1.png', title: 'Presentation Feedback', caption: 'A student shares their supervisor’s positive response to the presentation slides.' },
    { img: 'assets/proof-2.png', title: 'Project Result', caption: 'A student shares their project result and appreciation.' },
    { img: 'assets/proof-3.png', title: 'Oral Presentation', caption: 'A student shares feedback after an oral presentation.' },
    { img: 'assets/proof-4.png', title: 'Payment Confirmation', caption: 'Payment confirmation for project support.' },
    { img: 'assets/proof-5.png', title: 'Editing and Revision Support', caption: 'Project editing support and follow-up.' },
    { img: 'assets/proof-6.png', title: 'Project Delivery Feedback', caption: 'A student confirms satisfaction after reviewing delivered project files.' }
  ],

  // ---- TESTIMONIALS ----
  testimonials: [
    { name: 'Tosin', uni: 'FUOYE', text: 'I got an A (81) in my project. Thank you so much.' },
    { name: 'Shola', uni: 'ABUAD', text: 'I had my oral presentation today, and everyone was highly impressed. Thank you, and God bless.' },
    { name: 'Daniel', uni: 'EKSU', text: 'I have seen the PDFs and everything you sent. Thank you so much; I’m satisfied with what I have seen.' },
    { name: 'Dolapo', uni: 'FUTA', text: 'I showed the slides today and my supervisor said she really liked them.' }
  ],

  // ---- FAQ ----
  faqs: [
    { q: 'Is my personal and project information kept confidential?', a: 'Absolutely. We have a strict no-disclosure policy. Your name, topic, institution and all project details are never shared with any third party. All communications are private and all files are securely deleted after delivery.' },
    { q: 'How long does it take to complete a project?', a: 'Delivery time depends on the service and complexity. A full undergraduate project typically takes 7–14 working days. SPSS analysis and chapter four can be done in 2–5 days. Rush orders are available for an additional fee. Your deadline is always respected.' },
    { q: 'How many revisions do I get?', a: 'We offer free unlimited revisions within 14 days of delivery, as long as the revision request falls within the original project brief. We work until you are completely satisfied with the output.' },
    { q: 'How do I pay, and is payment secure?', a: 'We use Paystack — Nigeria\'s most trusted payment gateway. You can pay with your ATM/debit card, bank transfer, or USSD. You may choose to pay a 50% deposit upfront and the balance on delivery. All transactions are encrypted and secure.' },
    { q: 'How does the defense preparation work?', a: 'Our defense reading guide includes a thorough summary of your project, anticipated questions from panels, model answers tailored to your topic and methodology, plus tips on presentation delivery and body language. We can also do a mock defense session via WhatsApp call.' },
    { q: 'How do I contact support if I have an issue?', a: 'You can reach us 24/7 via WhatsApp at +234 707 136 8610. You can also send an email to info@damolconcept.com. We typically respond within 30 minutes during business hours and within 2 hours at night.' }
  ],

  // Paystack public key (test)
  paystackPublicKey: 'pk_test_REPLACE_WITH_YOUR_PAYSTACK_PUBLIC_KEY'
};
