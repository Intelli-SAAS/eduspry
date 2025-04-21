import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  ArrowRight, 
  CheckCircle, 
  User, 
  School, 
  Star, 
  ChevronRight,
  Database,
  LineChart,
  BarChart,
  PieChart,
  Zap,
  Shield,
  Users,
  Clock,
  Menu,
  X,
  Search
} from 'lucide-react';

// Update this in your tailwind.config.js too
// USA.gov blue #1a4480
const usaGovBlue = '#1a4480';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const menuVariants = {
    closed: { opacity: 0, x: 20, display: 'none' },
    open: { opacity: 1, x: 0, display: 'flex', transition: { duration: 0.3 } }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isScrolled ? 'bg-[#1a4480] py-2 shadow-md' : 'bg-[#1a4480] py-4'
      }`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">
              EduSpry
            </span>
          </motion.div>
          
          <nav className="hidden md:flex ml-10 space-x-8">
            {['Features', 'Solutions', 'Testimonials', 'Pricing'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white hover:text-blue-100 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <Button asChild variant="outline" size="sm" className="mr-2 rounded-md border-white text-white hover:bg-white/10">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="rounded-md bg-white text-[#1a4480] hover:bg-blue-50">
              <Link to="/signup">Sign up free</Link>
            </Button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className="md:hidden absolute top-full left-0 right-0 bg-[#1a4480] shadow-lg flex flex-col"
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="px-4 py-4 space-y-4">
          {['Features', 'Solutions', 'Testimonials', 'Pricing'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="block text-sm font-medium text-white hover:text-blue-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-4 flex flex-col space-y-2">
            <Button asChild variant="outline" size="sm" className="w-full justify-center rounded-md border-white text-white hover:bg-white/10">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="w-full justify-center rounded-md bg-white text-[#1a4480] hover:bg-blue-50">
              <Link to="/signup">Sign up free</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

const Index = () => {
  const { scrollYProgress } = useScroll();
  const scaleAnim = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacityAnim = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);

  // Fade in animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Trusted by logos
  const trustedBy = [
    { name: "Oakridge International School", logo: "OIS" },
    { name: "Evergreen Academy", logo: "EA" },
    { name: "Westlake High School", logo: "WHS" },
    { name: "Horizon Educational Trust", logo: "HET" },
    { name: "Summit Learning Institute", logo: "SLI" },
    { name: "Pinnacle Preparatory", logo: "PP" },
  ];

  // Features list
  const features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Comprehensive Data Analytics",
      description: "Track and analyze student performance across multiple parameters to identify patterns and areas for improvement."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Performance Tracking",
      description: "Monitor academic progress in real-time with intuitive dashboards and customizable reports."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations for personalized learning paths based on student data."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Tools",
      description: "Enable seamless communication between students, teachers, and administrators."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with FERPA compliance and comprehensive data protection."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Time-Saving Automation",
      description: "Automate routine tasks like grading and reporting to free up valuable teaching time."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "EduSpry has transformed how we track student progress and identify learning gaps. Our standardized test scores have improved by 22% since implementation.",
      author: "Dr. Sarah Johnson",
      position: "Principal, Oakridge International School",
      avatar: "SJ"
    },
    {
      quote: "The analytics tools allow our teachers to create personalized learning plans that address each student's unique needs. It's like having a data scientist on staff.",
      author: "Michael Chen",
      position: "Academic Director, Summit Learning Institute",
      avatar: "MC"
    },
    {
      quote: "Implementation was seamless, and the platform's intuitive design meant minimal training for our staff. The ROI has been immediate and substantial.",
      author: "Elizabeth Parker",
      position: "Technology Coordinator, Horizon Educational Trust",
      avatar: "EP"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Add Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <motion.h1 
                  className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <span className="block text-[#1a4480] xl:inline">EduSpry</span>{' '}
                  <span className="block xl:inline">The AI-powered education platform</span>
                </motion.h1>
                <motion.p 
                  className="mt-6 text-lg leading-7 text-gray-600 max-w-3xl lg:mx-0 mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Transform how educational institutions operate with data-driven insights, 
                  personalized learning, and streamlined administration.
                </motion.p>
                <motion.div 
                  className="mt-10 flex flex-col sm:flex-row gap-4 lg:justify-start justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <Button asChild size="lg" className="px-8 rounded-full shadow-md bg-[#1a4480] hover:bg-[#0f2b50]">
                      <Link to="/login">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <Button asChild variant="outline" size="lg" className="px-8 rounded-full border-2 border-[#1a4480] text-[#1a4480]">
                      <a href="#testimonials">
                        See success stories
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative mx-auto w-full"
                style={{ scale: scaleAnim, opacity: opacityAnim }}
              >
                <div className="relative">
                  {/* Dashboard preview */}
                  <motion.div 
                    className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-xs text-gray-500">EduSpry Dashboard</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <BarChart className="h-5 w-5 text-[#1a4480] mr-2" />
                        <h3 className="font-medium text-lg">Student Performance Analytics</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="h-8 bg-gray-100 rounded-md w-full"></div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-24 bg-blue-50 rounded-md flex flex-col items-center justify-center p-3">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                              <LineChart className="h-5 w-5 text-[#1a4480]" />
                            </div>
                            <div className="text-xs text-[#1a4480] font-medium">Progress</div>
                          </div>
                          <div className="h-24 bg-indigo-50 rounded-md flex flex-col items-center justify-center p-3">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                              <BarChart className="h-5 w-5 text-[#1a4480]" />
                            </div>
                            <div className="text-xs text-[#1a4480] font-medium">Performance</div>
                          </div>
                          <div className="h-24 bg-green-50 rounded-md flex flex-col items-center justify-center p-3">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                              <PieChart className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="text-xs text-green-600 font-medium">Distribution</div>
                          </div>
                        </div>
                        <motion.div 
                          className="h-28 bg-gray-100 rounded-md w-full flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          <div className="text-xs text-gray-400">Interactive Charts and Reports</div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-[#1a4480] rounded-full filter blur-3xl opacity-10"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-300 rounded-full filter blur-3xl opacity-20"
          ></motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-base font-semibold text-[#1a4480] tracking-wide uppercase">Trusted By</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Leading Educational Institutions
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
            className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6"
          >
            {trustedBy.map((org, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="col-span-1 flex justify-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="group">
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:bg-gray-50">
                    <span className="text-xl font-bold text-[#1a4480]">{org.logo}</span>
                  </div>
                  <p className="mt-2 text-sm text-center text-gray-500">{org.name}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-base font-semibold text-[#1a4480] tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need for educational excellence
            </p>
            <p className="mt-4 text-xl text-gray-500">
              A comprehensive platform designed to transform how education works
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1a4480] bg-opacity-10 flex items-center justify-center text-[#1a4480] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-base font-semibold text-[#1a4480] tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Loved by educators everywhere
            </p>
            <p className="mt-4 text-xl text-gray-500">
              See what educational professionals are saying about EduSpry
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -8, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <motion.blockquote 
                  className="text-gray-700 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  "{testimonial.quote}"
                </motion.blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#1a4480] text-white flex items-center justify-center mr-3">
                    <span className="font-medium text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.position}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-[#1a4480] to-[#0a2648] rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="px-6 py-12 sm:px-12 lg:px-16 lg:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <motion.h2 
                  className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Ready to transform your educational institution?
                </motion.h2>
                <motion.p 
                  className="mt-4 text-lg text-blue-100 max-w-3xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Join hundreds of educational institutions that are already improving student outcomes with EduSpry's analytics platform.
                </motion.p>
              </div>
              <div className="mt-8 lg:mt-0 lg:shrink-0">
                <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <Button asChild size="lg" className="rounded-full bg-white text-[#1a4480] hover:bg-blue-50 px-8 shadow-lg">
                      <Link to="/login">
                        Get Started Free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent text-white border-white hover:bg-[#0a2648] px-8 shadow-sm">
                      <a href="#">
                        Schedule Demo
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a4480] text-white border-t border-blue-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <BookOpen className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">EduSpry</span>
              </motion.div>
              <p className="text-blue-100 text-base">
                Transforming education through data-driven insights and analytics.
              </p>
              <div className="flex space-x-6">
                {/* Social links would go here */}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Solutions</h3>
                  <ul className="mt-4 space-y-4">
                    {['For Students', 'For Teachers', 'For Administrators', 'For Parents'].map((item) => (
                      <li key={item}>
                        <motion.a 
                          href="#" 
                          className="text-base text-blue-100 hover:text-white"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    {['Documentation', 'Guides', 'API Status', 'Help Center'].map((item) => (
                      <li key={item}>
                        <motion.a 
                          href="#" 
                          className="text-base text-blue-100 hover:text-white"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                    {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                      <li key={item}>
                        <motion.a 
                          href="#" 
                          className="text-base text-blue-100 hover:text-white"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    {['Privacy', 'Terms', 'GDPR', 'Educational Policy'].map((item) => (
                      <li key={item}>
                        <motion.a 
                          href="#" 
                          className="text-base text-blue-100 hover:text-white"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-blue-900 pt-8">
            <p className="text-base text-blue-100 text-center">
              &copy; {new Date().getFullYear()} EduSpry. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
