-- ============================================
-- SAMPLE DATA FOR DEVELOPMENT
-- ============================================
-- Run this after schema.sql to populate with sample data
-- ============================================

-- Sample Projects
INSERT INTO projects (
  title, slug, description, detailed_description,
  category, tags, tech_stack,
  thumbnail_url, demo_url, github_url,
  metrics, features,
  status, is_featured, display_order,
  start_date, end_date
) VALUES
(
  'E-Commerce Platform',
  'ecommerce-platform',
  'A modern, scalable e-commerce solution with AI-powered recommendations',
  'Built a comprehensive e-commerce platform from scratch featuring real-time inventory management, AI-powered product recommendations, and seamless payment integration. The platform handles 10K+ daily transactions with 99.9% uptime.',
  'Web Apps',
  ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Redis'],
  '{"frontend": ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"], "backend": ["Node.js", "Express", "PostgreSQL"], "devops": ["Vercel", "Supabase", "Upstash"], "payment": ["Stripe"]}'::jsonb,
  'https://placehold.co/800x600/0EA5E9/white?text=E-Commerce',
  'https://example.com',
  'https://github.com',
  '{"revenue": "$10M+", "users": "100K+", "conversion": "3.2%", "uptime": "99.9%"}'::jsonb,
  ARRAY['AI Product Recommendations', 'Real-time Inventory', 'Multi-currency Support', 'Admin Dashboard', 'Analytics'],
  'published',
  true,
  1,
  '2023-01-01',
  '2023-12-31'
),
(
  'AI Content Generator',
  'ai-content-generator',
  'GPT-powered content creation tool for marketing teams',
  'Developed an AI-powered content generation platform that helps marketing teams create blog posts, social media content, and ad copy 10x faster. Integrates with OpenAI GPT-4 and includes tone customization, SEO optimization, and multilingual support.',
  'Web Apps',
  ARRAY['React', 'Python', 'OpenAI', 'FastAPI', 'Docker'],
  '{"frontend": ["React", "TypeScript", "Material UI"], "backend": ["Python", "FastAPI", "OpenAI API"], "database": ["MongoDB"], "devops": ["Docker", "AWS"]}'::jsonb,
  'https://placehold.co/800x600/8B5CF6/white?text=AI+Generator',
  'https://example.com/ai',
  'https://github.com',
  '{"users": "50K+", "content_generated": "1M+", "satisfaction": "4.9/5", "time_saved": "90%"}'::jsonb,
  ARRAY['GPT-4 Integration', 'SEO Optimization', 'Multilingual', 'Tone Customization', 'Team Collaboration'],
  'published',
  true,
  2,
  '2023-06-01',
  '2024-02-28'
),
(
  'Task Management Mobile App',
  'task-management-app',
  'Cross-platform productivity app with offline-first architecture',
  'Created a feature-rich task management application for iOS and Android using React Native. Implemented offline-first architecture with data sync, push notifications, and team collaboration features. App has 500K+ downloads and 4.8★ rating.',
  'Mobile',
  ARRAY['React Native', 'Firebase', 'Redux', 'TypeScript'],
  '{"frontend": ["React Native", "TypeScript", "Redux"], "backend": ["Firebase", "Cloud Functions"], "database": ["Firestore"], "notifications": ["FCM"]}'::jsonb,
  'https://placehold.co/800x600/EC4899/white?text=Task+App',
  'https://apps.apple.com/example',
  'https://github.com',
  '{"downloads": "500K+", "rating": "4.8/5", "dau": "50K+", "retention": "75%"}'::jsonb,
  ARRAY['Offline Mode', 'Real-time Sync', 'Team Collaboration', 'Calendar Integration', 'Smart Notifications'],
  'published',
  false,
  3,
  '2022-09-01',
  '2023-05-31'
);

-- Sample Certifications
INSERT INTO certifications (
  title, issuer, type, description,
  skills_gained, badge_url, credential_url,
  issued_date, credential_id,
  is_featured, display_order
) VALUES
(
  'AWS Certified Solutions Architect - Professional',
  'Amazon Web Services',
  'certification',
  'Advanced certification demonstrating expertise in designing distributed applications and systems on AWS platform',
  ARRAY['AWS Architecture', 'Cloud Security', 'Cost Optimization', 'High Availability', 'Disaster Recovery'],
  'https://placehold.co/200x200/FF9900/white?text=AWS',
  'https://aws.amazon.com/verification',
  '2023-08-15',
  'AWS-SAP-2023-123456',
  true,
  1
),
(
  'Google Cloud Professional Cloud Architect',
  'Google Cloud',
  'certification',
  'Professional-level certification for designing and managing robust, secure, scalable cloud architecture',
  ARRAY['GCP Architecture', 'Kubernetes', 'Cloud Migration', 'DevOps', 'Infrastructure as Code'],
  'https://placehold.co/200x200/4285F4/white?text=GCP',
  'https://cloud.google.com/certification',
  '2023-06-20',
  'GCP-PCA-2023-789012',
  true,
  2
),
(
  'MongoDB Certified Developer',
  'MongoDB',
  'certification',
  'Professional certification demonstrating expertise in MongoDB database design and development',
  ARRAY['NoSQL Design', 'Aggregation Framework', 'Indexing', 'Replication', 'Sharding'],
  'https://placehold.co/200x200/47A248/white?text=MongoDB',
  'https://university.mongodb.com/certification',
  '2023-03-10',
  'MONGODB-DEV-2023-345678',
  false,
  3
);

-- Sample Skills
INSERT INTO skills (
  name, category, proficiency, description,
  icon_name, color, years_of_experience,
  is_featured, display_order
) VALUES
-- Frontend
('React/Next.js', 'Frontend', 95, 'Building modern, performant web applications with server-side rendering', 'react', '#0EA5E9', 5, true, 1),
('TypeScript', 'Frontend', 90, 'Type-safe development with advanced TypeScript patterns', 'typescript', '#0EA5E9', 4, true, 2),
('Tailwind CSS', 'Frontend', 92, 'Rapid UI development with utility-first CSS framework', 'tailwind', '#0EA5E9', 3, false, 3),
('Vue.js', 'Frontend', 85, 'Progressive framework for building user interfaces', 'vue', '#0EA5E9', 3, false, 4),

-- Backend
('Node.js', 'Backend', 90, 'Building scalable server-side applications and APIs', 'nodejs', '#8B5CF6', 5, true, 5),
('Python', 'Backend', 88, 'Data processing, automation, and backend development', 'python', '#8B5CF6', 4, true, 6),
('PostgreSQL', 'Backend', 85, 'Relational database design and optimization', 'database', '#8B5CF6', 4, false, 7),
('MongoDB', 'Backend', 82, 'NoSQL database for flexible data storage', 'database', '#8B5CF6', 3, false, 8),

-- Design
('Figma', 'Design', 92, 'UI/UX design and prototyping', 'figma', '#EC4899', 4, true, 9),
('UI/UX Design', 'Design', 88, 'User-centered design principles and methodologies', 'palette', '#EC4899', 5, true, 10),

-- DevOps & Tools
('Git/GitHub', 'Tools & DevOps', 93, 'Version control and collaborative development', 'git', '#F59E0B', 6, true, 11),
('Docker', 'Tools & DevOps', 85, 'Containerization and deployment', 'docker', '#F59E0B', 3, false, 12),
('AWS', 'Tools & DevOps', 80, 'Cloud infrastructure and services', 'cloud', '#F59E0B', 3, false, 13);

-- Sample Testimonials
INSERT INTO testimonials (
  author_name, author_position, author_company,
  author_image_url, content, rating,
  relationship, is_featured, is_approved,
  display_order
) VALUES
(
  'Sarah Johnson',
  'CEO',
  'TechStart Inc.',
  'https://i.pravatar.cc/150?img=1',
  'Exceptional developer who delivered our e-commerce platform ahead of schedule. The attention to detail and code quality exceeded our expectations. Highly recommended!',
  5,
  'client',
  true,
  true,
  1
),
(
  'Michael Chen',
  'CTO',
  'Digital Solutions Ltd',
  'https://i.pravatar.cc/150?img=2',
  'Working with this developer was a game-changer for our team. Their expertise in modern web technologies and problem-solving skills are outstanding.',
  5,
  'client',
  true,
  true,
  2
),
(
  'Emily Rodriguez',
  'Product Manager',
  'InnovateCo',
  'https://i.pravatar.cc/150?img=3',
  'A true professional who not only writes excellent code but also brings valuable product insights to the table. Our app''s success is largely due to their contributions.',
  5,
  'colleague',
  false,
  true,
  3
);

-- Sample Newsletter Subscribers (for testing)
INSERT INTO newsletter_subscribers (
  email, name, status, verified, interests
) VALUES
('test1@example.com', 'Test User 1', 'active', true, ARRAY['Web Development', 'AI']),
('test2@example.com', 'Test User 2', 'active', true, ARRAY['Mobile Development']);

-- Update project counts for skills
UPDATE skills
SET projects_count = (
  SELECT COUNT(DISTINCT p.id)
  FROM projects p
  WHERE p.tags @> ARRAY[skills.name]
);

