export const profile = {
  name: "Salman Rishad",
  role: "Head of Quality Assurance",
  tagline: "Building bulletproof software for 17+ years",
  location: "Dhaka, Bangladesh",
  email: "mail.salmanrishad@gmail.com",
  linkedin: "https://www.linkedin.com/in/salman-rishad-755bbb11/",
  resumeUrl: "/Salman-Rishad-CV.pdf",
  photo: "/images/salman-rishad.jpg",
  roles: [
    "Head of Quality Assurance",
    "CMMI Level 5 Practitioner",
    "Test Automation Architect",
    "QA Team Leader",
  ],
  summary: [
    "I have over 17 years of experience in the field of Software Quality Assurance. Throughout my career, I have worked extensively with the Software Development Life Cycle (SDLC) and have led the implementation of internationally recognized standards such as CMMI Level 5 and ISO across organizations. I have trained and mentored colleagues on integrating these standards into their day-to-day work, helping teams consistently improve the quality of their deliverables.",
    "I have significant experience in software validation and testing, playing key roles in testing initiatives for both national and international software companies — delivering solutions across diverse domains, from large financial institutions to tourism and resource exploration. This broad exposure has equipped me with the confidence and adaptability to support any organization seeking robust quality assurance and quality control practices.",
  ],
};

export const stats = [
  { label: "Years in QA", value: "17+" },
  { label: "CMMI Level", value: "5" },
  { label: "Engineers Led", value: "17" },
  { label: "Companies Served", value: "6" },
];

export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  location: string;
  note?: string;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    period: "Feb 2024 — Present",
    role: "Head of Quality Assurance",
    company: "Vivasoft Limited",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Leading a QA team of 17 engineers",
      "Own software quality across the organization",
      "Design and run training programs on quality standards",
      "Own QA delivery for foreign clients, end to end",
      "Drive end-to-end test automation strategy",
      "Hands-on manual testing for client-critical releases",
    ],
  },
  {
    period: "Nov 2022 — Jan 2024",
    role: "Senior Quality Assurance Engineer",
    company: "BlueDev Limited",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Authored test cases and business requirement analysis",
      "Built and maintained automated test suites",
      "Ran story, sanity, and regression testing cycles",
      "Partnered closely with product and development teams",
    ],
  },
  {
    period: "Oct 2015 — Oct 2022",
    role: "Senior QA",
    company: "TenderEasy AB",
    location: "Dhaka office · Sweden-based company",
    highlights: [
      "Authored test cases and business requirement analysis",
      "Ran story, sanity, and regression testing cycles",
      "Maintained tight feedback loops with product & dev teams",
      "Owned bug reporting and triage",
    ],
  },
  {
    period: "Sep 2014 — Sep 2015",
    role: "Project Manager",
    company: "Southtech Limited",
    location: "Dhaka, Bangladesh",
    highlights: [
      "Owned project planning, monitoring, and control",
      "Maintained project quality per CMMI and ISO 9001:2000",
      "Led business analysis and direct client engagement",
      "Oversaw system, unit, installation, and integration testing",
    ],
  },
  {
    period: "Oct 2013 — Aug 2014",
    role: "Senior QA Engineer",
    company: "Bootlight Limited",
    location: "Dhaka office · Canada-based outsourcing company",
    highlights: [
      "Wrote test cases from business requirements",
      "Executed black box, regression, and sanity testing across desktop & mobile",
      "Coordinated directly with business analysts and developers on defects",
    ],
  },
  {
    period: "Feb 2006 — Sep 2013",
    role: "Head of Quality Assurance",
    company: "Southtech Limited",
    location: "Dhaka, Bangladesh — with operations in Myanmar, Bhutan",
    note: "Also served as Project Manager, Compliance Manager, QA Consultant, and Team Leader across this tenure.",
    highlights: [
      "Managed a QA team of 12 across concurrent projects",
      "Owned QMS improvement planning and internal audits",
      "Acted as Management Representative, running Management Review Meetings",
      "Reviewed project plans and work breakdown structures organization-wide",
      "Delivered system, installation, and integration testing at scale",
    ],
  },
];

export const skillCategories = [
  {
    title: "Standards & Governance",
    description: "Process maturity and compliance leadership.",
    skills: [
      "CMMI Level 5",
      "ISO 9001",
      "Internal Quality Audits",
      "QMS Improvement Planning",
    ],
  },
  {
    title: "Testing & Automation",
    description: "End-to-end coverage, manual to automated.",
    skills: [
      "End-to-End Test Automation",
      "Manual Testing",
      "System, Regression & Smoke Testing",
      "UAT Planning & Execution",
    ],
  },
  {
    title: "Requirements & Reporting",
    description: "Turning ambiguity into traceable quality.",
    skills: [
      "Requirement Analysis",
      "Test Case Design",
      "Test & Quality Reporting",
      "Business Requirement Analysis",
    ],
  },
  {
    title: "Leadership & Enablement",
    description: "Scaling quality through people.",
    skills: [
      "QA Team Management",
      "User & Team Training",
      "Cross-functional Communication",
      "Client-facing QA Ownership",
    ],
  },
];

export const tools = [
  "Cypress",
  "Playwright",
  "Selenium WebDriver",
  "Selenium IDE",
  "JMeter",
  "TestRail",
  "JIRA",
  "Bugzilla",
  "Enterprise Architect",
];

export const certifications = [
  "ISMS 27001:2005 Lead Auditor Course",
  "CMMI Software Testing Training — QAI India",
  "CMMI Project Monitoring and Control — QAI India",
  "CMMI Internal Auditor — QAI India",
];

export const education = [
  {
    degree: "B.Sc. Honors, Computer Science",
    institute: "Institute of Science Trade and Technology (ISTT), National University",
    year: "2002",
  },
  {
    degree: "Higher Secondary Certificate (Science)",
    institute: "Dhaka City College, Dhaka",
    year: "1998",
  },
  {
    degree: "Secondary School Certificate (Science) — 1st Division, Star Marks",
    institute: "Kakoli High School, Dhaka",
    year: "1996",
  },
];

export const portfolioPlaceholders = [
  {
    title: "Test Automation Framework",
    description: "A case study on scaling an end-to-end suite across Cypress and Playwright — coming soon.",
  },
  {
    title: "CMMI L5 Rollout",
    description: "How a QA org adopted CMMI Level 5 practices without slowing delivery — coming soon.",
  },
  {
    title: "QA Team Playbook",
    description: "Frameworks for hiring, training, and scaling a 17-person QA function — coming soon.",
  },
];
