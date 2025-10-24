// Auto-generated database types for Supabase
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/types/database.ts

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          detailed_description: string | null;
          category: string | null;
          tags: string[] | null;
          tech_stack: {
            frontend?: string[];
            backend?: string[];
            database?: string[];
            devops?: string[];
          } | null;
          thumbnail_url: string | null;
          images: string[] | null;
          demo_url: string | null;
          github_url: string | null;
          video_url: string | null;
          metrics: {
            [key: string]: string | number;
          } | null;
          features: string[] | null;
          status: 'draft' | 'published' | 'archived';
          is_featured: boolean;
          display_order: number;
          views_count: number;
          likes_count: number;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
          updated_at: string;
          meta_title: string | null;
          meta_description: string | null;
          og_image: string | null;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at' | 'views_count' | 'likes_count'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          type: string | null;
          description: string | null;
          skills_gained: string[] | null;
          badge_url: string | null;
          certificate_url: string | null;
          credential_url: string | null;
          issued_date: string;
          expiry_date: string | null;
          credential_id: string | null;
          is_featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['certifications']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['certifications']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          subject: string | null;
          message: string;
          type: string;
          priority: string;
          status: 'new' | 'read' | 'replied' | 'archived' | 'spam';
          replied_at: string | null;
          ip_address: string | null;
          user_agent: string | null;
          referrer: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          status: 'active' | 'unsubscribed' | 'bounced';
          verified: boolean;
          verification_token: string | null;
          interests: string[] | null;
          frequency: string;
          source: string | null;
          ip_address: string | null;
          subscribed_at: string;
          unsubscribed_at: string | null;
          last_email_sent_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['newsletter_subscribers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Insert']>;
      };
      page_views: {
        Row: {
          id: string;
          page_path: string;
          page_title: string | null;
          visitor_id: string | null;
          session_id: string | null;
          referrer: string | null;
          user_agent: string | null;
          ip_address: string | null;
          country: string | null;
          city: string | null;
          device_type: string | null;
          browser: string | null;
          os: string | null;
          viewed_at: string;
        };
        Insert: Omit<Database['public']['Tables']['page_views']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['page_views']['Insert']>;
      };
      testimonials: {
        Row: {
          id: string;
          author_name: string;
          author_position: string | null;
          author_company: string | null;
          author_image_url: string | null;
          author_linkedin: string | null;
          content: string;
          rating: number | null;
          project_id: string | null;
          relationship: string | null;
          is_featured: boolean;
          is_approved: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          proficiency: number | null;
          description: string | null;
          icon_url: string | null;
          icon_name: string | null;
          color: string | null;
          years_of_experience: number | null;
          projects_count: number;
          is_featured: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['skills']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['skills']['Insert']>;
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string;
          category: string;
          date: string;
          date_display: string | null;
          display_order: number;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['achievements']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>;
      };
      awards: {
        Row: {
          id: string;
          title: string;
          organization: string;
          description: string;
          year: string;
          category: string | null;
          display_order: number;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['awards']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['awards']['Insert']>;
      };
      achievement_stats: {
        Row: {
          id: string;
          stat_key: string;
          label: string;
          value: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['achievement_stats']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['achievement_stats']['Insert']>;
      };
    };
  };
}

// Convenience types
export type Project = Database['public']['Tables']['projects']['Row'];
export type Certification = Database['public']['Tables']['certifications']['Row'];
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];
export type NewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row'];
export type PageView = Database['public']['Tables']['page_views']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type Skill = Database['public']['Tables']['skills']['Row'];
export type Achievement = Database['public']['Tables']['achievements']['Row'];
export type Award = Database['public']['Tables']['awards']['Row'];
export type AchievementStat = Database['public']['Tables']['achievement_stats']['Row'];

