"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import Image from "next/image";
import { scrollToElement } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";
import TextFillOnScroll from "./TextFillOnScroll";
import Toast from "./Toast";
import emailjs from '@emailjs/browser';

const socialLinks = [
  { iconPath: "/svgs/icons8-github-100.png", href: "https://github.com/rajj28", label: "GitHub", color: "#181717" },
  { iconPath: "/svgs/icons8-linkedin-100.png", href: "https://www.linkedin.com/in/ruturaj-sonkamble-106246304/", label: "LinkedIn", color: "#0A66C2" },
  { iconPath: "/svgs/icons8-instagram-100.png", href: "https://www.instagram.com/rajjj_._?igsh=MWc5YXdyamt6cGlmaA==", label: "Instagram", color: "#E4405F" },
  { iconPath: "/svgs/icons8-whatsapp-100.png", href: "https://wa.me/919503046986", label: "WhatsApp", color: "#25D366" },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Home", id: "hero" },
      { label: "Projects", id: "projects" },
      { label: "Skills", id: "skills" },
      { label: "Certifications", id: "certifications" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/rajj28" },
      { label: "LinkedIn", href: "https://linkedin.com/in/ruturaj-sonkamble" },
      { label: "Instagram", href: "https://www.instagram.com/rajjj_._?igsh=MWc5YXdyamt6cGlmaA==" },
      { label: "Email", href: "mailto:ruturajsonkamble29@gmail.com" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resume", href: "#" },
      { label: "Blog", href: "#", comingSoon: true },
      { label: "Newsletter", href: "#", comingSoon: true },
      { label: "Contact", id: "contact" },
    ],
  },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [messageForm, setMessageForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterLoading(true);
    
    try {
      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID || '',
        {
          email: newsletterEmail,
          to_email: 'ruturajsonkamble29@gmail.com',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      
      showNotification(`✨ Thanks for subscribing! Check ${newsletterEmail} for updates.`);
      setNewsletterEmail("");
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      showNotification('❌ Oops! Something went wrong. Please try again.');
    } finally {
      setIsNewsletterLoading(false);
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMessageLoading(true);
    
    try {
      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || '',
        {
          from_name: messageForm.name,
          from_email: messageForm.email,
          message: messageForm.message,
          to_email: 'ruturajsonkamble29@gmail.com',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      
      showNotification(`📧 Message sent! I'll get back to you at ${messageForm.email} soon.`);
      setMessageForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Message sending failed:', error);
      showNotification('❌ Failed to send message. Please try again or email me directly.');
    } finally {
      setIsMessageLoading(false);
    }
  };

  return (
    <footer id="contact" className="relative bg-cardBg/90 backdrop-blur-lg border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold text-gradient">Ruturaj Sonkamble</h3>
            <p className="text-body leading-relaxed">
              AI enthusiast passionate about backend development with Go and Node.js. 
              Let&apos;s build innovative solutions together.
            </p>
            {/* Social links - Clean & Modern */}
            <div className="flex gap-2 pt-6 -ml-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ 
                    scale: 1.15, 
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <div className="relative w-16 h-16 transition-all duration-300 group-hover:drop-shadow-2xl">
                    <Image
                      src={link.iconPath}
                      alt={link.label}
                      fill
                      className="object-contain transition-all duration-300 group-hover:brightness-110"
                      sizes="64px"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h4 className="text-lg font-bold text-heading mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link: any, linkIndex: number) => (
                  <li key={linkIndex}>
                    {link.id ? (
                      <motion.button
                        onClick={() => scrollToElement(link.id)}
                        className="text-textLight hover:text-secondary transition-colors block"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </motion.button>
                    ) : (
                      <motion.a
                        href={link.comingSoon ? "#" : link.href}
                        target={link.href?.startsWith("http") && !link.comingSoon ? "_blank" : undefined}
                        rel={link.href?.startsWith("http") && !link.comingSoon ? "noopener noreferrer" : undefined}
                        className={`transition-colors block ${
                          link.comingSoon 
                            ? "cursor-not-allowed" 
                            : "text-textLight hover:text-secondary"
                        }`}
                        whileHover={{ x: link.comingSoon ? 0 : 5 }}
                        onClick={(e) => link.comingSoon && e.preventDefault()}
                      >
                        <span className="flex items-center gap-2">
                          {link.label}
                          {link.comingSoon && (
                            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded">
                              Coming Soon
                            </span>
                          )}
                        </span>
                      </motion.a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter & Contact section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="glassmorphism rounded-2xl p-8 mb-32"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: Stay Updated */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-2xl font-bold">
                  <TextFillOnScroll fillColor="#0EA5E9" duration={1.5}>
                    Stay Updated
                  </TextFillOnScroll>
                </h4>
                <span className="text-sm font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>
              <p className="text-body mb-6">
                Subscribe to my newsletter for the latest projects, articles, and tech insights.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 opacity-50 cursor-not-allowed">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  disabled={true}
                  className="flex-1 px-4 py-3 bg-cardBg border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-heading placeholder-textLight disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <motion.button
                  type="button"
                  disabled={true}
                  className="px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-accentDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>

            {/* Right: Quick Message */}
            <div>
              <h4 className="text-2xl font-bold mb-3">
                <TextFillOnScroll fillColor="#10B981" duration={1.5}>
                  Quick Message
                </TextFillOnScroll>
              </h4>
              <p className="text-body mb-6">
                Have a question or want to work together? Drop me a message!
              </p>
              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={messageForm.name}
                    onChange={(e) => setMessageForm({...messageForm, name: e.target.value})}
                    required
                    disabled={isMessageLoading}
                    className="px-4 py-3 bg-cardBg border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-heading placeholder-textLight disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={messageForm.email}
                    onChange={(e) => setMessageForm({...messageForm, email: e.target.value})}
                    required
                    disabled={isMessageLoading}
                    className="px-4 py-3 bg-cardBg border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-heading placeholder-textLight disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                  required
                  disabled={isMessageLoading}
                  className="w-full px-4 py-3 bg-cardBg border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all text-heading placeholder-textLight resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <motion.button
                  type="submit"
                  disabled={isMessageLoading}
                  className="w-full px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isMessageLoading ? { scale: 1.02 } : {}}
                  whileTap={!isMessageLoading ? { scale: 0.98 } : {}}
                >
                  {isMessageLoading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-textLight text-sm flex items-center gap-1"
          >
            © {new Date().getFullYear()} Ruturaj Sonkamble. Made with{" "}
            <Heart size={14} className="text-secondary fill-secondary" /> and Next.js
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 text-textLight text-sm"
          >
            <a href="#" className="hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Sitemap
            </a>
          </motion.div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={() => scrollToElement("hero")}
        className="fixed bottom-8 right-8 p-4 glassmorphism rounded-full text-secondary shadow-lg z-40 hover:bg-secondary/10"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </motion.button>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </footer>
  );
}

