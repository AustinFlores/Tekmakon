import { NextResponse } from "next/server";

// 🧠 TekMakon Knowledge Base
// This structure maps keywords (triggers) to the specific answers you provided.
const KNOWLEDGE_BASE = [
  // 1️⃣ Company Identity
  {
    triggers: ["who are you", "what is tekmakon", "about tekmakon", "company"],
    response:
      "We are TekMakon, a friendly engineering guide based in Calamba City, Laguna. We help businesses decide how technology should support their goals, serving clients nationwide and remotely. We prioritize clear, practical explanations over confusing jargon.",
  },
  {
    triggers: ["location", "where are you", "office"],
    response:
      "Our office is in Calamba City, Laguna, Philippines, but we serve clients nationwide and remotely.",
  },

  // 3️⃣ Products (OpSuite)
  {
    triggers: ["opsuite", "energy monitoring", "cost tracking"],
    response:
      "**OpSuite** is our solution that turns raw energy and operational data into financial insights.\n\n**Who is it for?**\nBuilding owners and facility managers.\n\n**Top Features:**\n1. Real-time energy monitoring\n2. Cost tracking and savings insights\n3. Actionable dashboards",
  },

  // 4️⃣ Teaching Mode (Concepts)
  {
    triggers: ["modbus", "protocol"],
    response:
      "**Modbus** is like a common language machines use to talk to each other.\n\n*Technical Definition:* A communication protocol used in industrial devices for data exchange.",
  },
  {
    triggers: ["iot", "internet of things"],
    response:
      "**IoT (Internet of Things)** is like giving every device a 'voice'.\n\n*Simple Analogy:* Every device becomes a sensor that can speak.\n*Technical Definition:* A network of connected devices that collect and exchange data.",
  },
  {
    triggers: ["predictive maintenance", "fix before break"],
    response:
      "**Predictive Maintenance** is simply fixing things *before* they break.\n\n*Technical Definition:* Using data and AI to predict equipment failure so you can act early.",
  },

  // 2️⃣ Core Services - Strategy
  {
    triggers: ["strategy", "consulting", "digital transformation"],
    response:
      "We help businesses decide how technology should support their goals, not the other way around. We offer IT strategy, digital transformation, and system planning.",
  },
  {
    triggers: ["roadmap", "planning", "future"],
    response:
      "We create a clear **Technology Roadmap** of what systems to build now, later, and why. This helps with scalability and budgeting.",
  },

  // 2️⃣ Core Services - Custom Dev
  {
    triggers: ["web system", "website", "custom web"],
    response:
      "We build custom web systems tailored exactly to your business using modern tech like React, Next.js, and Node.js.",
  },
  {
    triggers: ["mobile app", "android", "ios", "app development"],
    response:
      "We create mobile apps for Android, iOS, or cross-platform use (using React Native or Flutter).",
  },
  {
    triggers: ["offline", "desktop app", "no internet"],
    response:
      "We build apps that work even without the internet (Offline-First) using technologies like Electron and SQLite.",
  },

  // 2️⃣ Core Services - Automation & AI
  {
    triggers: ["automation", "rpa", "repetitive"],
    response:
      "We automate repetitive digital tasks humans shouldn't waste time on. This includes approvals, notifications, and robotic process automation (RPA).",
  },
  {
    triggers: ["ai", "machine learning", "chatbot"],
    response:
      "We add AI that predicts, scores, or detects anomalies. We also build chatbots (like me!) and virtual assistants to guide users inside your system.",
  },

  // 5️⃣ Sales & Business Logic
  {
    triggers: ["start", "begin", "process", "how to work"],
    response:
      "**How to Start a Project:**\n1. Initial discovery call\n2. Requirement discussion\n3. Proposal & scope\n4. Project kickoff\n5. Build, test, deploy\n6. Support & improvement",
  },
  {
    triggers: ["price", "cost", "quote", "pricing"],
    response:
      "Our pricing is flexible:\n- **Custom Quote:** Based on project scope.\n- **Fixed Price:** For well-defined projects.\n- **Retainer:** For ongoing support contracts.",
  },
  {
    triggers: ["contact", "email", "phone", "talk to team"],
    response:
      "You can reach us at **support@tekmakon.com**, use the contact form on our website, or I can help guide you to the right service right here.",
  },

  // 6️⃣ FAQs
  {
    triggers: ["residential", "home", "house"],
    response:
      "Do we do residential home automation? Yes, for selected projects depending on scope and requirements.",
  },
  {
    triggers: ["support", "maintenance", "after launch"],
    response:
      "Yes, we offer post-launch support, including maintenance, enhancements, and system monitoring.",
  },
];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const cleanMessage = message.toLowerCase();

    // Default Fallback
    let responseContent =
      "I'm your TekMakon Guide. I can help with:\n\n1. **Services** (Web, Mobile, AI, IoT)\n2. **Products** (OpSuite)\n3. **Learning** (Explain IoT, Modbus)\n4. **Business** (Pricing, Process)\n\nWhat would you like to know?";

    // Logic: Find the first entry where ANY trigger word exists in the user message
    const match = KNOWLEDGE_BASE.find((entry) =>
      entry.triggers.some((trigger) => cleanMessage.includes(trigger))
    );

    if (match) {
      responseContent = match.response;
    }

    // Simulate a slight network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      role: "assistant",
      content: responseContent,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
