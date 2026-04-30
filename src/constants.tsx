import { 
  Monitor, 
  Shield, 
  Lock, 
  Users, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

export const CV_DATA = {
  name: "Edwin Safo",
  title: "IT Technical Support & Digital Builder",
  email: "official.edwinsafo@gmail.com",
  phone: "+233 596877302",
  location: "Accra, Ghana",
  profile: "Dedicated IT Technical Support Intern with a strong foundation in diagnosing and resolving technical issues. Adaptable and resourceful with a focus on customer service and problem-solving. Motivated by building secure and efficient digital systems.",
  
  skills: [
    { name: "Technical Support", icon: <Monitor className="w-5 h-5" /> },
    { name: "Network Troubleshooting", icon: <Shield className="w-5 h-5" /> },
    { name: "System Configuration", icon: <Monitor className="w-5 h-5" /> },
    { name: "Hardware Diagnostics", icon: <Monitor className="w-5 h-5" /> },
    { name: "Software Installation", icon: <Monitor className="w-5 h-5" /> },
    { name: "Customer Service", icon: <Users className="w-5 h-5" /> }
  ],
  
  experience: [
    {
      role: "IT Technical Support Intern",
      company: "SIC INSURANCE PLC",
      period: "10/2025 – 11/2025",
      location: "Accra, Ghana",
      highlights: [
        "Provided technical support to clients via phone and email communications.",
        "Diagnosed and resolved hardware and software issues for end-users.",
        "Assisted in setting up and configuring new computer systems.",
        "Collaborated with team members on complex technical problems.",
        "Conducted routine maintenance checks on computer systems and peripherals.",
        "Resolved internet connection problems for users both inside and outside office network.",
        "Trained new support representatives on troubleshooting techniques."
      ]
    }
  ],
  
  education: [
    {
      degree: "High School Diploma",
      school: "Odorgonno Senior High School",
      period: "2019 – 2023",
      location: "Accra, Ghana"
    }
  ],
  
  projects: [
    {
      title: "Cybersecurity Blog Website",
      period: "04/2025 – 05/2025",
      description: "A responsive web platform dedicated to sharing insights on cybersecurity trends, threat analysis, and best practices. Implemented secure web development principles to protect the site.",
      tags: ["Web Dev", "Security", "Responsive"],
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Data Encryption Tool",
      description: "Engineered a custom encryption application designed to secure sensitive files and information. Applied cryptographic algorithms to maintain data confidentiality.",
      tags: ["Cryptography", "Data Security", "Tooling"],
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: "Student Management System",
      description: "Built a robust application in C++ to efficiently manage and store student records, administrative data, and academic tracking using OOP principles.",
      tags: ["C++", "OOP", "Systems"],
      icon: <Users className="w-6 h-6" />
    }
  ]
};
