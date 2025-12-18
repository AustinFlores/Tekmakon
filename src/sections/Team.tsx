"use client";

import Image from "next/image";
import Link from "next/link"; // Import Link
import { motion } from "framer-motion";

// Define the shape of a single team member object
interface TeamMember {
  name: string;
  role: string;
  desc: string;
  imageUrl: string;
  alt: string;
  link?: string;
}

// Team data
const team: TeamMember[] = [
  {
    name: "Ivan",
    role: "Marketing & Strategy",
    desc: "Founder, Ideation & Funding",
    imageUrl: "/media/ivan.jpg",
    alt: "Portrait of Ivan",
  },
  {
    name: "Gio",
    role: "Project Manager",
    desc: "Solutions Consultant",
    imageUrl: "/media/Gio.jpeg",
    alt: "Portrait of Gio",
  },
  {
    name: "AB",
    role: "Full-Stack Developer",
    desc: "Engineering Lead",
    imageUrl: "/media/ab.jpg",
    alt: "Portrait of AB",
    link: "https://absawada123.github.io/absawada",
  },
  {
    name: "Austin",
    role: "Frontend & AI",
    desc: "Prompt Engineering & Web Dev",
    imageUrl: "/media/austin.jpg",
    alt: "Portrait of Austin",
  },
];

export default function Team() {
  return (
    <section className="bg-white dark:bg-background">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-4">
              Meet the TekMakon Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse team of experts brings together decades of experience
              in IoT, automation, and software engineering.
            </p>
          </div>
        </motion.div>

        {/* Full-width grid with no gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => {
            // Reusable card content
            const CardContent = (
              <>
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={member.imageUrl}
                    alt={member.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Hover overlay with primary color */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                </div>

                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm md:text-base font-medium text-primary mb-1">
                    {member.role}
                  </p>
                  <p className="text-xs md:text-sm text-gray-200 opacity-90">
                    {member.desc}
                  </p>
                </div>

                {/* Optional: Decorative border on hover */}
                <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </>
            );

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[400px] md:h-[500px] overflow-hidden cursor-pointer"
              >
                {member.link ? (
                  <Link
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full relative"
                  >
                    {CardContent}
                  </Link>
                ) : (
                  <div className="w-full h-full relative">{CardContent}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
