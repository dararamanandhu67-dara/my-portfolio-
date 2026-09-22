// ---------------------------------------------------------------------------
// PORTFOLIO DATA — edit everything personal here.
// Change a value once and it updates across the whole site.
// NOTE: nothing here is invented. Missing info = placeholder.
// ---------------------------------------------------------------------------

export const personal = {
  name: "DARA RAMANANDHU",
  firstName: "DARA RAMANANDHU",
  role: "B.Tech Data Science Student | Aspiring Data Scientist | Developer",
  headline: "Building practical solutions with Data, Code & Technology.",
  description:
    "I am a B.Tech Data Science student passionate about Data Science, Data Engineering, Software Development and building real-world applications.",
  college: "R.K College of Engineering",
  education: "B.Tech 3rd Year — Data Science",
  location: "", // add your city/country here if you want it shown
  // Resume file goes into `public/resume/` and update this path.
  resumeUrl: "/resume/DARA_RAMANANDHU_Resume.pdf",
};

export const socials = {
  github: "https://github.com/dararamanandhu67-dara",
  linkedin: "", // PLACEHOLDER — add your LinkedIn profile URL
  email: "dararamanandhu67@gmail.com",
  liveDemo: "https://feed-bridge-5119a.web.app",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export const about = {
  paragraphs: [
    "I'm a third-year B.Tech Data Science student at R.K College of Engineering. My curiosity for data science started with a simple question — how can raw numbers and messy datasets be turned into decisions that actually help people? That question is still what drives my learning today.",
    "Right now I'm focused on building a solid technical foundation: Python and SQL for working with data, statistics and pandas for analysis, and web technologies like HTML, CSS, JavaScript and React for building applications. I'm also exploring the data engineering side — tools like Apache NiFi and Apache Airflow — because I enjoy understanding how data moves and flows as much as what it can say.",
    "I believe the best way to grow is to build. That's why most of my time goes into practical projects, consistent practice, and preparing for GATE 2027 in Data Science & AI. I'm still early in my journey, and I'm genuinely excited about how much more there is to learn.",
  ],
  currentlyLearning: [
    "Data Science",
    "Machine Learning",
    "Data Engineering",
    "Full-Stack Development",
    "Advanced Python",
    "SQL",
    "Cloud / Firebase Technologies",
  ],
};

export const skills = [
  {
    title: "Programming",
    icon: "code",
    items: ["Python", "Java", "SQL"],
  },
  {
    title: "Data Science & Analytics",
    icon: "chart",
    items: [
      "Pandas",
      "Data Analysis",
      "Statistics",
      "Data Visualization",
      "Jupyter Notebook",
      "Excel",
    ],
  },
  {
    title: "Databases",
    icon: "database",
    items: ["MySQL", "Firebase Firestore"],
  },
  {
    title: "Web Development",
    icon: "globe",
    items: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "Data Engineering / Tools",
    icon: "workflow",
    items: ["Apache NiFi", "Apache Airflow", "Git", "GitHub"],
  },
  {
    title: "Concepts",
    icon: "layers",
    items: [
      "OOP",
      "DBMS",
      "Computer Networks",
      "Data Engineering",
      "Time Series",
      "SDLC",
    ],
  },
];

// ---------------------------------------------------------------------------
// PROJECTS — add new completed projects here as objects.
// If `repo` and/or `demo` are empty strings, those buttons are hidden.
// ---------------------------------------------------------------------------
export const featuredProject = {
  title: "Feed Bridge",
  tagline: "Food Waste to Needy Connector",
  description:
    "Feed Bridge is a web platform designed to connect hotels, restaurants and events having surplus food with NGOs and volunteers who can help distribute it to people in need.",
  features: [
    "Food donation request submission",
    "Donor interface",
    "NGO dashboard",
    "Food request management",
    "Accept / delete request functionality",
    "Firebase Firestore database",
    "Authentication",
    "Location / pickup concept",
    "Google Maps integration",
    "Firebase hosting",
  ],
  tech: ["HTML", "CSS", "JavaScript", "Firebase", "Firestore", "Google Maps"],
  repo: "https://github.com/dararamanandhu67-dara/feed-bridge",
  demo: "https://feed-bridge-5119a.web.app",
};

export const upcomingProjects = [
  {
    title: "Next Data Science Project",
    description:
      "An end-to-end machine learning project I'm currently planning — real dataset, real analysis, real insights.",
  },
  {
    title: "Full-Stack Web App",
    description:
      "A full-stack application to apply my React and backend knowledge in one complete, deployable product.",
  },
  {
    title: "Data Engineering Pipeline",
    description:
      "A mini data pipeline project to practice ETL concepts with tools like Apache Airflow and NiFi.",
  },
];

export const experience = {
  title: "Technical Learning & Internship Preparation",
  subtitle: "Ongoing — Self-Driven",
  description:
    "I have been actively working through a structured learning and preparation roadmap. This isn't an internship at a company — it is the serious, consistent work that gets me ready for one. I'm currently building my skills in:",
  focus: [
    "Python & Advanced Python",
    "Data Science & Statistics",
    "Web Development (HTML, CSS, JavaScript, React)",
    "Data Engineering (Apache NiFi, Apache Airflow)",
    "Git / GitHub workflows",
    "Project development from idea to deployment",
  ],
  note: "I am actively looking for internship opportunities to apply and grow these skills in a real team environment.",
};

export const certificates = [
  {
    name: "Certificate Name",
    org: "Issuing Organization",
    date: "", // add completion date
    credentialUrl: "", // add verification link
    note: "Planned — add your certificate details here.",
  },
  {
    name: "Certificate Name",
    org: "Issuing Organization",
    date: "",
    credentialUrl: "",
    note: "Planned — add your certificate details here.",
  },
  {
    name: "Certificate Name",
    org: "Issuing Organization",
    date: "",
    credentialUrl: "",
    note: "Planned — add your certificate details here.",
  },
];

export const achievements = [
  {
    title: "College Project Expo",
    description:
      "Presented the Feed Bridge project at my college project expo — explaining the problem (food waste), the solution (connecting surplus food with those in need), how it was implemented, and its real-world impact.",
    tags: ["Public Speaking", "Project Presentation", "Feed Bridge"],
  },
];

export const gate = {
  title: "GATE 2027 — Data Science & AI",
  badge: "Academic Goal",
  description:
    "Currently preparing for GATE 2027 in Data Science & Artificial Intelligence while strengthening my foundations in programming, mathematics, statistics, databases and data science.",
  focus: ["Programming", "Mathematics", "Statistics", "Databases", "Data Science"],
};

export const contact = {
  heading: "Let's Connect",
  text: "I am open to internship opportunities, technical collaborations, project discussions and learning opportunities.",
  email: "dararamanandhu67@gmail.com",
  github: "https://github.com/dararamanandhu67-dara",
  linkedin: "", // PLACEHOLDER — add your LinkedIn profile URL
};