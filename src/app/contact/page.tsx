// app/contact/page.tsx

"use client"
import { useState } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiryType: "General Inquiry",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! We'll get back to you within 1-2 business days.",
        })
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          inquiryType: "General Inquiry",
          message: "",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h1 className="mb-6 text-4xl font-bold">Start a project with TekMakon</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Tell us about your system, and get a tailored plan for IoT, automation, or software in
              a few business days.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <a href="mailto:tekmakon2025@gmail.com" className="hover:text-primary transition-colors">
                  tekmakon2025@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <a href="tel:+639684936438" className="hover:text-primary transition-colors">
                  +63 968 493 6438
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>Calamba City, Philippines</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`flex items-center gap-2 rounded-lg p-4 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                  <span className="text-sm">{submitStatus.message}</span>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="firstName">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                    placeholder="Juan"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="lastName">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                    placeholder="Dela Cruz"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  placeholder="juan@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="inquiryType">
                  Inquiry Type *
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  required
                  value={formData.inquiryType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                >
                  <option>General Inquiry</option>
                  <option>Project Quote</option>
                  <option>Partnership</option>
                  <option>Request Demo</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="h-32 w-full rounded-md border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We'll respond within 1-2 business days
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
