import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email
    const data = await resend.emails.send({
      from: 'FullStackForce Contact <onboarding@resend.dev>', 
      to: ['b.gera13@gmail.com'],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #333;">Name:</strong> 
              <span style="color: #555;">${name}</span>
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #333;">Email:</strong> 
              <span style="color: #555;">${email}</span>
            </p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
              <strong style="color: #333;">Message:</strong>
              <p style="color: #555; margin: 10px 0; line-height: 1.6;">${message}</p>
            </div>
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
            This email was sent from the FullStackForce contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

