# Modern Portfolio Landing Page

A stunning, professional portfolio landing page built with Next.js 14+, featuring smooth animations, parallax effects, and a modern design aesthetic.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Smooth Animations**: Framer Motion for fluid, professional animations
- **Parallax Effects**: Multi-layer parallax scrolling throughout the site
- **Glassmorphism Design**: Modern UI with backdrop blur effects
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **Dark Theme**: Elegant dark mode with deep blues, purples, and cyan accents
- **Accessibility**: Keyboard navigation, ARIA labels, and reduced motion support

## 📦 Sections

1. **Vertical Navbar**: Fixed glassmorphism sidebar with smooth scroll navigation
2. **Hero Section**: Animated introduction with typing effect and quick message inbox
3. **Projects**: Filterable project grid with hover effects and parallax
4. **Best Work**: Featured projects with expanding cards and testimonials
5. **Skills**: Multi-layer parallax skills showcase with progress bars
6. **Certifications**: Professional credentials and achievements display
7. **Footer**: Comprehensive footer with social links and newsletter signup

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Customization

### Personal Information

Update the following in the components:

- **app/layout.tsx**: Page metadata (title, description)
- **components/Hero.tsx**: Your name, roles, and introduction
- **components/Projects.tsx**: Your projects data
- **components/Skills.tsx**: Your skills and proficiency levels
- **components/Certifications.tsx**: Your certifications and achievements
- **components/Footer.tsx**: Contact information and social links

### Colors

Customize the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  primary: "#0F172A",    // Background
  secondary: "#7C3AED",  // Purple accent
  accent: "#06B6D4",     // Cyan accent
  textLight: "#F8FAFC",  // Text color
  subtle: "#64748B",     // Muted text
}
```

### Images

Add your project images to the `public/images` directory and update the image paths in the component data.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

Build the production version:
```bash
npm run build
npm start
```

## 📚 Tech Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, react-intersection-observer

## 🎨 Design Philosophy

- **Minimalist**: Clean, purposeful design without clutter
- **Animated**: Smooth transitions and micro-interactions
- **Professional**: Showcases work in the best light
- **Unique**: Memorable visual elements and parallax effects

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Made with ❤️ and Next.js
