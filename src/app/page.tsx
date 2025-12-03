// pages.tsx (Home component)

"use client" 
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/sections/Hero"


export default function Home() {
  const router = useRouter()

  // The View Work / Learn More handler is kept simple
  const handleViewWorkClick = () => {
    router.push("/projects")
  };

  const handleExploreServicesClick = () => {
    router.push("/services")
  };
  
  return (
    <>
      <Navbar />
      
      <Hero 
        onViewWorkClick={handleViewWorkClick}
        onExploreSolutionsClick={handleExploreServicesClick}
      />
      

      <Footer/>
    </>
  )
}