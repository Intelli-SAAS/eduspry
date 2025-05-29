
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Lightbulb, Award, BookOpen, Shield, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

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
import { ParallaxLayer } from '@/components/ui/parallax-layer';
import { GlassmorphicCard } from '@/components/ui/glassmorphic-card';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { FloatingDots } from '@/components/ui/floating-dots';
import { CurvesBackground } from '@/components/ui/curves-background';
import { EduSpryHeroBackground } from '@/components/ui/eduspry-hero-background';

const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);  
  const [contentLoaded, setContentLoaded] = useState({
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
    title: "Transform Education With AI-Powered Learning",
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

  const heroWords = "Transform Education with EduSpry".split(" ");

  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden relative">
      {/* Enhanced background with modern components */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-blue-50 via-white to-blue-50 -z-10" />
      <FloatingDots className="fixed inset-0 -z-5" />
      <CurvesBackground className="fixed inset-0 -z-5" />
      
      <AnimatedNavHeader links={navLinks} ctaButtons={ctaButtons} />
      
      <main className="relative">
        {/* Hero Section with BackgroundPaths Integration */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <EduSpryHeroBackground>
            <div className="container mx-auto px-6 relative z-20">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  {heroWords.map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      className="inline-block mr-4 last:mr-0"
                    >
                      {word.split("").map((letter, letterIndex) => (
                        <motion.span
                          key={`${wordIndex}-${letterIndex}`}
                          initial={{ y: 100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            delay: wordIndex * 0.15 + letterIndex * 0.05,
                            type: "spring",
                            stiffness: 120,
                            damping: 25,
                          }}
                          className="inline-block text-transparent bg-clip-text 
                          bg-gradient-to-r from-[#1a4480] to-[#4d7cc7]"
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </h1>
                
                <motion.p 
                  className="text-xl text-gray-600 mb-8 max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  Empower your educational institution with cutting-edge AI technology, interactive learning tools, and comprehensive analytics to deliver an exceptional learning experience.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                  <Link to="/register" className="group">
                    <button className="px-8 py-4 bg-[#1a4480] text-white rounded-lg font-medium text-lg flex items-center shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                      <span className="relative z-10">Start Free Trial</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </Link>
                  
                  <Link to="#demo">
                    <button className="px-8 py-4 bg-white text-[#1a4480] border border-[#1a4480] rounded-lg font-medium text-lg flex items-center hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1">
                      <span>Watch Demo</span>
                      <span className="ml-2">▶</span>
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </EduSpryHeroBackground>

          <motion.div
            style={{ y: bgY }}
            className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent"
          />
        </section>

        {/* Feature Highlights with Glassmorphism */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-4 sm:px-6 lg:px-8 py-24"
        >
          {!contentLoaded.features ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[1, 2, 3].map((idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <div className="container mx-auto">
              <motion.div 
                className="text-center mb-16" 
                variants={fadeInUp} 
                custom={0}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1a4480]">Revolutionize Learning</h2>
                <div className="h-1 w-24 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-3xl mx-auto">Our powerful features are designed to transform how educational institutions teach, engage with students, and track progress.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={feature.title}
                    variants={fadeInUp}
                    custom={index + 1}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <GlassmorphicCard>
                      <div className="p-6">
                        <div className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-r from-[#1a4480] to-[#4d7cc7]">
                          {feature.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold text-[#1a4480] mb-3">{feature.title}</h3>
                        <p className="text-gray-600 mb-6">{feature.description}</p>
                        
                        <ul className="space-y-2">
                          {feature.features.map((item) => (
                            <li key={item} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </GlassmorphicCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Interactive Device Preview with 3D effects */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <InteractiveDeviceMockup />
        </div>

        {/* Features Carousel with Touch support */}
        <div className="touch-pan-x overflow-hidden py-24 bg-gradient-to-b from-white to-blue-50">
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
        </div>

        {/* Success Metrics with Animation */}
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-10"></div>
          <BackgroundPaths className="opacity-20" />
          
          <div className="container mx-auto px-4 z-10 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
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
                    className="text-center p-6 sm:p-8 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <motion.div 
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                    >
                      {metric.value}
                    </motion.div>
                    <div className="text-xs sm:text-sm text-blue-100">{metric.label}</div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Learning Path with 3D Interactive Elements */}
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

        {/* Call to Action with Glassmorphism */}
        <CTASection
          title="Ready to Transform Your Institution?"
          description="Join thousands of educational institutions already using EduSpry"
          primaryCta={{ text: "Get Started", link: "/register" }}
          secondaryCta={{ text: "Contact Sales", link: "/contact" }}
        />

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
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
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
