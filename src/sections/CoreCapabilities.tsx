// sections/CoreCapabilities.tsx

"use client"
import { Cpu, Activity, Code2, Network } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const features = [
  {
    title: "Smart IoT Solutions",
    description: "Connect devices for real-time data.",
    icon: Cpu,
  },
  {
    title: "Energy & Automation",
    description: "Optimize consumption and automate workflows.",
    icon: Activity,
  },
  {
    title: "Software & AI Development",
    description: "Custom software with modern AI.",
    icon: Code2,
  },
  {
    title: "Industrial Integrations",
    description: "Robust communication via Modbus and LoRaWAN.",
    icon: Network,
  },
]

const primaryColor = "#4cc8a3"
const gradientStyle = "linear-gradient(135deg, #4cc8a3, #6a0dac)"

export default function CoreCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotateX: -10,
      filter: "blur(6px)",
    },
    visible: ({ index }: { index: number }) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      },
    }),
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  }

  const activeCardVariants = {
    initial: {
      scale: 0.96,
      y: 10,
      opacity: 0.85,
      filter: "brightness(0.9)",
    },
    animate: {
      scale: 1,
      y: 0,
      opacity: 1,
      filter: "brightness(1)",
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
    whileHover: {
      scale: 1.02,
      y: -4,
      boxShadow: "0 18px 35px -18px rgba(0, 0, 0, 0.45)",
      transition: { duration: 0.18 },
    },
  }

  return (
    <div className="relative flex w-full items-stretch justify-center py-2">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-full blur-3xl"
          style={{ animation: "float 20s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-56 h-56 bg-gradient-to-tr from-emerald-400/5 to-blue-600/5 rounded-full blur-3xl opacity-75"
          style={{ animation: "float 25s ease-in-out infinite reverse" }}
        />
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-16px) rotate(180deg);
            }
          }
        `}</style>
      </div>

      {/* Main container */}
      <motion.div
        className="relative w-full max-w-xl md:max-w-3xl px-2 sm:px-4 flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-3 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-foreground mb-2">
            Our Core Capabilities
          </h2>
          <div className="w-14 sm:w-20 h-1 mx-auto bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full" />
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {features.map((feature, index) => {
            const isActive = index === activeIndex

            return (
              <motion.div
                key={feature.title}
                className="relative group"
                variants={itemVariants}
                custom={{ index }}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                exit="exit"
              >
                <motion.div
                  className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-2 sm:p-4 h-full transition-all duration-500 ${
                    isActive ? "shadow-2xl shadow-emerald-500/10" : "shadow-md shadow-gray-900/30"
                  }`}
                  variants={activeCardVariants}
                  initial={isActive ? "initial" : "animate"}
                  animate={isActive ? "animate" : "initial"}
                  whileHover="whileHover"
                >
                  {/* Gradient border */}
                  <div
                    className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-700 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                    style={{
                      backgroundImage: gradientStyle,
                      padding: "1.5px",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />

                  {/* Card background */}
                  <div className="relative bg-gradient-to-br from-gray-900/90 via-black/60 to-gray-900/90 rounded-xl sm:rounded-2xl p-3 sm:p-4 h-full backdrop-blur-sm">
                    {/* Icon */}
                    <motion.div
                      className="relative mb-2 sm:mb-4 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.08, 1],
                              rotate: [0, 5, 0],
                              backgroundColor: `${primaryColor}20`,
                            }
                          : { scale: 1, rotate: 0 }
                      }
                      transition={{
                        duration: 1.3,
                        repeat: isActive ? Infinity : 0,
                        repeatType: "reverse",
                        repeatDelay: 2,
                      }}
                    >
                      <motion.div
                        animate={
                          isActive
                            ? {
                                scale: [1, 1.04, 1],
                                rotate: [0, 360],
                              }
                            : {}
                        }
                        transition={
                          isActive
                            ? {
                                duration: 2.8,
                                repeat: Infinity,
                                ease: "linear",
                              }
                            : {}
                        }
                      >
                        <feature.icon
                          className={`h-4 w-4 sm:h-6 sm:w-6 transition-all duration-500 ${
                            isActive ? "text-white drop-shadow-lg" : "text-gray-400 group-hover:text-emerald-400"
                          }`}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Text */}
                    <div className="space-y-1 sm:space-y-2">
                      <motion.h3
                        className="text-xs sm:text-base font-semibold transition-all duration-500 line-clamp-2"
                        animate={
                          isActive
                            ? {
                                color: "#ffffff",
                                textShadow: "0 0 16px rgba(76, 200, 163, 0.5)",
                              }
                            : {
                                color: "#e5e7eb",
                                textShadow: "none",
                              }
                        }
                        transition={{ duration: 0.4 }}
                      >
                        {feature.title}
                      </motion.h3>

                      <motion.p
                        className="text-[10px] sm:text-sm text-gray-400 leading-relaxed line-clamp-2"
                        animate={isActive ? { color: "#d1d5db" } : { color: "#9ca3af" }}
                        transition={{ duration: 0.4 }}
                      >
                        {feature.description}
                      </motion.p>

                      {/* Active indicator - hidden on mobile */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="absolute -bottom-2 -right-2 w-20 h-5 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-full items-center hidden sm:flex"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                            <div className="ml-3 w-2 h-2 bg-emerald-400 rounded-full" />
                            <span className="ml-2 text-[10px] font-medium text-emerald-300">Active</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>

                {/* Index marker - hidden on mobile */}
                <motion.div
                  className="absolute -top-2 left-2 sm:-top-3 sm:left-3 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-gray-800/60 border border-gray-600/60 items-center justify-center text-[9px] sm:text-[11px] font-medium text-gray-300 hidden sm:flex"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
