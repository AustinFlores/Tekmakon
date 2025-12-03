import { Cpu, Activity, Code2, Network } from "lucide-react"

const features = [
  {
    title: "Smart IoT Solutions",
    description: "Seamlessly connect devices and sensors for real-time data acquisition and control.",
    icon: Cpu,
  },
  {
    title: "Energy & Automation",
    description: "Intelligent systems designed to optimize energy consumption and automate industrial workflows.",
    icon: Activity,
  },
  {
    title: "Software & AI Development",
    description: "Custom software tailored to your needs, enhanced with modern AI capabilities.",
    icon: Code2,
  },
  {
    title: "Industrial Integrations",
    description: "Robust communication via RS485, Modbus, and LoRaWAN for industrial environments.",
    icon: Network,
  },
]

export default function Features() {
  const gradientStyle = "linear-gradient(135deg, #4cc8a3, #6a0dac)";
  const primaryColor = "#4cc8a3"; 

  // Determine the default background color of your cards (e.g., if bg-background is white/light)
  const innerCardBgColor = "bg-background"; 
  const innerCardBgHoverColor = "bg-background"; // This will be set to white, which will fade out

  return (
    <section className="bg-accent/30 py-20"> 
      <div className="container">
        <div className="mb-12 text-center">
          {/* H2 with gradient text */}
          <h2 
            className="text-3xl font-bold tracking-tight md:text-4xl bg-clip-text text-primary">
              Core Capabilities
          </h2>
          <p className="mt-4 text-muted-foreground">Everything you need to build a smarter infrastructure.</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            // === Outer Wrapper (A): Gradient Border ===
            <div 
              key={index} 
              // Added 'group' for hover tracking
              className="group relative rounded-xl p-[1.5px] transition-all duration-500 hover:shadow-xl hover:-translate-y-1" 
              style={{ backgroundImage: gradientStyle }}
            >
              
              {/* === Inner Card (B): Solid BG & Content === */}
              <div 
                className={`relative flex h-full flex-col justify-start rounded-[10px] p-6 transition-colors duration-500 ${innerCardBgColor}`}
              >
                
                {/* === Hover Fill Layer (C): Absolute Gradient === */}
                {/* This absolute layer uses the gradient and is visible only on hover */}
                <div 
                    className="absolute inset-0 rounded-[10px] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{ backgroundImage: gradientStyle }}
                ></div>
                
                {/* Content Layer (Ensure z-index is above the hover fill) */}
                <div className="relative z-10">
                    {/* Icon */}
                    <div 
                      className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-500"
                      style={{ 
                          backgroundColor: `${primaryColor}20`, 
                          color: primaryColor 
                      }}
                    >
                      <feature.icon className="h-6 w-6 group-hover:text-white transition-colors duration-500" />
                    </div>
                    
                    {/* Title and Description */}
                    <h3 className="mb-2 text-xl font-semibold transition-colors duration-500 group-hover:text-white">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground transition-colors duration-500 group-hover:text-gray-200">{feature.description}</p>
                </div>
              </div>
            </div>
            // === End Double Layer Card ===
          ))}
        </div>
      </div>
    </section>
  )
}