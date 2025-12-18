import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Projects from "@/sections/Projects"
import Image from "next/image"

const headerImgUrl = '/media/projectsBg.jpg'; 

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <div className="relative py-24 md:py-32 text-white overflow-hidden">
        
        <div className="absolute inset-0">
          <Image
            src={headerImgUrl}
            alt="Intelligent solutions background"
            fill
            priority
            style={{ objectFit: 'cover' }}
            className="opacity-80 transition-transform duration-500 group-hover:scale-105" 
          />
        </div>

        <div className="absolute inset-0 bg-black/60" />

        <div className="container relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Our Portfolio</h1>
          <p className="mt-4 text-xl max-w-3xl text-gray-200">
            Explore our suite of intelligent software and hardware solutions and see how we deliver tangible results across various industries.
          </p>
        </div>
      </div>

      <Projects />
      <Footer />
    </>
  )
}