import { Button } from "@/components/ui/button"

export default function ContactSection() {
  return (
    <section className="bg-secondary py-20 text-secondary-foreground">
      <div className="container text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Automate Your Future?</h2>
        <p className="mb-8 text-gray-300">Let's discuss how our smart systems can optimize your operations.</p>
        <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-white">
          Start a Conversation
        </Button>
      </div>
    </section>
  )
}