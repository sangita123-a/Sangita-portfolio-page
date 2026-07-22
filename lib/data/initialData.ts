export const initialProfile = {
  name: "Sangita Sahoo",
  title: "Full Stack Developer",
  bio: "Building secure, scalable and modern web applications. Turning ideas into powerful digital solutions.",
  about: "I am a dedicated Full Stack Developer with a strong interest in building modern, responsive, and user-friendly web applications. I have hands-on experience working with Python, Node.js, JavaScript, React, Next.js, HTML, CSS, PostgreSQL, and REST APIs to develop scalable and efficient solutions.",
  location: "Hyderabad, Telangana",
  email: "ssangitasahoo48@gmail.com",
  phone: "+91 63711 15043",
  avatarUrl: "/profile.png",
  githubUrl: "https://github.com/sangita123-a",
  linkedinUrl: "https://linkedin.com/in/sangita-sahoo",
  instagramUrl: "https://instagram.com",
  twitterUrl: "https://twitter.com",
};

export const initialProjects = [
  {
    id: "proj-1",
    title: "Portfolio Website",
    slug: "portfolio-website",
    badge: "REACT / NEXT.JS",
    description: "A modern, dark-neon themed developer portfolio constructed with Next.js, Framer Motion, and Tailwind CSS.",
    techStack: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    thumbnailUrl: "/profile.png",
    screenshots: ["/profile.png"],
    demoUrl: "#",
    githubUrl: "https://github.com/sangita123-a/Sangita-portfolio-page",
    featured: true,
    hidden: false,
    viewsCount: 120,
    order: 1,
  },
  {
    id: "proj-2",
    title: "Foodiq – Food Delivery Platform",
    slug: "foodiq-food-delivery-platform",
    badge: "NEXT.JS / NODE.JS / EXPRESS / POSTGRESQL",
    description: "A premium food delivery platform inspired by Swiggy and Zomato. Built using Next.js, Node.js, Express.js, and PostgreSQL with a modern responsive UI. Features include user authentication, restaurant discovery, menu browsing, cart management, online ordering, secure payment integration, admin dashboard, restaurant management, and mobile-first responsive design.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "JWT Authentication", "Cloudinary", "Razorpay", "Vercel"],
    thumbnailUrl: "/foodiq-preview.png",
    screenshots: ["/foodiq-preview.png", "/foodiq-banner.png"],
    demoUrl: "https://foodiq-ecru.vercel.app",
    githubUrl: "https://github.com/sangita123-a/foodiq",
    featured: true,
    hidden: false,
    viewsCount: 350,
    order: 2,
  },
  {
    id: "proj-3",
    title: "E-Commerce REST API",
    slug: "e-commerce-rest-api",
    badge: "NODE.JS / EXPRESS",
    description: "A robust, secure, and scalable backend API service for managing digital inventories, payments, and order tracking.",
    techStack: ["Node.js", "Express.js", "PostgreSQL", "JWT", "Swagger"],
    thumbnailUrl: "/profile.png",
    screenshots: ["/profile.png"],
    demoUrl: "#",
    githubUrl: "https://github.com/sangita123-a",
    featured: true,
    hidden: false,
    viewsCount: 95,
    order: 3,
  },
];

export const initialSkills = [
  { id: "sk-1", name: "React.js / Next.js", category: "Frontend", proficiency: 90, order: 1 },
  { id: "sk-2", name: "JavaScript / TypeScript", category: "Languages", proficiency: 85, order: 2 },
  { id: "sk-3", name: "HTML5 / CSS3 / Tailwind", category: "Frontend", proficiency: 95, order: 3 },
  { id: "sk-4", name: "Node.js / Express.js", category: "Backend", proficiency: 85, order: 4 },
  { id: "sk-5", name: "PostgreSQL / MySQL", category: "Database", proficiency: 80, order: 5 },
  { id: "sk-6", name: "Python", category: "Languages", proficiency: 80, order: 6 },
  { id: "sk-7", name: "Git & GitHub", category: "Tools", proficiency: 90, order: 7 },
  { id: "sk-8", name: "REST APIs & JWT", category: "Backend", proficiency: 88, order: 8 },
];

export const initialExperience = [
  {
    id: "exp-1",
    company: "Tech Solutions Inc.",
    role: "Full Stack Developer",
    duration: "2023 - Present",
    description: "Developed and maintained responsive web applications using React, Next.js, Node.js, and PostgreSQL. Integrated REST APIs and secure authentication flows.",
    order: 1,
  },
  {
    id: "exp-2",
    company: "Digital Innovations",
    role: "Frontend Developer Intern",
    duration: "2022 - 2023",
    description: "Built pixel-perfect, responsive UI components with React and Tailwind CSS. Optimized page performance and accessibility.",
    order: 2,
  },
];

export const initialEducation = [
  {
    id: "edu-1",
    university: "State University",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    cgpa: "8.8 / 10",
    duration: "2020 - 2024",
    order: 1,
  },
];

export const initialCertificates = [
  {
    id: "cert-1",
    title: "Full Stack Web Development Certification",
    issuer: "Coursera / Meta",
    issueDate: "2023",
    fileUrl: "/resume-sample.pdf",
    downloadUrl: "/resume-sample.pdf",
    order: 1,
  },
];

export const initialBlogs = [
  {
    id: "blog-1",
    title: "Building Scalable Full Stack Applications with Next.js and PostgreSQL",
    slug: "building-scalable-full-stack-nextjs-postgresql",
    excerpt: "Learn how to architect high-performance web applications with Next.js 15, Prisma ORM, and PostgreSQL.",
    content: "<p>Architecting full stack applications requires careful consideration of data flow, authentication, security, and performance. In this article, we explore best practices using Next.js, Express, and PostgreSQL...</p>",
    coverImage: "/foodiq-preview.png",
    category: "Development",
    tags: ["Next.js", "PostgreSQL", "Full Stack"],
    status: "PUBLISHED",
    seoTitle: "Building Scalable Full Stack Applications",
    seoDescription: "Guide to building full stack apps with Next.js and PostgreSQL",
    viewsCount: 240,
    createdAt: new Date().toISOString(),
  },
];
