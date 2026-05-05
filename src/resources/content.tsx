import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Ayush",
  lastName: "Gupta",
  name: `Ayush Gupta`,
  role: "AI Engineer",
  avatar: "/images/avatar.jpg",
  email: "ayushgupta20011@gmail.com",
  location: "America/New_York",
  languages: ["English"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Stay in the loop</>,
  description: <>Occasional notes on generative AI, retrieval systems, and building in public.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/AyushGupta-Code",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/ayush-gupta-50007b1b6/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} — AI Engineer`,
  description: `Portfolio of ${person.name}, an AI Engineer specialising in multimodal GenAI, RAG, and LLM-powered systems.`,
  headline: <>I build things that retrieve, reason, and generate</>,
  featured: {
    display: false,
    title: <>Featured project</>,
    href: "/work",
  },
  subline: (
    <>
      I'm Ayush, finishing my M.S. at NC State while working on retrieval systems, agentic
      workflows, and multimodal AI. Ask me anything below.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About — ${person.name}`,
  description: `Meet ${person.name}, an ${person.role} and M.S. CS candidate at NC State`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: false,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a CS grad student interested in the messy, interesting parts of AI: why models break,
        how to make retrieval actually work, and what it takes to go from a research idea to
        something deployed. My stack spans Python, PyTorch, and cloud infrastructure, with
        hands-on work across LLMs, fine-tuning, and multimodal pipelines.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Innoventix Solutions",
        timeframe: "June 2023 – July 2024",
        role: "Software Engineer (AI/ML)",
        achievements: [
          <>
            My main project was a multimodal ad-generation system — I built the whole data layer,
            starting with a Python scraping pipeline (Selenium + BeautifulSoup) to pull product
            metadata from client catalogs, then chunking, embedding, and indexing it for
            context-aware retrieval. That retrieval layer fed into an LLM workflow that generated
            product-aware scripts and scene plans for short-form marketing video.
          </>,
          <>
            On the output side I wired up TTS narration and FFmpeg rendering to produce finished
            audio-visual ads end-to-end. When I wasn't building features I was keeping the stack
            running — containerising services with Docker, automating deploys via GitHub Actions
            and Terraform, and managing infra across AWS and GCP.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "North Carolina State University",
        description: (
          <>
            Masters in Computer Science · Aug 2024 – May 2026 · GPA 3.5/4.
            Coursework: Algorithms, Software Engineering, Automated Learning & Data Analysis,
            Neural Networks, NLP, Deep Learning Beyond Accuracy, Building Game AI.
          </>
        ),
      },
      {
        name: "SRM Institute of Science and Technology",
        description: (
          <>
            B.Tech in Computer Science Engineering · Aug 2019 – May 2023 · GPA 4/4.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "AI/ML & LLM Engineering",
        description: (
          <>
            End-to-end LLM application development: RAG pipelines, agentic workflows, multimodal
            generation, prompt engineering, and model fine-tuning with LoRA/PEFT.
          </>
        ),
        tags: [
          { name: "PyTorch" },
          { name: "HuggingFace Transformers" },
          { name: "RAG" },
          { name: "LangChain" },
          { name: "LlamaIndex" },
          { name: "scikit-learn" },
        ],
        images: [],
      },
      {
        title: "APIs, Databases & Retrieval",
        description: (
          <>
            Building and serving AI services with FastAPI and Flask; vector + lexical hybrid search
            with pgvector, TimescaleDB, and PostgreSQL.
          </>
        ),
        tags: [
          { name: "FastAPI" },
          { name: "Flask" },
          { name: "pgvector" },
          { name: "PostgreSQL" },
          { name: "MySQL" },
          { name: "REST APIs" },
        ],
        images: [],
      },
      {
        title: "Cloud, MLOps & DevOps",
        description: (
          <>
            Containerised deployment and CI/CD automation across AWS and GCP with Kubernetes
            orchestration and infrastructure-as-code.
          </>
        ),
        tags: [
          { name: "Docker" },
          { name: "Kubernetes" },
          { name: "Terraform" },
          { name: "AWS" },
          { name: "GCP" },
          { name: "GitHub Actions" },
          { name: "Next.js", icon: "nextjs" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Notes on AI and engineering",
  description: `Writing by ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects — ${person.name}`,
  description: `AI and engineering projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery — ${person.name}`,
  description: `A visual collection by ${person.name}`,
  images: [],
};

const publications = [
  {
    title:
      "Breast Cancer Detection and Comparative Analysis of Convolutional Neural Networks and VGG-16",
    venue: "IEEE CONIT 2023",
    date: "June 2023",
    description:
      "Evaluated CNN and VGG-16 architectures against classical ML models on the UCI Breast Cancer dataset. VGG-16 achieved a peak 98.24% accuracy and 0.98 F1-score, outperforming SVM (97.07%) and Gradient Boosting (95.32%).",
    href: "https://ieeexplore.ieee.org/document/10205580",
  },
  {
    title: "Hand Gesture Recognition using TensorFlow and Machine Learning",
    venue: "International Journal of Advances in Engineering and Management (IJAEM)",
    date: "November 2022",
    description:
      "Optimised a real-time ASL video understanding pipeline using OpenCV and TensorFlow/Keras LSTMs for gesture-sequence classification. Applied Gaussian filtering during preprocessing to reduce noise, then used quantisation and TensorFlow Lite for efficient inference on live video.",
    href: "https://ijaem.net/issue_dcp/Hand%20gesture%20recognition%20using%20TensorFlow%20and%20Machine%20Learning.pdf",
  },
];

const projects = [
  {
    name: "Grounded Local RAG and AgentOps Platform",
    description:
      "Local-first RAG platform for private knowledge retrieval — modular pipeline for document ingestion, chunking, indexing, hybrid search, reranking, and grounded generation with citation-backed answers and built-in evaluation support.",
    tags: ["Python", "FastAPI", "RAG", "Hybrid Search", "Local LLMs", "MCP"],
    href: "/work/grounded-local-rag-agentops-platform",
  },
  {
    name: "CREME — Not Every Layer Counts",
    description:
      "Layer-aware robustness enhancement pipeline for code LLMs combining causal tracing, model editing, and proactive LoRA fine-tuning with a representation-alignment regulariser. Evaluated on MBPP and HumanEval across 18 prompt perturbation types.",
    tags: ["Python", "PyTorch", "HuggingFace", "PEFT/LoRA", "Model Editing", "Causal Tracing"],
    href: "https://github.com/AyushGupta-Code/CREME-Not-Every-Layer-Counts",
  },
  {
    name: "Multimodal Soccer Video Intelligence Platform",
    description:
      "Transforms raw match video into structured event and tactical-sequence JSON using visual perception, temporal event extraction, and semantic abstraction. Enables grounded natural-language querying over player behaviour and match incidents via a FastAPI interface.",
    tags: ["Python", "FastAPI", "Computer Vision", "Object Detection", "Grounded QA"],
    href: "https://github.com/AyushGupta-Code/Multimodal-Sports-Intelligence-Copilot",
  },
  {
    name: "MusicGen (AI Audiobook Engine)",
    description:
      "AI audiobook generation pipeline that converts text into emotionally aligned narrated audio with adaptive background music. Uses LangGraph to orchestrate RoBERTa-based emotion detection, local TTS, MusicGen, and pydub/FFmpeg post-processing with audio ducking.",
    tags: ["Python", "LangGraph", "RoBERTa", "MusicGen", "TTS", "FFmpeg"],
    href: "https://github.com/AyushGupta-Code/orchestrai-audio",
  },
  {
    name: "LLM-Aided Customer Support Automation",
    description:
      "Classifies customer tweets by intent and severity then drafts empathetic replies with Gemini. TF-IDF + Logistic Regression baseline with optional LSTM and DistilBERT tiers.",
    tags: ["Python", "Gemini", "NLP", "DistilBERT", "Classification"],
    href: "https://github.com/AyushGupta-Code/LLM-Aided-Customer-Support-Automation",
  },
  {
    name: "Real-Time ASL Gesture Recognition",
    description:
      "Real-time ASL video understanding pipeline using OpenCV and TensorFlow/Keras LSTMs for gesture-sequence classification. Applied quantisation and TensorFlow Lite for fast, efficient inference on live video — published as a conference paper (April 2023).",
    tags: ["Python", "OpenCV", "TensorFlow", "LSTM", "TensorFlow Lite", "Edge ML"],
    href: "https://github.com/AyushGupta-Code/Sign-Language-To-Text-Conversion",
  },
];

export { person, social, newsletter, home, about, blog, work, gallery, publications, projects };
