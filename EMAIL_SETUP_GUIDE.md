# 📧 Email & Contact Form Setup Guide

Your forms are now working WITHOUT page reload! But they're not actually sending emails yet. Here's how to set them up:

---

## ✅ **WHAT'S FIXED**

- ✅ **No more page reload** when submitting forms
- ✅ **Beautiful toast notifications** instead of alerts
- ✅ **Form validation** (required fields)
- ✅ **Forms reset** after submission
- ✅ **Smooth animations**

---

## 📬 **HOW TO MAKE FORMS ACTUALLY SEND EMAILS**

You have 3 options:

---

### **Option 1: EmailJS (Easiest - Free)** ⭐ Recommended for MVP

**No backend needed! Works client-side.**

#### **Setup:**

1. **Sign up**: https://www.emailjs.com/
2. **Create email service** (Gmail, Outlook, etc.)
3. **Create email template**
4. **Get your credentials**

#### **Install:**

```bash
npm install @emailjs/browser
```

#### **Update Footer.tsx:**

```typescript
import emailjs from '@emailjs/browser';

// In your component, update handlers:
const handleNewsletterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_NEWSLETTER_TEMPLATE_ID',
      { email: newsletterEmail },
      'YOUR_PUBLIC_KEY'
    );
    
    showNotification(`✨ Thanks for subscribing!`);
    setNewsletterEmail("");
  } catch (error) {
    showNotification('❌ Oops! Something went wrong. Try again.');
  }
};

const handleMessageSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_CONTACT_TEMPLATE_ID',
      messageForm,
      'YOUR_PUBLIC_KEY'
    );
    
    showNotification(`📧 Message sent!`);
    setMessageForm({ name: "", email: "", message: "" });
  } catch (error) {
    showNotification('❌ Failed to send. Please try again.');
  }
};
```

**Pros**: Free, easy, no backend  
**Cons**: 200 emails/month limit (free tier)

---

### **Option 2: Resend (Modern - Recommended for Production)** 🚀

**Best for production, developer-friendly.**

#### **Setup:**

1. **Sign up**: https://resend.com/
2. **Get API key**
3. **Verify domain** (or use onboarding domain for testing)

#### **Install:**

```bash
npm install resend
```

#### **Create API route** `app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['ruturajsonkamble29@gmail.com'],
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
```

#### **Create newsletter route** `app/api/newsletter/route.ts`:

```typescript
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const { data, error } = await resend.contacts.create({
      email: email,
      audienceId: 'YOUR_AUDIENCE_ID', // Create in Resend dashboard
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Also send welcome email
    await resend.emails.send({
      from: 'Ruturaj <onboarding@resend.dev>',
      to: [email],
      subject: 'Thanks for subscribing! 🎉',
      html: '<h1>Welcome to my newsletter!</h1><p>Thanks for subscribing. You\'ll get updates about my latest projects.</p>',
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
```

#### **Update Footer.tsx:**

```typescript
const handleNewsletterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newsletterEmail }),
    });
    
    if (response.ok) {
      showNotification(`✨ Thanks for subscribing!`);
      setNewsletterEmail("");
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    showNotification('❌ Something went wrong. Try again.');
  }
};

const handleMessageSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageForm),
    });
    
    if (response.ok) {
      showNotification(`📧 Message sent!`);
      setMessageForm({ name: "", email: "", message: "" });
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    showNotification('❌ Failed to send. Please try again.');
  }
};
```

#### **Add to `.env.local`:**

```env
RESEND_API_KEY=re_your_api_key_here
```

**Pros**: 3,000 emails/month free, modern, reliable  
**Cons**: Requires backend API routes

---

### **Option 3: Nodemailer (Traditional)** 📮

**Use your own email (Gmail, etc.)**

#### **Install:**

```bash
npm install nodemailer
```

#### **Create API route** `app/api/contact/route.ts`:

```typescript
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Use App Password, not regular password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'ruturajsonkamble29@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
```

#### **Gmail Setup:**

1. Enable 2FA on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env.local`:

```env
EMAIL_USER=ruturajsonkamble29@gmail.com
EMAIL_APP_PASSWORD=your_16_char_app_password
```

**Pros**: Free, uses your Gmail  
**Cons**: Requires backend, Gmail limits (500/day)

---

## 🎯 **MY RECOMMENDATION**

For your portfolio:

1. **Start with EmailJS** - Quick setup, no backend needed
2. **Later upgrade to Resend** - Better for production, more professional

---

## 📝 **ENVIRONMENT VARIABLES**

Don't forget to add to Vercel:

```env
# For EmailJS (Option 1)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...

# For Resend (Option 2)
RESEND_API_KEY=...

# For Nodemailer (Option 3)
EMAIL_USER=...
EMAIL_APP_PASSWORD=...
```

---

## ✅ **CURRENT STATUS**

Right now your forms:
- ✅ Don't reload the page
- ✅ Show beautiful notifications
- ✅ Validate inputs
- ✅ Clear after submission
- ⏳ **Need email service** (choose one above)

---

## 🚀 **QUICK START (EmailJS)**

Fastest way to get emails working:

1. Go to https://www.emailjs.com/
2. Sign up free
3. Add Gmail service
4. Create 2 templates (newsletter + contact)
5. Get your IDs
6. Install: `npm install @emailjs/browser`
7. Update Footer.tsx with EmailJS code above
8. Done! ✨

---

**Choose your email service and follow the guide above!** 📧

