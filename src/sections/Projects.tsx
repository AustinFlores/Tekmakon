// sections/Projects.tsx

"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, X, ExternalLink, Github } from "lucide-react"
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion"
import { useState, useRef, useEffect } from "react"

// Project data
const projects = [
  {
    id: 1,
    title: "OpSuite",
    category: "Energy Management Platform",
    tagline: "Smart Energy for Modern Facilities",
    description:
      "OpSuites is a modular energy management and operational intelligence platform for commercial and industrial facilities, delivered as a standalone Electron desktop app with a Node.js backend and a modern React/TypeScript frontend.",
    fullDescription:
      "A comprehensive energy management solution that provides real-time monitoring, predictive analytics, and automated control systems. Built with scalability in mind, it handles multi-site deployments with centralized dashboards and actionable insights.",
    tech: ["React.js", "TypeScript", "Vite", "Node.js", "Gemini AI", "Electron"],
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    highlights: ["20% energy cost reduction", "Real-time analytics", "Multi-site support"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Tenant Management System",
    category: "Property Management",
    tagline: "Streamline Your Property Operations",
    description:
      "The Tenant Management System (TMS) is an offline-first desktop app that centralizes property, tenant, payment, and visitor management while improving workflow and communication through messaging and automated notifications.",
    fullDescription:
      "A complete property management solution designed for landlords and property managers. Features include automated rent reminders, digital lease agreements, maintenance tracking, and integrated payment processing. The offline-first architecture ensures reliability even without internet connectivity.",
    tech: ["React", "Google Maps API", "Node.js", "Vite", "Express.js", "SQLite"],
    gradient: "from-orange-500 via-red-500 to-pink-500",
    highlights: ["Offline-first", "Automated notifications", "Integrated payments"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "ERPhy",
    category: "Enterprise Resource & Education",
    tagline: "Manufacturing Intelligence Redefined",
    description:
      "Integrated accounting and operations system designed for manufacturing businesses.",
    fullDescription:
      "ERPhy combines traditional ERP functionality with modern educational tools for workforce training. Features include inventory management, production scheduling, quality control, financial accounting, and built-in training modules for operators and staff.",
    tech: ["React.js", "TypeScript", "Vite", "Node.js", "PostgreSQL", "Docker"],
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    highlights: ["Inventory tracking", "Production scheduling", "Workforce training"],
    demoUrl: "#",
    githubUrl: "#",
  },
]

// Triple the projects for smoother seamless loop
const duplicatedProjects = [...projects, ...projects, ...projects]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const scrollSpeed = 80 // pixels per second
  
  // Card width: 420px + 24px gap = 444px per card (using desktop size for calculation)
  const cardWidth = 444
  const totalWidth = cardWidth * projects.length

  useAnimationFrame((t, delta) => {
    if (!isPaused) {
      const moveBy = (delta / 1000) * scrollSpeed
      let newX = x.get() - moveBy
      
      // Reset to start for seamless loop when first set is fully scrolled
      if (newX <= -totalWidth) {
        newX = newX + totalWidth
      }
      
      x.set(newX)
    }
  })

  // Handle mouse wheel scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      // Scroll horizontally based on vertical wheel movement
      const scrollAmount = e.deltaY * 0.5
      let newX = x.get() - scrollAmount
      
      // Keep within bounds with seamless loop
      if (newX <= -totalWidth) {
        newX = newX + totalWidth
      } else if (newX > 0) {
        newX = newX - totalWidth
      }
      
      x.set(newX)
    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('wheel', handleWheel, { passive: false })
      return () => carousel.removeEventListener('wheel', handleWheel)
    }
  }, [x, totalWidth])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20">
      <div className="container flex items-center py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
            </motion.div>
          </div>
        </div>

        {/* Infinite Carousel */}
        <div 
          ref={carouselRef}
          className="relative cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex gap-6"
            style={{ x }}
          >
            {duplicatedProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="w-[340px] md:w-[420px] flex-shrink-0 cursor-pointer"
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <div
                    className={`relative h-32 bg-gradient-to-br ${project.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white px-4">
                        <div className="text-xs font-medium uppercase tracking-widest opacity-90 mb-1">
                          {project.category}
                        </div>
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Click to view details</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm font-semibold text-gray-900 dark:text-primary mb-3">{project.tagline}</p>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full bg-gray-900/10 px-3 py-1 text-xs font-medium text-gray-900 dark:text-primary dark:bg-primary/10"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t, i) => (
                        <span
                          key={i}
                          className="rounded bg-primary/20 dark:bg-accent px-2 py-1 text-[10px] font-medium text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="rounded bg-accent px-2 py-1 text-[10px] font-medium text-foreground/60">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`h-1 bg-gradient-to-r ${project.gradient}`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-background rounded-2xl shadow-2xl border border-border overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col"
              >
                {/* Header */}
                <div className={`relative p-8 bg-gradient-to-br ${selectedProject.gradient}`}>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white z-10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="relative text-white">
                    <div className="text-xs font-medium uppercase tracking-widest opacity-90 mb-2">
                      {selectedProject.category}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-lg opacity-90">{selectedProject.tagline}</p>
                  </div>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8">
                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedProject.highlights.map((highlight, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 rounded-lg bg-accent/50 px-4 py-3"
                        >
                          <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${selectedProject.gradient}`} />
                          <span className="text-sm font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-accent px-3 py-2 text-sm font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    <Button className="gap-2" asChild>
                      <Link href="/contact">Request Demo</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
