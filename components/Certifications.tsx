"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import TextFillOnScroll from "./TextFillOnScroll";
import CertificateSlider from "./CertificateSlider";
import { useState, useEffect } from "react";

// Database types (from API)
interface CertificationFromDB {
  id: string;
  title: string;
  issuer: string;
  type: string;
  description: string;
  skills_gained: string[];
  badge_url: string;
  certificate_url: string;
  credential_url: string;
  issued_date: string;
  expiry_date: string;
  credential_id: string;
  is_featured: boolean;
  display_order: number;
}

interface ApiResponse {
  certifications: CertificationFromDB[];
}

// Helper function to get color based on issuer or index
const getColorForCert = (issuer: string, index: number): string => {
  const colors = [
    "#0EA5E9", // Modern blue
    "#4F46E5", // Professional indigo
    "#8B5CF6", // Subtle violet
    "#64748B", // Professional slate
    "#0EA5E9", // Modern blue
    "#4F46E5", // Professional indigo
  ];

  const lowerIssuer = issuer.toLowerCase();
  if (lowerIssuer.includes('aws') || lowerIssuer.includes('amazon')) return "#FF9900";
  if (lowerIssuer.includes('google')) return "#4285F4";
  if (lowerIssuer.includes('microsoft') || lowerIssuer.includes('azure')) return "#0078D4";
  if (lowerIssuer.includes('meta') || lowerIssuer.includes('facebook')) return "#0084FF";
  if (lowerIssuer.includes('mongodb')) return "#47A248";
  if (lowerIssuer.includes('kubernetes') || lowerIssuer.includes('cncf')) return "#326CE5";

  return colors[index % colors.length];
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.getFullYear().toString();
};

export default function Certifications() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/certifications')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch certifications:', err);
        setLoading(false);
      });
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section id="certifications" className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center text-body">Loading certifications...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-cardBg px-4 py-2 rounded-full border border-border shadow-md mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Award size={20} className="text-accent" />
            <span className="text-sm text-textLight font-medium">Professional Credentials</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <TextFillOnScroll fillColor="#0EA5E9" duration={1.8}>
              Certifications
            </TextFillOnScroll>
          </h2>
          <p className="text-body text-lg max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to continuous learning.
          </p>
        </motion.div>

        {/* Certifications timeline/grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {(data?.certifications || []).map((cert, index) => {
            const color = getColorForCert(cert.issuer, index);
            
            return (
              <motion.div
                key={cert.id}
                variants={staggerItem}
                className="group relative"
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="glassmorphism rounded-2xl p-6 h-full flex flex-col"
                  whileHover={{
                    borderColor: color,
                    borderWidth: "2px",
                  }}
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Certificate icon/logo */}
                  <motion.div
                    className="mb-4 p-4 rounded-xl w-fit"
                    style={{ backgroundColor: `${color}15` }}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Award size={32} style={{ color: color }} />
                  </motion.div>

                  {/* Certificate info */}
                  <h3 className="text-xl font-bold text-heading mb-2 group-hover:text-gradient transition-all">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-textLight mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(cert.issued_date)}</span>
                  </div>

                  <p className="text-sm font-semibold mb-2" style={{ color: color }}>
                    {cert.issuer}
                  </p>

                  <p className="text-sm text-body mb-4 flex-grow">
                    {cert.description}
                  </p>

                  {/* Action buttons */}
                  <div className="mt-auto space-y-2">
                    {/* Show Credentials button */}
                    {cert.badge_url && (
                      <motion.a
                        href={cert.badge_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-all group/badge w-full"
                        style={{ 
                          borderColor: color,
                          color: color
                        }}
                        whileHover={{ 
                          backgroundColor: `${color}10`,
                          scale: 1.02
                        }}
                      >
                        <Award size={16} />
                        <span>Show Credentials</span>
                      </motion.a>
                    )}
                    
                    {/* Verification link */}
                    {cert.credential_url && (
                      <motion.a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-sm font-medium group/link"
                        style={{ color: color }}
                        whileHover={{ x: 5 }}
                      >
                        <span>Verify Credential</span>
                        <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </motion.a>
                    )}
                  </div>

                  {/* 3D tilt effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    whileHover={{
                      boxShadow: `0 0 40px ${color}40`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Participation Certificates Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-24"
        >
          {/* Divider */}
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-primary px-4 text-sm text-textLight">
                Event Participations
              </span>
            </div>
          </div>

          {/* Section Title */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <TextFillOnScroll fillColor="#8B5CF6" duration={1.5}>
                Participation Certificates
              </TextFillOnScroll>
            </h3>
            <p className="text-body max-w-2xl mx-auto">
              Recognitions from workshops, hackathons, and tech events I've participated in.
            </p>
          </div>

          {/* Certificate Slider */}
          <CertificateSlider />
        </motion.div>
      </div>
    </section>
  );
}