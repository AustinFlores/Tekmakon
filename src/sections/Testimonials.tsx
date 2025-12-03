import { Quote } from "lucide-react"

const testimonials = [
  {
    company: "Mayron ba?",
    quote: "Diko sure",
    author: "Mema"
  }
]

export default function Testimonials() {
  return (
    <section className="border-t bg-background py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Trusted by Innovators</h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <div key={index} className="flex flex-col justify-between rounded-xl border bg-accent/20 p-8">
              <Quote className="mb-4 h-8 w-8 text-primary/40" />
              <p className="mb-6 text-lg font-medium leading-relaxed text-foreground">
                "{item.quote}"
              </p>
              <div>
                <div className="font-bold text-primary">{item.company}</div>
                <div className="text-sm text-muted-foreground">{item.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}