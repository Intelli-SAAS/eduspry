import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Lightbulb, Award, BookOpen, Shield, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
import { CardSkeleton, MetricSkeleton, FeatureCardSkeleton, LoadingSpinner, LearningPathSkeleton } from '@/components/ui/loading-states';

const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);  const [contentLoaded, setContentLoaded] = useState({
    features: false,
    metrics: false,
    carousel: false,
    learningPath: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effect values
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate content loading
    const loadContent = async () => {
      // Features
      setTimeout(() => {
        setContentLoaded(prev => ({ ...prev, features: true }));
      }, 800);

      // Metrics
      setTimeout(() => {
        setContentLoaded(prev => ({ ...prev, metrics: true }));
      }, 1200);

      // Carousel
      setTimeout(() => {
        setContentLoaded(prev => ({ ...prev, carousel: true }));
      }, 1500);

      // Learning Path
      setTimeout(() => {
        setContentLoaded(prev => ({ ...prev, learningPath: true }));
      }, 1800);

      // All content loaded
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadContent();
  }, []);

  // Navigation configuration
  const navLinks = [
    { text: "Features", href: "/features" },
    { text: "Pricing", href: "/pricing" },
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" }
  ];

  const ctaButtons = {
    primary: { text: "Get Started", href: "/register" },
    secondary: { text: "Login", href: "/login" }
  };

  // Hero section configuration
  const heroProps = {
    title: "Transform Education|With AI-Powered Learning",
    subtitle: "Empower your educational institution with cutting-edge AI technology, interactive learning tools, and comprehensive analytics to deliver an exceptional learning experience.",
    primaryCta: {
      text: "Start Free Trial",
      link: "/register"
    },
    secondaryCta: {
      text: "Watch Demo",
      link: "#demo"
    }
  };

  // Features configuration with enhanced descriptions
  const features = [
    {
      title: "AI-Generated Content",
      description: "Create personalized lesson plans, adaptive assessments, and interactive content in seconds with our advanced AI assistance.",
      icon: <Lightbulb className="h-7 w-7 text-white" />,
      features: ['Smart Content Generation', 'Personalized Learning Paths', 'Automated Assessment Creation']
    },
    {
      title: "Student Engagement",
      description: "Drive active participation with real-time interaction tools, gamification, and AI-powered doubt resolution.",
      icon: <Users className="h-7 w-7 text-white" />,
      features: ['Live Interactive Sessions', 'Instant Doubt Resolution', 'Gamified Learning Experience']
    },
    {
      title: "Performance Analytics",
      description: "Make data-driven decisions with comprehensive analytics, progress tracking, and predictive insights.",
      icon: <Award className="h-7 w-7 text-white" />,
      features: ['Real-time Performance Tracking', 'Predictive Analytics', 'Customized Reports']
    }
  ];

  // Features Carousel configuration
  const carouselFeatures = [
    {
      title: "Interactive Virtual Classrooms",
      description: "Engage students with real-time interaction, whiteboarding, and seamless screen sharing.",
      image: "/images/features/virtual-classroom.svg",
      color: "from-blue-50 to-indigo-50",
      icon: <Users className="h-6 w-6 text-[#1a4480]" />
    },
    {
      title: "AI Course Generation",
      description: "Create comprehensive courses with intelligent content suggestions and automated assessments.",
      image: "/images/features/ai-course.svg",
      color: "from-purple-50 to-indigo-50",
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />
    },
    {
      title: "Smart Assessment System",
      description: "Conduct secure, AI-monitored examinations with advanced anti-cheating measures.",
      image: "/images/features/assessment.svg",
      color: "from-green-50 to-emerald-50",
      icon: <Shield className="h-6 w-6 text-green-600" />
    },
    {
      title: "Intelligent Learning Assistant",
      description: "Provide instant support with our context-aware AI that understands educational concepts.",
      image: "/images/features/ai-assistant.svg",
      color: "from-blue-50 to-cyan-50",
      icon: <Zap className="h-6 w-6 text-blue-600" />
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <AnimatedNavHeader links={navLinks} ctaButtons={ctaButtons} />
      
      <main className="relative">
        <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
        <AnimatedBackground>
          <HeroSection {...heroProps} />
        </AnimatedBackground>

        {/* Feature Highlights */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-4 sm:px-6 lg:px-8"
        >
          {!contentLoaded.features ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[1, 2, 3].map((idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <FeatureSection
              title="Revolutionize Learning"
              subtitle="POWERFUL FEATURES"
              features={features}
              ctaText="Explore All Features"
              ctaLink="/features"
            />
          )}
        </motion.div>

        {/* Interactive Device Preview with Responsive Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveDeviceMockup />
        </div>

        {/* Features Carousel with Touch Support */}
        <div className="touch-pan-x overflow-hidden">
          {!contentLoaded.carousel ? (
            <div className="flex gap-6 py-8 px-10 overflow-x-auto hide-scrollbar">
              {[1, 2, 3, 4].map((idx) => (
                <FeatureCardSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <FeaturesCarousel
              title="Powerful Features"
              subtitle="EXPLORE OUR SOLUTIONS"
              features={carouselFeatures}
            />
          )}
        </div>        {/* Success Metrics - Responsive Grid */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {!contentLoaded.metrics ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <MetricSkeleton key={idx} />
                ))
              ) : (
                [
                  { label: "Active Students", value: "50K+" },
                  { label: "Course Completion Rate", value: "94%" },
                  { label: "Satisfaction Score", value: "4.8/5" },
                  { label: "Partner Institutions", value: "100+" }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    variants={fadeInUp}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center p-4 sm:p-6 bg-white/5 rounded-lg backdrop-blur-sm"
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{metric.value}</div>
                    <div className="text-xs sm:text-sm text-blue-100">{metric.label}</div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Learning Path */}
        {!contentLoaded.learningPath ? (
          <LearningPathSkeleton />
        ) : (
          <LearningPath
            title="Your Journey to Success"
            subtitle="LEARNING PATH"
            steps={[
              {
                id: "step1",
                title: "Getting Started",
                description: "Set up your educational environment and customize your learning experience.",
                completed: false,
                link: "/getting-started"
              },
              {
                id: "step2",
                title: "Create Content",
                description: "Use AI to generate engaging educational content and assessments.",
                completed: false,
                link: "/create-content"
              },
              {
                id: "step3",
                title: "Engage Students",
                description: "Implement interactive learning tools and track progress in real-time.",
                completed: false,
                link: "/engage-students"
              },
              {
                id: "step4",
                title: "Analyze & Improve",
                description: "Use analytics to optimize your teaching methods and student outcomes.",
                completed: false,
                link: "/analyze"
              }
            ]}
          />
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            onAnimationComplete={() => setIsLoading(false)}
          >
            <motion.div 
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <LoadingSpinner className="text-[#1a4480] w-12 h-12 mb-4" />
              <div className="text-[#1a4480] font-medium">Loading amazing content...</div>
            </motion.div>
          </motion.div>
        )}

        {/* Learning Path */}
        <LearningPath
          title="Your Journey to Success"
          subtitle="LEARNING PATH"
          steps={[
            {
              id: "step1",
              title: "Getting Started",
              description: "Set up your educational environment and customize your learning experience.",
              completed: false,
              link: "/getting-started"
            },
            {
              id: "step2",
              title: "Create Content",
              description: "Use AI to generate engaging educational content and assessments.",
              completed: false,
              link: "/create-content"
            },
            {
              id: "step3",
              title: "Engage Students",
              description: "Implement interactive learning tools and track progress in real-time.",
              completed: false,
              link: "/engage-students"
            },
            {
              id: "step4",
              title: "Analyze & Improve",
              description: "Use analytics to optimize your teaching methods and student outcomes.",
              completed: false,
              link: "/analyze"
            }
          ]}
        />

        {/* Call to Action */}
        <CTASection
          title="Ready to Transform Your Institution?"
          description="Join thousands of educational institutions already using EduSpry"
          primaryCta={{ text: "Get Started", link: "/register" }}
          secondaryCta={{ text: "Contact Sales", link: "/contact" }}
        />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
