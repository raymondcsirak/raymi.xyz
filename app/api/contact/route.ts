import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface TurnstileVerificationResponse {
  success: boolean
  'error-codes'?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string
    const turnstileToken = formData.get('turnstileToken') as string
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (turnstileSecret) {
      if (!turnstileToken) {
        return NextResponse.json({ error: 'Verification is required' }, { status: 400 })
      }

      const remoteIpHeader = request.headers.get('cf-connecting-ip')
      const forwardedFor = request.headers.get('x-forwarded-for')
      const remoteIp = remoteIpHeader || forwardedFor?.split(',')[0]?.trim()

      const verificationParams = new URLSearchParams({
        secret: turnstileSecret,
        response: turnstileToken,
      })

      if (remoteIp) {
        verificationParams.set('remoteip', remoteIp)
      }

      const verificationResponse = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: verificationParams,
        }
      )

      const verificationResult =
        (await verificationResponse.json()) as TurnstileVerificationResponse

      if (!verificationResult.success) {
        console.error('Turnstile error:', verificationResult)
        return NextResponse.json({ error: 'Verification failed' }, { status: 400 })
      }
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
