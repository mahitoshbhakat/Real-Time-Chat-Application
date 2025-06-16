import { LaptopMinimalCheck, MessageSquareMore, MonitorSmartphone, SunMoon, UsersRound } from "lucide-react";
import { GlobeLock } from "lucide-react";


import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Testimonials", href: "#testinomials" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <MessageSquareMore color="blue"/>,
    text: "Real-Time Messaging",
    description:
      "Instant communication with friends, family, or teams.",
  },
  {
    icon: <GlobeLock color="blue"/>,
    text: "End-to-End Encryption",
    description:
      "Your conversations stay private and secure.",
  },
  {
    icon: <UsersRound color="blue"/>,
    text: "Group Chats",
    description:
      "Create and manage groups for smooth collaboration.",
  },
  {
    icon: <SunMoon color="blue"/>,
    text: "Dark-light Mode",
    description:
      "Chat comfortably anytime with an eye-friendly dark theme.",
  },
  {
    icon: <LaptopMinimalCheck color="blue"/>,
    text: "Online Presence Indicator",
    description:
      "See who's online and available to chat.",
  },
  {
    icon: <MonitorSmartphone color="blue" />,
    text: "Cross-Platform Support",
    description:
      "Use Covo on mobile, tablet, or desktop seamlessly.",
  },
];

export const checklistItems = [
  {
    title: " Instant Messaging — Seamless Conversations",
    description:
      "Stay connected with your team in real-time using lightning-fast, reliable chat. No delays, no clutter—just clean, focused communication.",
  },
  {
    title: "Smart Threads — Organize with Ease",
    description:
      "Group messages into threads to keep conversations contextually relevant. Never lose track of important discussions again.",
  },
  {
    title: "File Sharing & Code Snippets — Built for Work",
    description:
      "Effortlessly share files, images, and formatted code snippets within chats. Perfect for developers, designers, and remote teams.",
  },
  {
    title: "Integrations & Notifications — Stay in Sync",
    description:
      "Connect with your favorite tools and get real-time updates. Convo keeps your workflow smooth and your team in the loop.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
