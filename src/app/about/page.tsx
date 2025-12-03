import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Team from "@/sections/Team"
import Image from "next/image"

const imgUrl = "/media/aboutBg.JPG"

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero / Header with background image */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-secondary py-24 sm:py-32">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={imgUrl}
            alt="team photos"
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Overlay: lighter in light mode, darker in dark mode */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About TekMakon
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              TekMakon was born from a desire to bridge the gap between industrial hardware and modern software intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* Story / Vision section */}
      <div className="bg-white dark:bg-background">
        <div className="container py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 dark:border-border bg-gray-50 dark:bg-card p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-foreground">
                Our Story
              </h2>
              <p className="text-gray-600 dark:text-muted-foreground">
                [Placeholder for company history]. We started as a small team of engineers and developers passionate about bridging industrial systems with modern software solutions.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-border bg-gray-50 dark:bg-card p-8 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-foreground">
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-muted-foreground">
                To create a world where energy is optimized automatically, and systems communicate seamlessly to reduce waste and improve efficiency.
              </p>
            </div>
          </div>

          {/* Values / Principles */}
          <div className="mt-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-foreground">
              Our Core Values
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Innovation",
                  desc: "Pushing boundaries with cutting-edge IoT and automation technologies.",
                },
                {
                  title: "Reliability",
                  desc: "Building systems that work 24/7 in demanding industrial environments.",
                },
                {
                  title: "Sustainability",
                  desc: "Optimizing energy use to reduce environmental impact.",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Team />
      <Footer />
    </>
  )
}
