// sections/Hero.tsx

"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import RotatingFeatures from "@/sections/CoreCapabilities"
import { useState, useEffect, useRef } from "react"

interface HeroProps {
  onViewWorkClick: () => void
  onExploreSolutionsClick: () => void
}

export default function Hero({ onViewWorkClick, onExploreSolutionsClick }: HeroProps) {
  const neonCyan = "#4cc8a3"
  const heroRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Light mode: primary color spotlight
  const spotlightStyleLight = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(76, 200, 163, 0.5) 0,
      rgba(76, 200, 163, 0.3) 120px,
      rgba(76, 200, 163, 0.2) 200px,
      transparent 420px
    )`,
  }

  // Dark mode: smooth black spotlight
  const spotlightStyleDark = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.05) 40px,
      rgba(0, 0, 0, 0.15) 80px,
      rgba(0, 0, 0, 0.3) 130px,
      rgba(0, 0, 0, 0.5) 180px,
      rgba(0, 0, 0, 0.7) 230px,
      rgba(0, 0, 0, 0.85) 300px,
      rgba(0, 0, 0, 0.85) 380px
    )`,
  }

  return (
    <section
  ref={heroRef}
  className="relative flex items-stretch justify-center overflow-hidden min-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-4rem)] py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white dark:hidden" />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{ backgroundImage: "linear-gradient(135deg, #4cc8a3, #6a0dac)" }}
        />
        <div className="absolute inset-0 hidden dark:block bg-black/20" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-30 dark:opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(76, 200, 163, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(76, 200, 163, 1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(800px) rotateX(75deg) translateY(-100px) scale(3)",
          filter: "drop-shadow(0 0 4px rgba(76, 200, 163, 0.8))",
        }}
      />

      {/* Spotlight */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div
          className="absolute inset-0 dark:hidden transition duration-100 ease-out"
          style={spotlightStyleLight}
        />
        <div
          className="absolute inset-0 hidden dark:block transition duration-100 ease-out"
          style={spotlightStyleDark}
        />
      </div>

      {/* Floating particles */}
      <motion.div
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[20%] h-4 w-4 rounded-full bg-gray-900 dark:bg-primary opacity-60 blur-sm z-[6]"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[15%] bottom-[30%] h-6 w-6 rounded-full bg-primary opacity-40 blur-md z-[6]"
      />

      {/* Content */}
      <div className="container relative z-[7] flex items-center">
        <div className="grid w-full md:grid-cols-2 gap-10 md:gap-10 md:items-center">
          {/* LEFT */}
          <div className="flex flex-col justify-center text-center md:text-left text-gray-900 dark:text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 inline-block rounded-full border border-gray-900/50 dark:border-white/50 bg-white/30 dark:bg-white/20 px-4 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-sm text-gray-800 dark:text-white">
                Innovating Energy & Automation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
            >
              Engineering Smart Systems for a
              <span className="text-primary drop-shadow-lg"> Connected Future</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200"
            >
              TekMakon builds intelligent solutions in IoT, automation, software engineering, and real-time energy
              optimization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row md:justify-start justify-center"
            >
              <Button
                size="lg"
                className="gap-2 bg-[#4cc8a3] hover:bg-[#5cdba6] dark:text-gray-900 font-semibold shadow-lg"
                onClick={onExploreSolutionsClick}
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-gray-800/20 dark:border-white text-gray-800 dark:text-white bg-white/90 dark:bg-transparent hover:bg-gray-100/80 dark:hover:bg-white/10"
                onClick={onViewWorkClick}
              >
                View our Work
              </Button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center md:justify-end">
            <RotatingFeatures />
          </div>
        </div>
      </div>
    </section>
  )
}
