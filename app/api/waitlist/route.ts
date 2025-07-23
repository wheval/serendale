import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const emailDomain = process.env.EMAIL_DOMAIN || 'yourdomain.com';

    console.log('Debug info:', {
      hasApiKey: !!apiKey,
      apiKeyStart: apiKey?.substring(0, 10) + '...',
      adminEmail,
      emailDomain
    });

    if (!apiKey) {
      console.error('RESEND_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Missing API key configuration' },
        { status: 500 }
      );
    }

    if (!adminEmail) {
      console.error('ADMIN_EMAIL environment variable is not set');
      return NextResponse.json(
        { error: 'Missing admin email configuration' },
        { status: 500 }
      );
    }

    // Send email to your address
    console.log('Attempting to send email...');
    const { data, error } = await resend.emails.send({
      from: `Serendale AI Waitlist <noreply@${emailDomain}>`,
      to: [adminEmail],
      subject: 'New Waitlist Signup - Serendale AI',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Waitlist Signup</h2>
          <p>Someone just joined the Serendale AI waitlist!</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p>You can reach out to them or add them to your mailing list.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error details:', {
        error,
        message: error.message,
        name: error.name
      });
      return NextResponse.json(
        { error: `Email service error: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    // Optional: Send confirmation email to the user (simplified for now)
    try {
      await resend.emails.send({
        from: `Serendale AI <noreply@${emailDomain}>`,
        to: [email],
        subject: 'Welcome to Serendale AI Waitlist! 🚀',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to the Serendale AI Waitlist!</h2>
            <p>Hi there!</p>
            <p>Thank you for joining our waitlist. You're now among the first to know when Serendale AI launches.</p>
            <p>Stay tuned!</p>
            <p>Best regards,<br>The Serendale AI Team</p>
          </div>
        `,
      });
    } catch (confirmationError) {
      console.error('Confirmation email failed:', confirmationError);
      // Don't fail the main request if confirmation email fails
    }

    return NextResponse.json(
      { message: 'Successfully joined waitlist!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 