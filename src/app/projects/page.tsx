import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Projects from "@/sections/Projects" // Reusing the section for now, can be expanded

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <div className="bg-accent/30 py-16">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight">Our Portfolio</h1>
          <p className="mt-4 text-muted-foreground">Explore our suite of intelligent software and hardware solutions.</p>
        </div>
      </div>
      <Projects />
      <Footer />
    </>
  )
}