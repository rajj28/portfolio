# Getting Started Guide

Welcome to your modern portfolio landing page! This guide will help you customize and deploy your new portfolio.

## 🎯 Quick Start

Your development server should already be running at [http://localhost:3000](http://localhost:3000)

If not, run:
```bash
npm run dev
```

## 📝 Customization Checklist

### 1. Personal Information

#### **app/layout.tsx**
```typescript
export const metadata: Metadata = {
  title: "Portfolio | Your Name",           // Change this
  description: "Your description here",      // Change this
  keywords: ["your", "keywords", "here"],   // Change this
};
```

#### **components/Navbar.tsx**
- Update logo/initials (line 55): Change "YN" to your initials
- Update social media links (lines 16-21)

#### **components/Hero.tsx**
- Update your name (line 105): Change "Your Name"
- Update roles array (line 19): Add your roles/titles
- Update introduction text (lines 115-118)
- Update social links if needed

### 2. Projects Section

#### **components/Projects.tsx**
Update the `projects` array (starting line 9) with your actual projects:

```typescript
{
  title: "Your Project Name",
  description: "Project description",
  image: "/images/your-project.jpg",  // Add image to public/images/
  tags: ["Tech", "Stack", "Used"],
  githubUrl: "https://github.com/yourusername/repo",
  liveUrl: "https://yourproject.com",
  category: "Web Apps",  // Choose: Web Apps, Mobile, Design, Backend
}
```

### 3. Best Work / Featured Projects

#### **components/BestWork.tsx**
Update the `bestWorks` array (starting line 29) with your top 2-3 projects:

```typescript
{
  title: "Your Best Project",
  description: "Short description",
  detailedDescription: "Detailed explanation of the project",
  image: "/images/featured-project.jpg",
  tags: ["Tech", "Stack"],
  metrics: [
    { label: "Metric Name", value: "Value" },
  ],
  testimonial: {
    text: "Client testimonial",
    author: "Client Name",
    position: "Their Position",
  },
  githubUrl: "https://github.com/...",
  liveUrl: "https://...",
  accentColor: "#06B6D4",  // Choose a color
}
```

### 4. Skills Section

#### **components/Skills.tsx**
Update the `skillCategories` array (starting line 21) with your actual skills:

```typescript
{
  title: "Category Name",
  icon: <YourIcon size={24} />,
  color: "#HexColor",
  skills: [
    { name: "Skill Name", level: 90, icon: "🎯" },
    // Add more skills
  ],
}
```

### 5. Certifications

#### **components/Certifications.tsx**
Update the `certifications` array (starting line 20) with your credentials:

```typescript
{
  title: "Certification Name",
  issuer: "Issuing Organization",
  date: "Year",
  description: "What this certification validates",
  credentialUrl: "https://verify-link.com",
  color: "#HexColor",
}
```

Update the `achievements` array (starting line 66) with your numbers:
```typescript
{ label: "Certifications", value: "15+" },
{ label: "Awards Won", value: "8" },
{ label: "Years Experience", value: "5+" },
{ label: "Projects Completed", value: "50+" },
```

### 6. Footer & Contact

#### **components/Footer.tsx**
- Update brand name (line 67): Change "Your Name"
- Update description (lines 68-71)
- Update social links (lines 15-20)
- Update footer links (lines 22-48) if needed
- Update copyright year and name (line 207)

## 🎨 Styling Customization

### Color Scheme

Edit `tailwind.config.ts` to change the color palette:

```typescript
colors: {
  primary: "#0F172A",    // Dark background
  secondary: "#7C3AED",  // Purple - used for buttons, accents
  accent: "#06B6D4",     // Cyan - used for highlights, links
  textLight: "#F8FAFC",  // Light text on dark background
  subtle: "#64748B",     // Muted text, secondary content
}
```

### Fonts

To change fonts, update `app/globals.css` (line 13):

```css
font-family: 'Your Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', ...
```

Don't forget to import the font in `app/layout.tsx`.

## 🖼️ Adding Images

1. Add your images to the `public/images/` directory
2. Reference them in components using:
   ```typescript
   image: "/images/your-image.jpg"
   ```

Recommended image formats:
- WebP for best performance
- PNG for images with transparency
- JPG for photographs

Recommended sizes:
- Project thumbnails: 800x600px
- Featured project images: 1200x800px
- Certification logos: 200x200px

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

That's it! Vercel will automatically deploy your site.

### Deploy to Netlify

1. Push your code to GitHub (same as above)
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

### Other Hosting Options

For other platforms, build the production version:
```bash
npm run build
npm start
```

## 📧 Setting Up Contact Form

The MessageInbox component currently logs form data to the console. To make it functional:

1. **Using a Backend API:**
   ```typescript
   // In components/MessageInbox.tsx, handleSubmit function
   const response = await fetch('/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData),
   });
   ```

2. **Using Email Services (e.g., EmailJS, SendGrid):**
   - Sign up for a service like [EmailJS](https://www.emailjs.com/)
   - Install their package: `npm install @emailjs/browser`
   - Follow their integration guide

3. **Using Serverless Functions:**
   - Create `app/api/contact/route.ts`
   - Implement your email sending logic there

## 🔧 Advanced Customization

### Add More Sections

1. Create a new component in `components/`
2. Import it in `app/page.tsx`
3. Add it between existing sections

### Modify Animations

All animation variants are in `lib/animations.ts`. Adjust timing, easing, and effects there.

### Add a Blog Section

1. Consider using [MDX](https://mdxjs.com/) for blog posts
2. Or integrate with a headless CMS like [Sanity](https://www.sanity.io/) or [Contentful](https://www.contentful.com/)

## 🐛 Troubleshooting

### Development server won't start
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### TypeScript errors
```bash
# Check for TypeScript issues
npm run build
```

### Styling not working
- Make sure Tailwind is properly configured
- Check `tailwind.config.ts` paths
- Restart the dev server

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## 💡 Tips

1. **Test on multiple devices**: Use Chrome DevTools device mode
2. **Optimize images**: Use tools like [TinyPNG](https://tinypng.com/)
3. **Test accessibility**: Use browser extensions like Lighthouse
4. **Add analytics**: Consider Google Analytics or Vercel Analytics
5. **SEO**: Update meta tags for better search engine visibility

## 🎉 You're Ready!

Your portfolio is now set up and ready to showcase your work. Remember to:

- ✅ Update all personal information
- ✅ Add your projects and images
- ✅ Customize colors to match your brand
- ✅ Test on multiple devices
- ✅ Deploy to production

Good luck with your portfolio! 🚀

---

Need help? Check the README.md or create an issue on GitHub.

