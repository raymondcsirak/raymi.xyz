import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Contact Form <${process.env.CONTACT_EMAIL}>`,
        to: [process.env.CONTACT_EMAIL || 'hello@raymi.xyz'],
        subject: `New Contact Request from ${name}`,
        reply_to: email,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Resend error:', data)
      return NextResponse.json({ error: data.message || 'Failed to send email' }, { status: response.status })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
