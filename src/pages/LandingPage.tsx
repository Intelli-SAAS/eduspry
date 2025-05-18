
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Lightbulb, Award, BookOpen, Shield, Zap } from 'lucide-react';

// UI Components
import { AnimatedNavHeader } from '@/components/ui/animated-nav-header';
import { HeroSection } from '@/components/ui/hero-section';
import { FeatureSection } from '@/components/ui/feature-section';
import { FeaturesCarousel } from '@/components/ui/features-carousel';
import { TestimonialSection } from '@/components/ui/testimonial-section';
import { CTASection } from '@/components/ui/cta-section';
import { BadgeDisplay } from '@/components/ui/badge-display';
import { LearningPath } from '@/components/ui/learning-path';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { InteractiveDeviceMockup } from '@/components/ui/interactive-device-mockup';
import { Footer } from '@/components/ui/footer';

const LandingPage: React.FC = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Mock data for navigation
  const navLinks = [
    { text: "Features", href: "/features" },
    { text: "Pricing", href: "/pricing" },
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" }
  ];

  const ctaButtons = {
    primary: { text: "Sign up", href: "/register" },
    secondary: { text: "Login", href: "/login" }
  };

  // Mock data for features
  const features = [
    {
      title: "AI-Generated Content",
      description: "Create lesson plans, tests, quizzes and flashcards in seconds with our advanced AI assistance.",
      icon: <Lightbulb className="h-7 w-7 text-white" />,
      features: ['Test generators', 'Lesson planners', 'Flashcard creators']
    },
    {
      title: "Student Engagement",
      description: "Boost student engagement with interactive learning tools and personalized content.",
      icon: <Users className="h-7 w-7 text-white" />,
      features: ['Voice assistant', 'Doubt solving', 'Interactive quizzes']
    },
    {
      title: "Performance Analytics",
      description: "Track student performance with detailed analytics and actionable insights.",
      icon: <Award className="h-7 w-7 text-white" />,
      features: ['Performance dashboards', 'Progress tracking', 'Personalized recommendations']
    }
  ];

  // Mock data for feature carousel
  const carouselFeatures = [
    {
      title: "Live Interactive Classes",
      description: "Engage in real-time with students through interactive virtual classrooms with whiteboard and screen sharing",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='200' viewBox='0 0 340 200'%3E%3Crect width='340' height='200' fill='%23e6f0ff'/%3E%3Crect x='20' y='20' width='300' height='160' rx='8' fill='white' stroke='%231a4480' stroke-width='2'/%3E%3Crect x='30' y='30' width='180' height='110' rx='4' fill='%23dbeafe'/%3E%3Ccircle cx='120' cy='85' r='25' fill='%231a4480' opacity='0.8'/%3E%3Crect x='220' y='30' width='90' height='140' rx='4' fill='%23f0f9ff'/%3E%3Crect x='230' y='40' width='70' height='15' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Crect x='230' y='65' width='70' height='15' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Crect x='230' y='90' width='70' height='15' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Crect x='230' y='115' width='70' height='15' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Cpath d='M120 70 L135 95 L105 95 Z' fill='white'/%3E%3C/svg%3E",
      color: "from-blue-50 to-indigo-50",
      icon: <Users className="h-6 w-6 text-[#1a4480]" />
    },
    {
      title: "AI-Powered Course Creation",
      description: "Create comprehensive courses with intelligent content suggestions and automated resource generation",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='200' viewBox='0 0 340 200'%3E%3Crect width='340' height='200' fill='%23e6f0ff'/%3E%3Crect x='40' y='30' width='260' height='140' rx='8' fill='white' stroke='%231a4480' stroke-width='2'/%3E%3Crect x='50' y='50' width='80' height='100' rx='4' fill='%23dbeafe'/%3E%3Crect x='140' y='50' width='80' height='100' rx='4' fill='%23dbeafe'/%3E%3Crect x='230' y='50' width='60' height='100' rx='4' fill='%23dbeafe'/%3E%3Cpath d='M60 140 L120 140 L120 90 L90 70 L60 90 Z' fill='%231a4480' opacity='0.2'/%3E%3Cpath d='M150 140 L210 140 L210 90 L180 70 L150 90 Z' fill='%231a4480' opacity='0.7'/%3E%3Cpath d='M240 140 L280 140 L280 90 L260 70 L240 90 Z' fill='%231a4480' opacity='0.4'/%3E%3Crect x='65' y='60' width='50' height='6' rx='2' fill='%231a4480' opacity='0.7'/%3E%3Crect x='155' y='60' width='50' height='6' rx='2' fill='white'/%3E%3Crect x='240' y='60' width='40' height='6' rx='2' fill='%231a4480' opacity='0.7'/%3E%3C/svg%3E",
      color: "from-purple-50 to-indigo-50",
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />
    },
    {
      title: "Secure Proctored Exams",
      description: "Conduct secure, AI-monitored assessments with automated identity verification and anti-cheating measures",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='200' viewBox='0 0 340 200'%3E%3Crect width='340' height='200' fill='%23e6f0ff'/%3E%3Crect x='40' y='40' width='260' height='120' rx='8' fill='white' stroke='%231a4480' stroke-width='2'/%3E%3Crect x='60' y='60' width='160' height='80' rx='4' fill='%23dbeafe'/%3E%3Crect x='230' y='60' width='50' height='80' rx='4' fill='%23f0f9ff'/%3E%3Ccircle cx='140' cy='100' r='30' fill='%231a4480' opacity='0.7'/%3E%3Cpath d='M140 85 L140 105 L155 95 Z' fill='white'/%3E%3Crect x='235' y='70' width='40' height='10' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Crect x='235' y='90' width='40' height='10' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Crect x='235' y='110' width='40' height='10' rx='2' fill='%231a4480' opacity='0.2'/%3E%3Cpath d='M40 40 L60 20 L300 20 L280 40 Z' fill='%231a4480' opacity='0.1'/%3E%3Cpath d='M300 160 L280 180 L40 180 L60 160 Z' fill='%231a4480' opacity='0.1'/%3E%3C/svg%3E",
      color: "from-green-50 to-emerald-50",
      icon: <Shield className="h-6 w-6 text-green-600" />
    },
    {
      title: "AI Doubts Solver",
      description: "Instant resolution of student questions with context-aware AI that understands complex educational concepts",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='340' height='200' viewBox='0 0 340 200'%3E%3Crect width='340' height='200' fill='%23e6f0ff'/%3E%3Crect x='20' y='40' width='300' height='120' rx='8' fill='white' stroke='%231a4480' stroke-width='2'/%3E%3Cpath d='M80 70 L120 70 A15 15 0 0 1 120 100 L80 100 Z' fill='%23dbeafe'/%3E%3Cpath d='M220 110 L260 110 A15 15 0 0 0 260 80 L220 80 Z' fill='%231a4480' opacity='0.1'/%3E%3Cpath d='M160 50 L180 50 A10 10 0 0 1 180 70 L160 70 Z' fill='%231a4480' opacity='0.3'/%3E%3Ccircle cx='70' cy='130' r='10' fill='%23dbeafe'/%3E%3Ccircle cx='270' cy='60' r='10' fill='%231a4480' opacity='0.1'/%3E%3Ccircle cx='170' cy='90' r='20' fill='%231a4480' opacity='0.7'/%3E%3Cpath d='M170 83 L177 90 L170 97 L163 90 Z' fill='white'/%3E%3C/svg%3E",
      color: "from-blue-50 to-cyan-50",
      icon: <Zap className="h-6 w-6 text-blue-600" />
    }
  ];

  // Mock data for testimonials
  const testimonials = [
    {
      quote: "EduSpry has completely transformed how I create lesson plans. What used to take hours now takes minutes, and the quality is better!",
      name: "Dr. Sarah Johnson",
      role: "High School Science Teacher",
      rating: 5
    },
    {
      quote: "As a principal, I need insights into how our students are performing. The analytics tools provide exactly what I need to make informed decisions.",
      name: "Michael Chen",
      role: "School Principal",
      rating: 5
    },
    {
      quote: "The AI tutor helped me understand complex topics in a way that made sense to me. My grades have improved significantly!",
      name: "Emma Rodriguez",
      role: "University Student",
      rating: 5
    }
  ];

  // Mock data for badges
  const badges = [
    { id: '1', name: 'Quick Start', description: 'Complete your first course', icon: '🚀', color: 'from-blue-400 to-blue-600', isCompleted: true },
    { id: '2', name: 'Math Wizard', description: 'Complete 5 math exercises', icon: '🧮', color: 'from-purple-400 to-purple-600', progress: 60 },
    { id: '3', name: 'Science Explorer', description: 'Finish a science project', icon: '🔬', color: 'from-green-400 to-green-600', progress: 25 },
    { id: '4', name: 'Literary Scholar', description: 'Read 3 books', icon: '📚', color: 'from-yellow-400 to-yellow-600', isCompleted: true },
    { id: '5', name: 'Coding Ninja', description: 'Solve 10 coding challenges', icon: '💻', color: 'from-red-400 to-red-600', progress: 40 },
    { id: '6', name: 'Team Player', description: 'Participate in a group activity', icon: '🤝', color: 'from-indigo-400 to-indigo-600', progress: 10 }
  ];

  // Mock data for learning path
  const learningSteps = [
    {
      id: 'step1',
      title: 'Complete Profile',
      description: 'Fill in your educational background and learning preferences to get personalized recommendations.',
      completed: true,
      link: '/profile'
    },
    {
      id: 'step2',
      title: 'Take Assessment',
      description: 'Complete a brief assessment to determine your current knowledge level and learning needs.',
      completed: true,
      link: '/assessment'
    },
    {
      id: 'step3',
      title: 'Start Learning Path',
      description: 'Begin your personalized curriculum with interactive lessons and hands-on exercises.',
      completed: false,
      link: '/courses'
    },
    {
      id: 'step4',
      title: 'Complete Capstone Project',
      description: 'Apply what you've learned in a comprehensive project that demonstrates your new skills.',
      completed: false,
      link: '/projects'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Navigation Header */}
      <AnimatedNavHeader links={navLinks} ctaButtons={ctaButtons} />

      {/* Hero Section */}
      <HeroSection 
        title="Transform Your Education|With AI-Powered Learning"
        subtitle="EduSpry helps teachers create engaging content, students learn more effectively, and institutions track performance - all through an intuitive, AI-enhanced platform."
        primaryCta={{ text: "Get Started Free", link: "/register" }}
        secondaryCta={{ text: "Watch Demo", link: "/demo" }}
      />

      {/* Floating Device Mockup */}
      <InteractiveDeviceMockup />

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50 relative">
        <AnimatedBackground />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-500">
            {["harvard", "stanford", "mit", "oxford", "cambridge"].map((brand, index) => (
              <img 
                key={brand}
                src={`/brands/${brand}.svg`} 
                alt={brand} 
                className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Carousel */}
      <FeaturesCarousel
        title="Advanced Educational Tools"
        subtitle="Powerful Platform Features"
        features={carouselFeatures}
        ctaText="Explore All Features"
        ctaLink="/features"
      />

      {/* Features Section */}
      <FeatureSection
        title="Why Choose EduSpry?"
        subtitle="Innovative Educational Solutions"
        features={features}
        ctaText="Learn More About Our Features"
        ctaLink="/features"
      />

      {/* Learning Path Section */}
      <LearningPath
        title="Your Learning Journey"
        subtitle="Personalized Path"
        steps={learningSteps}
      />

      {/* Gamification Badges Section */}
      <BadgeDisplay
        title="Earn Badges & Track Progress"
        subtitle="Complete challenges and showcase your achievements"
        badges={badges}
      />

      {/* Testimonials */}
      <TestimonialSection
        title="What Our Users Say"
        subtitle="Success Stories"
        testimonials={testimonials}
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Educational Experience?"
        description="Join thousands of educators and students who are already benefiting from EduSpry's AI-powered platform."
        primaryCta={{ text: "Start Your Free Trial", link: "/register" }}
        secondaryCta={{ text: "Contact Sales", link: "/contact" }}
      />

      {/* Footer Section - Now using the refactored Footer component */}
      <Footer />
    </div>
  );
};

export default LandingPage;
