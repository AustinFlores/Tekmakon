import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import ChatbotButton from "@/components/ChatbotButton"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TekMakon | Engineering Smart Systems",
  description: "Intelligent solutions in IoT, automation, software engineering, and real-time energy optimization.",
  icons: {
    icon: "/media/logo/Tekmakon-lightmode.svg", // Assumes you will add a favicon later
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={cn(
          inter.className, 
          "min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="relative flex min-h-screen flex-col">
          {/* Navbar Component will be injected here */}
          
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer Component will be injected here */}
          <ChatbotButton /> 
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}