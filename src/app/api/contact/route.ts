// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server"
import { MailtrapClient } from "mailtrap"

const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN!,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, inquiryType, message } = body

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Send email using Mailtrap
    const sender = {
      email: "hello@4wardph.com", // Replace with your verified domain
      name: "TekMakon Contact Form",
    }

    const recipients = [
      {
        email: "tekmakon2025@gmail.com",
      },
    ]

    await client.send({
      from: sender,
      to: recipients,
      subject: `New Contact Form Submission: ${inquiryType}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6; 
                color: #333; 
                margin: 0;
                padding: 0;
              }
              .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: #ffffff;
              }
              .header { 
                background: linear-gradient(135deg, #4cc8a3, #6a0dac); 
                padding: 40px 30px; 
                text-align: center; 
                color: white;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 600;
              }
              .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 14px;
              }
              .content { 
                background: #f9fafb; 
                padding: 40px 30px;
              }
              .field { 
                margin-bottom: 24px;
                background: white;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #4cc8a3;
              }
              .label { 
                font-weight: 600; 
                color: #4cc8a3; 
                margin-bottom: 8px;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .value { 
                color: #1f2937;
                font-size: 15px;
                word-wrap: break-word;
              }
              .value a {
                color: #4cc8a3;
                text-decoration: none;
              }
              .footer { 
                text-align: center; 
                padding: 30px;
                color: #6b7280; 
                font-size: 13px;
                border-top: 1px solid #e5e7eb;
              }
              .footer p {
                margin: 5px 0;
              }
              .reply-button {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 24px;
                background: #4cc8a3;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 500;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 New Contact Form Submission</h1>
                <p>From TekMakon Website</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Name</div>
                  <div class="value">${firstName} ${lastName}</div>
                </div>
                <div class="field">
                  <div class="label">✉️ Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">📋 Inquiry Type</div>
                  <div class="value">${inquiryType}</div>
                </div>
                <div class="field">
                  <div class="label">💬 Message</div>
                  <div class="value">${message.replace(/\n/g, "<br>")}</div>
                </div>
                <div style="text-align: center;">
                  <a href="mailto:${email}" class="reply-button">Reply to ${firstName}</a>
                </div>
              </div>
              <div class="footer">
                <p><strong>This email was sent from the TekMakon contact form</strong></p>
                <p>Received on ${new Date().toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Inquiry Type: ${inquiryType}

Message:
${message}

---
Reply to: ${email}
Submitted: ${new Date().toLocaleString()}
      `,
      category: "Contact Form",
    })

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Mailtrap error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    )
  }
}
