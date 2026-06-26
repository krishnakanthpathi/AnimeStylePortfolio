export const resumeData = {
  personalInfo: {
    name: "Pathi Krishna Kanth",
    title: "Full Stack & AI Engineer",
    email: "krishnakanthpathi@gmail.com",
    phone: "+91 6281165645",
    website: "krishnakanth.app",
    location: "India",
    links: {
      portfolio: "https://krishnakanth.app",
      linkedin: "https://www.linkedin.com/in/krishna-kanth-166b31252/",
      github: "https://github.com/krishnakanthpathi",
      leetcode: "https://leetcode.com/u/krishnakanthpathi/"
    }
  },
  education: {
    institution: "Pragati Engineering College",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    duration: "2022 -- 2026",
    cgpa: "8.88 / 10.0",
    location: "Surampalem, India"
  },
  experience: [
    {
      role: "Full Stack Developer",
      company: "CarTrade Tech",
      duration: "Dec 2025 -- May 2026",
      type: "On-site",
      highlights: [
        "Built and maintained fast, responsive web applications utilizing Vue.js for the frontend and PHP for backend services.",
        "Optimized queries and managed data structures across MongoDB and MySQLi to ensure fast retrieval and data integrity."
      ]
    },
    {
      role: "AI Intern",
      company: "Turtil AI",
      duration: "2025",
      type: "Remote",
      highlights: [
        "Contributed to AI/ML model development and training pipelines for campus management intelligence.",
        "Implemented backend performance and system efficiency features using Python."
      ]
    }
  ],
  projects: [
    {
      title: "Real-Time AI Voice Agent",
      tech: "Python, FastAPI, Google Gemini API, Web Audio API",
      highlights: [
        "Built a low-latency voice agent that streams text from Gemini and synthesizes audio concurrently via Server-Sent Events (SSE).",
        "Wrote an asynchronous parser to feed completed sentences to a TTS model instantly, heavily reducing start-to-speak wait times.",
        "Created a custom JavaScript web player using the Web Audio API to schedule buffers for smooth, gapless audio playback."
      ]
    },
    {
      title: "NullPointer AI Assistant",
      tech: "Python, Docker, Google GenAI, Ollama, Linux systemd",
      highlights: [
        "Developed a scalable Discord bot that dynamically routes user queries to Gemini, OpenAI, or local AI models.",
        "Integrated a containerized Text-to-Speech microservice to stream generated audio responses directly into voice channels.",
        "Packaged the application with Docker and configured Linux systemd for reliable background execution and automated restarts."
      ]
    },
    {
      title: "QueryPort Headless CMS",
      tech: "React 19, TypeScript, Node.js, Express, MongoDB",
      links: {
        code: "https://github.com/krishnakanthpathi/QueryPort",
        live: "https://query-port-brown.vercel.app/"
      },
      highlights: [
        "Architected a headless CMS and developer portfolio platform using the MERN stack under a strict MVC design pattern.",
        "Designed centralized APIs featuring standardized responses, global error handling, and robust cloud media storage integration."
      ]
    },
    {
      title: "Resume Fit Tracker",
      tech: "NLP, Python, Machine Learning",
      links: {
        code: "https://github.com/krishnakanthpathi/resume-fit-tracker"
      },
      highlights: [
        "Built a backend evaluation system that analyzes resume alignment with specific job descriptions using Natural Language Processing.",
        "Implemented model persistence and scoring metrics for suitability assessment."
      ]
    }
  ],
  skills: {
    languages: ["Python", "TypeScript", "JavaScript", "Java", "PHP", "C", "SQL"],
    webCloud: ["FastAPI", "Node.js", "Express.js", "React.js", "Vue.js", "Docker", "Linux", "REST APIs"],
    aiMl: ["Google Gemini API", "HuggingFace", "PyTorch", "Local LLMs (Ollama)", "Text-to-Speech (Kokoro)"],
    databases: ["MongoDB", "MySQL"],
    coreConcepts: ["Data Structures & Algorithms", "System Design", "Networking", "OS"]
  },
  achievements: [
    {
      title: "LeetCode Knight",
      detail: "Solved 1,300+ computational problems; consistently ranked in the top 5% globally in weekly contests."
    },
    {
      title: "NPTEL Java DSA",
      detail: "Achieved a top 1% ranking nationally with a score of 87%."
    },
    {
      title: "GDG Lead (Algorithms)",
      detail: "Directed the Google Developer Group domain, organized technical workshops, and hosted weekly coding contests."
    },
    {
      title: "1st Prize",
      detail: "Won the 'Crack the Jumble Code' competition for creative algorithmic problem-solving."
    }
  ]
};
