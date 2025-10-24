# 📧 EmailJS Setup Guide - Step by Step

Your contact forms are now integrated with EmailJS! Follow these steps to get emails working:

---

## ✅ What's Already Done

- ✅ EmailJS library installed (`@emailjs/browser`)
- ✅ Forms prevent page reload
- ✅ Beautiful toast notifications
- ✅ Loading states ("Sending..." button)
- ✅ Error handling
- ✅ Form validation

**Now you just need to configure EmailJS!**

---

## 🚀 Step 1: Create EmailJS Account

1. **Go to**: https://www.emailjs.com/
2. **Click**: "Sign Up" (FREE - 200 emails/month)
3. **Sign up** with Google/GitHub (easiest)
4. **Verify your email**

---

## 📬 Step 2: Add Email Service

1. **Go to**: https://dashboard.emailjs.com/admin
2. **Click**: "Email Services" → "Add New Service"
3. **Choose**: **Gmail** (recommended) or your preferred provider
4. **Click**: "Connect Account" and authorize
5. **Copy** your **Service ID** (you'll need this!)
   - Example: `service_abc123`

---

## 📝 Step 3: Create Email Templates

### **Template 1: Newsletter Subscription**

1. **Go to**: "Email Templates" → "Create New Template"
2. **Template Name**: `Newsletter Subscription`
3. **Template Content**:

```html
Subject: New Newsletter Subscription

New newsletter subscription:
Email: {{email}}

---
This email was sent from your portfolio contact form.
```

4. **Template Variables** (Important!):
   - `email` - The subscriber's email
   - `to_email` - Your email (ruturajsonkamble29@gmail.com)

5. **Save** and copy the **Template ID**
   - Example: `template_newsletter123`

---

### **Template 2: Contact Message**

1. **Create another template**: "Create New Template"
2. **Template Name**: `Contact Form Message`
3. **Template Content**:

```html
Subject: New Contact Message from {{from_name}}

You received a new message from your portfolio!

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Reply to: {{from_email}}
```

4. **Template Variables** (Important!):
   - `from_name` - Sender's name
   - `from_email` - Sender's email
   - `message` - The message
   - `to_email` - Your email (ruturajsonkamble29@gmail.com)

5. **Save** and copy the **Template ID**
   - Example: `template_contact456`

---

## 🔑 Step 4: Get Your Public Key

1. **Go to**: "Account" → "General" tab
2. **Find**: "Public Key" section
3. **Copy** your **Public Key**
   - Example: `abcDEF123XYZ`

---

## 💾 Step 5: Add Environment Variables

### **Local Development:**

Create/update `.env.local` in your project root:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID=template_newsletter123
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=template_contact456
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abcDEF123XYZ
```

**⚠️ Replace the values above with YOUR actual IDs!**

---

### **Production (Vercel):**

1. **Go to**: Vercel Dashboard → Your Project
2. **Click**: "Settings" → "Environment Variables"
3. **Add these 4 variables**:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_abc123` |
| `NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID` | `template_newsletter123` |
| `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID` | `template_contact456` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `abcDEF123XYZ` |

4. **Select**: All environments (Production, Preview, Development)
5. **Click**: "Save"
6. **Redeploy** your site

---

## 🧪 Step 6: Test Your Forms

1. **Restart your dev server**:
```bash
npm run dev
```

2. **Go to**: `http://localhost:3000` → Scroll to footer

3. **Test Newsletter**:
   - Enter your email
   - Click "Subscribe"
   - Button should say "Sending..."
   - You should see: "✨ Thanks for subscribing!"
   - **Check your Gmail** - You should receive the email!

4. **Test Contact Form**:
   - Fill in name, email, message
   - Click "Send Message"
   - Button should say "Sending..."
   - You should see: "📧 Message sent!"
   - **Check your Gmail** - You should receive the message!

---

## ✅ Verification Checklist

- [ ] EmailJS account created
- [ ] Gmail connected to EmailJS
- [ ] Newsletter template created
- [ ] Contact template created
- [ ] Service ID copied
- [ ] Both Template IDs copied
- [ ] Public Key copied
- [ ] Environment variables added to `.env.local`
- [ ] Dev server restarted
- [ ] Newsletter form tested successfully
- [ ] Contact form tested successfully
- [ ] Emails received in Gmail

---

## 🎨 What Happens When Forms Are Submitted

### **Newsletter Form:**
1. User enters email → Clicks "Subscribe"
2. Button changes to "Sending..." (disabled)
3. EmailJS sends email to `ruturajsonkamble29@gmail.com`
4. Success: "✨ Thanks for subscribing!" toast appears
5. Form clears automatically
6. Button returns to "Subscribe"

### **Contact Form:**
1. User fills form → Clicks "Send Message"
2. Button changes to "Sending..." (disabled)
3. EmailJS sends email to `ruturajsonkamble29@gmail.com`
4. Success: "📧 Message sent!" toast appears
5. Form clears automatically
6. Button returns to "Send Message"

### **If Error:**
- "❌ Oops! Something went wrong. Please try again." toast appears
- Check console for error details
- Verify environment variables are correct

---

## 🚨 Troubleshooting

### **"Sending..." never stops**

Check browser console for errors:
- Right-click → Inspect → Console tab
- Look for EmailJS errors

**Common fixes:**
- Verify all 4 environment variables are set correctly
- Restart dev server after adding env vars
- Check EmailJS service is connected (not expired)

### **"Something went wrong" error**

**Check:**
1. Service ID matches your EmailJS service
2. Template IDs are correct
3. Public Key is correct
4. Gmail is still connected in EmailJS
5. You haven't exceeded 200 emails/month (free tier)

### **Email not received**

**Check:**
1. Gmail spam folder
2. EmailJS dashboard → "History" tab to see sent emails
3. Template variables match (`to_email`, `from_email`, etc.)
4. Your Gmail is set as recipient in templates

---

## 📊 EmailJS Dashboard

After setup, you can:
- **View History**: See all sent emails
- **Monitor Usage**: Track your 200/month limit
- **Check Status**: See delivery success/failures
- **Update Templates**: Edit email content anytime

**Dashboard**: https://dashboard.emailjs.com/

---

## 🎉 You're Done!

Your portfolio now has:
- ✅ Working contact forms
- ✅ Real email delivery
- ✅ Beautiful UX
- ✅ No page reloads
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications

**All emails will arrive at**: `ruturajsonkamble29@gmail.com`

---

## 🔒 Security Notes

- ✅ **Public Key is safe** - It's meant to be public (client-side)
- ✅ **No API keys exposed** - EmailJS handles authentication
- ✅ **Rate limited** - 200 emails/month on free tier
- ✅ **Spam protected** - EmailJS has built-in protection

---

## 📈 Upgrade to Pro (Optional)

If you need more than 200 emails/month:

**Personal Plan**: $7/month
- 1,000 emails/month
- Remove EmailJS branding
- Priority support

**Team Plan**: $15/month
- 10,000 emails/month
- Multiple users
- Advanced features

**Upgrade**: https://www.emailjs.com/pricing

---

## 📚 Additional Resources

- **EmailJS Docs**: https://www.emailjs.com/docs/
- **Template Guide**: https://www.emailjs.com/docs/user-guide/creating-email-template/
- **Troubleshooting**: https://www.emailjs.com/docs/troubleshooting/

---

**Need help? Check the troubleshooting section above or contact EmailJS support!** 🚀

