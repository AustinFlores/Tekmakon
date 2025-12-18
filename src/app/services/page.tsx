import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Cpu, Server, LineChart, Settings, ShieldCheck, Zap, Video } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const vidUrl = '/media/services-video.mp4'

const services = [
  {
    title: "IoT Infrastructure",
    description: "End-to-end IoT ecosystem setup, from sensor deployment to cloud data aggregation. We utilize LoRaWAN and MQTT for reliable, low-latency communication.",
    icon: Cpu,
  },
  {
    title: "Energy Optimization",
    description: "Automated algorithms that analyze consumption patterns in real-time to reduce waste and lower operational costs by up to 20%.",
    icon: Zap,
  },
  {
    title: "Custom Software Engineering",
    description: "Tailor-made dashboards, ERP modules, and mobile interfaces designed specifically for your operational workflows.",
    icon: Server,
  },
  {
    title: "Data Analytics & AI",
    description: "Turn raw telemetry data into actionable insights using predictive maintenance models and AI-driven forecasting.",
    icon: LineChart,
  },
  {
    title: "Industrial Automation",
    description: "PLC programming and SCADA system integration to automate manufacturing lines and facility management.",
    icon: Settings,
  },
  {
    title: "System Security",
    description: "Hardened security protocols for OT (Operational Technology) and IT networks to protect critical infrastructure.",
    icon: ShieldCheck,
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
    
      {/* Header */}
      <div className="relative bg-secondary py-20 text-secondary-foreground overflow-hidden">
        {/* Image container with relative positioning */}
        <div className="absolute inset-0">

          <video 
            autoPlay 
            loop 
            muted 
            playsInline // Important for mobile compatibility
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          >
            <source src={vidUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Optional dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content on top of image */}
        <div className="container relative z-10">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Our Services</h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300">
            We bridge the gap between physical hardware and digital intelligence.
          </p>
        </div>
      </div>

      {/* Service Grid */}
      <div className="container py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="group rounded-xl border bg-card p-8 shadow-sm transition-all hover:border-primary hover:shadow-md">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="mb-6 text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-accent/30 py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">How We Work</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Audit", desc: "We analyze your current infrastructure." },
              { step: "02", title: "Strategy", desc: "We design a custom roadmap." },
              { step: "03", title: "Build", desc: "Agile development and hardware installation." },
              { step: "04", title: "Deploy", desc: "Testing, launch, and ongoing support." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="mb-4 text-4xl font-black text-primary/20">{item.step}</div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container py-20 text-center">
        <h2 className="mb-6 text-3xl font-bold">Need a Custom Solution?</h2>
        <Link href="/contact">
          <Button size="lg">Get a Quote</Button>
        </Link>
      </div>

      <Footer />
    </>
  )
}