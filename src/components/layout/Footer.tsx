// components/layout/Footer.tsx

"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const tekmakonLogoLight = '/media/logo/Tekmakon-lightmode.svg'
const tekmakonLogoDark = '/media/logo/Tekmakon-darkmode.svg'

export default function Footer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentLogo = resolvedTheme === 'dark' ? tekmakonLogoDark : tekmakonLogoLight

  const LogoComponent = (
    <Link href="/" className="relative block h-16 w-40 mx-auto md:mx-0">
      {mounted ? (
        <Image
          src={currentLogo}
          alt="tekmakon logo"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 160px, 200px"
        />
      ) : (
        <div className="h-full w-full" />
      )}
    </Link>
  )

  return (
    <footer className="bg-gray-900/15 text-foreground px-8 md:p-16 md:pb-0">
      <div className="flex flex-col items-center pt-8 md:flex-row md:justify-center md:gap-36">
        {/* Logo & Tagline - Full width on all screens */}
        <div className="mb-8 space-y-4 text-center md:text-left">
          {LogoComponent}
          <p className="text-sm">
            Engineering Smart Systems for a Connected Future.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-36">
          {/* Company */}
          <div className="text-left">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-left">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>IoT Solutions</li>
              <li>Energy Automation</li>
              <li>Software Development</li>
              <li>Industrial Integration</li>
            </ul>
          </div>

          {/* Connect - spans 2 cols on mobile, 1 col on desktop */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Connect
            </h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Link href="#" className="hover:text-primary">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="hover:text-primary">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        
      </div>
      {/* Copyright */}
        <div className="mt-12 border-t-primary border-t-2 border-border py-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TekMakon. All rights reserved.
        </div>
    </footer>
  )
}
