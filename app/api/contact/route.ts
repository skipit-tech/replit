import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { to, from, name, message } = body

    // For now, we'll log the email details
    console.log("[v0] Contact Support Email:")
    console.log(`To: ${to}`)
    console.log(`From: ${from} (${name})`)
    console.log(`Message: ${message}`)

    // TODO: Integrate with actual email service
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@skipit.tech',
    //   to: to,
    //   replyTo: from,
    //   subject: `Contact Support from ${name}`,
    //   text: message,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in contact API:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
