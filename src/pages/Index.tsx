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
    closed: { opacity: 0, x: 20, height: 0, display: 'none' },
    open: { opacity: 1, x: 0, height: 'auto', display: 'flex', transition: { duration: 0.3 } }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -5 },
    open: i => ({ opacity: 1, y: 0, transition: { delay: 0.05 * i } })
  };

  const navItems = ['Features', 'Solutions', 'Testimonials', 'Pricing'];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled
        ? 'bg-[#1a4480]/90 backdrop-blur-lg py-2 shadow-md'
        : 'bg-gradient-to-b from-[#1a4480] to-[#1a4480]/80 backdrop-blur-md py-4'
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
            <span className="ml-2 text-xl font-bold text-white bg-gradient-to-r from-white to-blue-100 bg-clip-text">
              EduSpry
            </span>
          </motion.div>

          <nav className="hidden md:flex ml-12 space-x-10">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-5">
          <div className="hidden md:flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button asChild size="sm" className="rounded-full px-6 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/10 shadow-sm">
                <Link to="/login">Login</Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Button asChild size="sm" className="rounded-full px-6 bg-white text-[#1a4480] hover:bg-blue-50 font-medium border border-white/80 shadow-md">
                <Link to="/register">Sign up</Link>
              </Button>
            </motion.div>
          </div>

          <motion.button
            className="md:hidden text-white p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden absolute top-full left-0 right-0 bg-[#1a4480]/95 backdrop-blur-lg shadow-lg flex flex-col overflow-hidden"
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="px-6 py-8 space-y-6">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              custom={i}
              variants={menuItemVariants}
              href={`#${item.toLowerCase()}`}
              className="block text-sm font-medium text-white/90 hover:text-white pl-4 border-l-2 border-transparent hover:border-white/50 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </motion.a>
          ))}
          <div className="pt-6 flex flex-col space-y-4">
            <motion.div custom={4} variants={menuItemVariants}>
              <Button asChild size="sm" className="w-full justify-center py-5 rounded-full backdrop-blur-md bg-white/20 text-white hover:bg-white/30 border border-white/20">
                <Link to="/login">Login</Link>
              </Button>
            </motion.div>
            <motion.div custom={5} variants={menuItemVariants}>
              <Button asChild size="sm" className="w-full justify-center py-5 rounded-full bg-white text-[#1a4480] hover:bg-blue-50 font-medium">
                <Link to="/register">Sign up</Link>
              </Button>
            </motion.div>
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
  const [selectedRole, setSelectedRole] = useState("student"); // Default to student role

  // Fade in animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };



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
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Refined gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a4480]/5 via-blue-50/30 to-white pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxYTQ0ODAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bTEyIDEydjZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bS0yNCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        {/* Animated Decorative Elements */}
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-[10%] w-72 h-72 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-blue-100/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-6 bg-gradient-to-r from-[#1a4480]/10 to-blue-50/50 px-5 py-2 rounded-full"
                >
                  <span className="text-sm font-semibold text-[#1a4480] flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 rounded-full bg-[#1a4480]/20 mr-2"
                    ></motion.div>
                    AI-Powered Education Platform
                  </span>
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]">
                    Revolutionize Education
                  </span>
                  <br />
                  <span className="text-gray-800">with EduSpry</span>
                </motion.h1>

                <motion.p
                  className="mt-8 text-xl text-gray-600 max-w-xl lg:mx-0 mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  The complete educational ecosystem connecting students, teachers, administrators,
                  and EdTech platforms with AI-powered tools and analytics.
                </motion.p>

                <motion.div
                  className="mt-12 flex flex-col sm:flex-row gap-5 lg:justify-start justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <Button asChild size="lg" className="px-10 py-6 rounded-full shadow-xl bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] hover:from-[#0f2b50] hover:to-[#1a4480] text-white border border-[#1a4480]/20">
                      <Link to="/register">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
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
                    <Button asChild variant="outline" size="lg" className="px-10 py-6 rounded-full border-2 border-[#1a4480] text-[#1a4480] font-medium">
                      <a href="#testimonials">
                        See success stories
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-16 flex items-center gap-4 text-sm lg:justify-start justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="flex -space-x-3">
                    {["bg-gradient-to-br from-blue-400 to-blue-500", "bg-gradient-to-br from-indigo-400 to-indigo-500", "bg-gradient-to-br from-purple-400 to-purple-500", "bg-gradient-to-br from-green-400 to-green-500"].map((color, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, x: -10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + (i * 0.1) }}
                        className={`w-10 h-10 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-medium ${color}`}
                      >
                        {["S", "T", "A", "E"][i]}
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-gray-600">Trusted by educational institutions worldwide</span>
                </motion.div>
              </motion.div>
            </div>

            <div className="mt-20 lg:mt-0 lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative mx-auto w-full"
                style={{ scale: scaleAnim, opacity: opacityAnim }}
              >
                {/* Floating elements */}
                <motion.div
                  className="absolute -top-10 -left-10 w-20 h-20 bg-blue-100 rounded-lg rotate-12 z-0"
                  animate={{ rotate: [12, 25, 12], y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <motion.div
                  className="absolute -bottom-10 -right-10 w-24 h-24 bg-indigo-100 rounded-lg -rotate-12 z-0"
                  animate={{ rotate: [-12, -25, -12], y: [0, 15, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                ></motion.div>

                <div className="relative">
                  {/* Dashboard preview */}
                  <motion.div
                    className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-blue-100 relative z-10"
                    whileHover={{ y: -10, boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.25)" }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between px-4 py-3 bg-[#1a4480] border-b">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-red-300 mr-2"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-300 mr-2"></div>
                        <div className="h-3 w-3 rounded-full bg-green-300"></div>
                      </div>
                      <div className="text-xs text-white font-medium">EduSpry Analytics Dashboard</div>
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-blue-100" />
                        <div className="h-5 w-5 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-bold">A</div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">Performance Overview</h3>
                          <p className="text-sm text-gray-500">Academic progress tracking</p>
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          +18% improvement
                        </div>
                      </div>

                      {/* Tabs */}
                      <div className="flex border-b border-gray-200 mb-6">
                        <div className="px-4 py-2 border-b-2 border-[#1a4480] text-[#1a4480] text-sm font-medium">Analytics</div>
                        <div className="px-4 py-2 text-gray-500 text-sm">Reports</div>
                        <div className="px-4 py-2 text-gray-500 text-sm">Insights</div>
                      </div>

                      <div className="space-y-6">
                        {/* Chart */}
                        <div className="h-36 bg-gray-50 rounded-lg p-4 flex items-end justify-between gap-1">
                          {[35, 42, 58, 48, 62, 70, 58, 65, 72].map((height, i) => (
                            <div key={i} className="relative w-full h-full flex flex-col justify-end">
                              <div
                                className="bg-gradient-to-t from-[#1a4480] to-blue-400 rounded-sm w-full"
                                style={{ height: `${height}%` }}
                              ></div>
                            </div>
                          ))}
                          <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((month, i) => (
                              <div key={i} className="text-[10px] text-gray-400">{month}</div>
                            ))}
                          </div>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-[#1a4480]" />
                              </div>
                              <div className="text-xs font-medium text-gray-700">Students</div>
                            </div>
                            <div className="text-lg font-bold text-[#1a4480]">2,564</div>
                          </div>

                          <div className="bg-indigo-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                <School className="h-4 w-4 text-indigo-600" />
                              </div>
                              <div className="text-xs font-medium text-gray-700">Courses</div>
                            </div>
                            <div className="text-lg font-bold text-indigo-600">186</div>
                          </div>

                          <div className="bg-purple-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <BarChart className="h-4 w-4 text-purple-600" />
                              </div>
                              <div className="text-xs font-medium text-gray-700">Progress</div>
                            </div>
                            <div className="text-lg font-bold text-purple-600">87.5%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* User-specific feature sections */}
      <div className="mt-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent -z-10"></div>
        <div className="absolute -top-24 -bottom-24 left-0 right-0 overflow-hidden -z-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="text-center mb-16 relative">
          <div className="inline-block mb-4">
            <div className="px-4 py-1 bg-[#1a4480]/10 rounded-full">
              <span className="text-sm font-semibold text-[#1a4480]">Complete Educational Ecosystem</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]">
            One Platform, All Users
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Seamlessly connecting students, teachers, administrators, and EdTech platforms
          </p>
        </div>

        {/* Integrated user features in creative layout */}
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3 relative z-0">
              {/* Navigation panel */}
              <div className="sticky top-24 bg-white/80 backdrop-blur-md rounded-xl border border-blue-100 shadow-lg shadow-blue-100/20 p-6 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-blue-50"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-indigo-50"></div>

                <h3 className="text-[#1a4480] font-bold mb-6 relative z-10">Choose Your Role</h3>

                <div className="space-y-3 relative z-10">
                  <div
                    onClick={() => setSelectedRole("student")}
                    className={`${selectedRole === "student" ? "bg-[#1a4480] text-white" : "bg-white border border-blue-100 text-gray-900"} p-4 rounded-lg flex items-center gap-3 transform transition-all hover:scale-[1.02] cursor-pointer`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${selectedRole === "student" ? "bg-white/20" : "bg-[#1a4480]/10"} flex items-center justify-center`}>
                      <User className={`h-5 w-5 ${selectedRole === "student" ? "text-white" : "text-[#1a4480]"}`} />
                    </div>
                    <div>
                      <div className="font-medium">Students</div>
                      <div className={`text-xs ${selectedRole === "student" ? "text-blue-100" : "text-gray-500"}`}>Learning & Growth</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedRole("teacher")}
                    className={`${selectedRole === "teacher" ? "bg-[#1a4480] text-white" : "bg-white border border-blue-100 text-gray-900"} p-4 rounded-lg flex items-center gap-3 transform transition-all hover:translate-x-1 hover:shadow-md cursor-pointer`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${selectedRole === "teacher" ? "bg-white/20" : "bg-[#1a4480]/10"} flex items-center justify-center`}>
                      <School className={`h-5 w-5 ${selectedRole === "teacher" ? "text-white" : "text-[#1a4480]"}`} />
                    </div>
                    <div>
                      <div className="font-medium">Teachers</div>
                      <div className={`text-xs ${selectedRole === "teacher" ? "text-blue-100" : "text-gray-500"}`}>Empower Education</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedRole("admin")}
                    className={`${selectedRole === "admin" ? "bg-[#1a4480] text-white" : "bg-white border border-blue-100 text-gray-900"} p-4 rounded-lg flex items-center gap-3 transform transition-all hover:translate-x-1 hover:shadow-md cursor-pointer`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${selectedRole === "admin" ? "bg-white/20" : "bg-[#1a4480]/10"} flex items-center justify-center`}>
                      <Users className={`h-5 w-5 ${selectedRole === "admin" ? "text-white" : "text-[#1a4480]"}`} />
                    </div>
                    <div>
                      <div className="font-medium">Administrators</div>
                      <div className={`text-xs ${selectedRole === "admin" ? "text-blue-100" : "text-gray-500"}`}>Institution Management</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedRole("edtech")}
                    className={`${selectedRole === "edtech" ? "bg-[#1a4480] text-white" : "bg-white border border-blue-100 text-gray-900"} p-4 rounded-lg flex items-center gap-3 transform transition-all hover:translate-x-1 hover:shadow-md cursor-pointer`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${selectedRole === "edtech" ? "bg-white/20" : "bg-[#1a4480]/10"} flex items-center justify-center`}>
                      <Database className={`h-5 w-5 ${selectedRole === "edtech" ? "text-white" : "text-[#1a4480]"}`} />
                    </div>
                    <div>
                      <div className="font-medium">EdTech Platforms</div>
                      <div className={`text-xs ${selectedRole === "edtech" ? "text-blue-100" : "text-gray-500"}`}>Scale Your Business</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 relative z-10">
                  <Button asChild className="w-full bg-[#1a4480] hover:bg-[#0f2b50]">
                    <Link to="/register">
                      Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              {/* Content panel - dynamically rendered based on role */}
              <div className="relative p-6 md:p-8 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a4480]/5 via-blue-50 to-indigo-50/80 rounded-xl"></div>
                <div className="absolute inset-0 border border-blue-200/50 rounded-xl"></div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="md:w-1/2">
                      {selectedRole === "student" && (
                        <>
                          <div className="inline-block mb-3">
                            <div className="px-3 py-1 bg-[#1a4480]/10 rounded-full">
                              <span className="text-xs font-semibold text-[#1a4480]">For Students</span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Learning Journey</h3>

                          <p className="text-gray-700 mb-6">
                            Experience education designed specifically for your needs, with AI-powered
                            adaptive learning that helps you excel in your studies.
                          </p>
                        </>
                      )}

                      {selectedRole === "teacher" && (
                        <>
                          <div className="inline-block mb-3">
                            <div className="px-3 py-1 bg-[#1a4480]/10 rounded-full">
                              <span className="text-xs font-semibold text-[#1a4480]">For Teachers</span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Empower Your Teaching</h3>

                          <p className="text-gray-700 mb-6">
                            Streamline your workflow with AI-powered tools that help you create engaging content,
                            assess student performance, and provide personalized guidance.
                          </p>
                        </>
                      )}

                      {selectedRole === "admin" && (
                        <>
                          <div className="inline-block mb-3">
                            <div className="px-3 py-1 bg-[#1a4480]/10 rounded-full">
                              <span className="text-xs font-semibold text-[#1a4480]">For Administrators</span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Institution Management</h3>

                          <p className="text-gray-700 mb-6">
                            Gain comprehensive oversight of your educational institution with powerful analytics,
                            resource optimization tools, and streamlined administrative workflows.
                          </p>
                        </>
                      )}

                      {selectedRole === "edtech" && (
                        <>
                          <div className="inline-block mb-3">
                            <div className="px-3 py-1 bg-[#1a4480]/10 rounded-full">
                              <span className="text-xs font-semibold text-[#1a4480]">For EdTech Platforms</span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Scale Your Educational Business</h3>

                          <p className="text-gray-700 mb-6">
                            Create, publish, and sell courses while leveraging our live class modules,
                            AI tools, and comprehensive platform to build your educational empire.
                          </p>
                        </>
                      )}

                      {selectedRole === "student" && (
                        <div className="grid grid-cols-1 gap-3 mb-6">
                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <LineChart className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">Personalized Learning Paths</h4>
                              <p className="text-xs text-gray-500">AI analyzes your strengths and adapts content to your needs</p>
                            </div>
                          </div>

                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <Zap className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">24/7 AI Study Assistant</h4>
                              <p className="text-xs text-gray-500">Get help whenever you need it with our intelligent tutoring</p>
                            </div>
                          </div>

                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <Users className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">Interactive Study Materials</h4>
                              <p className="text-xs text-gray-500">Engage with content designed to maximize understanding and retention</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedRole === "teacher" && (
                        <div className="grid grid-cols-1 gap-3 mb-6">
                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <Zap className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">AI-Powered Content Creation</h4>
                              <p className="text-xs text-gray-500">Generate lesson plans and materials in seconds</p>
                            </div>
                          </div>

                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <BarChart className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">Detailed Student Analytics</h4>
                              <p className="text-xs text-gray-500">Track progress and identify areas for improvement</p>
                            </div>
                          </div>

                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <Clock className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">Time-Saving Automation</h4>
                              <p className="text-xs text-gray-500">Automate grading and administrative tasks</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedRole === "admin" && (
                        <div className="grid grid-cols-1 gap-3 mb-6">
                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <PieChart className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">Institution-Wide Analytics</h4>
                              <p className="text-xs text-gray-500">Comprehensive data on performance across departments</p>
                            </div>
                          </div>

                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <Shield className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">Compliance & Reporting</h4>
                              <p className="text-xs text-gray-500">Streamlined regulatory compliance and documentation</p>
                            </div>
                          </div>

                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <Users className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">Staff Performance Tracking</h4>
                              <p className="text-xs text-gray-500">Monitor and optimize teaching effectiveness</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedRole === "edtech" && (
                        <div className="grid grid-cols-1 gap-3 mb-6">
                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <BookOpen className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">Course Marketplace</h4>
                              <p className="text-xs text-gray-500">Create, publish, and sell your courses easily</p>
                            </div>
                          </div>

                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <Zap className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">Live Class Modules</h4>
                              <p className="text-xs text-gray-500">Host engaging live sessions with advanced tools</p>
                            </div>
                          </div>

                          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-100 flex items-start shadow-sm">
                            <div className="mt-0.5 mr-3 flex-shrink-0 w-7 h-7 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                              <Database className="h-3.5 w-3.5 text-[#1a4480]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">White-Labeling Options</h4>
                              <p className="text-xs text-gray-500">Customize the platform with your own branding</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedRole === "student" && (
                        <div className="flex gap-3">
                          <Button asChild size="sm" className="rounded-full bg-[#1a4480] hover:bg-[#0f2b50]">
                            <Link to="/register">Start Learning</Link>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="rounded-full border-[#1a4480] text-[#1a4480]">
                            <Link to="/register">Explore Features</Link>
                          </Button>
                        </div>
                      )}

                      {selectedRole === "teacher" && (
                        <div className="flex gap-3">
                          <Button asChild size="sm" className="rounded-full bg-[#1a4480] hover:bg-[#0f2b50]">
                            <Link to="/register">Enhance Teaching</Link>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="rounded-full border-[#1a4480] text-[#1a4480]">
                            <Link to="/register">View Demo</Link>
                          </Button>
                        </div>
                      )}

                      {selectedRole === "admin" && (
                        <div className="flex gap-3">
                          <Button asChild size="sm" className="rounded-full bg-[#1a4480] hover:bg-[#0f2b50]">
                            <Link to="/register">Transform Institution</Link>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="rounded-full border-[#1a4480] text-[#1a4480]">
                            <Link to="/register">Request Demo</Link>
                          </Button>
                        </div>
                      )}

                      {selectedRole === "edtech" && (
                        <div className="flex gap-3">
                          <Button asChild size="sm" className="rounded-full bg-[#1a4480] hover:bg-[#0f2b50]">
                            <Link to="/register">Start Building</Link>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="rounded-full border-[#1a4480] text-[#1a4480]">
                            <Link to="/register">Partner With Us</Link>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="md:w-1/2 mt-6 md:mt-0">
                      <div className="relative">
                        <div className="absolute -top-3 -left-3 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
                        <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-indigo-100 rounded-full opacity-50"></div>

                        {selectedRole === "student" && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden border border-blue-100 relative z-10"
                          >
                            <div className="bg-[#1a4480] text-white p-3 flex justify-between items-center">
                              <span className="text-sm font-medium">Student Dashboard</span>
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                              </div>
                            </div>

                            <div className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h5 className="text-sm font-medium">Your Learning Progress</h5>
                                  <p className="text-xs text-gray-500">Trending upwards</p>
                                </div>
                                <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                  +12% this week
                                </div>
                              </div>

                              <div className="h-36 bg-gray-50 rounded-lg mb-4 overflow-hidden p-3">
                                <div className="h-full flex items-end justify-between gap-2">
                                  {[40, 25, 35, 30, 55, 65, 75].map((height, i) => (
                                    <div key={i} className="relative w-full">
                                      <div
                                        className="bg-gradient-to-t from-[#1a4480] to-blue-400 rounded-t-sm"
                                        style={{ height: `${height}%` }}
                                      ></div>
                                      <div className="mt-1 text-xs text-gray-400 text-center">
                                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="rounded-lg border border-gray-100 divide-y divide-gray-100">
                                <div className="p-2 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">
                                      <BookOpen className="h-3 w-3 text-[#1a4480]" />
                                    </div>
                                    <span className="text-xs">Advanced Math</span>
                                  </div>
                                  <div className="text-xs text-gray-500">87% complete</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {selectedRole === "teacher" && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden border border-blue-100 relative z-10"
                          >
                            <div className="bg-[#1a4480] text-white p-3 flex justify-between items-center">
                              <span className="text-sm font-medium">Teacher Dashboard</span>
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                              </div>
                            </div>

                            <div className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h5 className="text-sm font-medium">Class Performance</h5>
                                  <p className="text-xs text-gray-500">Grade 10 - Physics</p>
                                </div>
                                <div className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                  32 students
                                </div>
                              </div>

                              <div className="h-36 bg-gray-50 rounded-lg mb-4 overflow-hidden p-3">
                                <div className="h-full flex flex-col justify-between">
                                  <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Performance Distribution</span>
                                    <span>Last Test: Mechanics</span>
                                  </div>
                                  <div className="flex-1 flex items-end mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                      <div className="flex h-full rounded-full overflow-hidden">
                                        <div className="bg-red-400 h-full" style={{ width: '10%' }}></div>
                                        <div className="bg-yellow-400 h-full" style={{ width: '25%' }}></div>
                                        <div className="bg-green-400 h-full" style={{ width: '40%' }}></div>
                                        <div className="bg-[#1a4480] h-full" style={{ width: '25%' }}></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>Needs Help</span>
                                    <span>Average</span>
                                    <span>Good</span>
                                    <span>Excellent</span>
                                  </div>
                                </div>
                              </div>

                              <div className="rounded-lg border border-gray-100 divide-y divide-gray-100">
                                <div className="p-2 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">
                                      <Zap className="h-3 w-3 text-[#1a4480]" />
                                    </div>
                                    <span className="text-xs">Create Content with AI</span>
                                  </div>
                                  <div className="text-xs text-blue-600">Generate</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {selectedRole === "admin" && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden border border-blue-100 relative z-10"
                          >
                            <div className="bg-[#1a4480] text-white p-3 flex justify-between items-center">
                              <span className="text-sm font-medium">Administrator Dashboard</span>
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                              </div>
                            </div>

                            <div className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h5 className="text-sm font-medium">Institution Overview</h5>
                                  <p className="text-xs text-gray-500">Oakridge International School</p>
                                </div>
                                <div className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                                  Q2 Report
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="text-xs text-gray-500 mb-1">Total Students</div>
                                  <div className="text-xl font-bold text-[#1a4480]">2,564</div>
                                  <div className="text-xs text-green-600 mt-1">+12% from last year</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="text-xs text-gray-500 mb-1">Teaching Staff</div>
                                  <div className="text-xl font-bold text-[#1a4480]">128</div>
                                  <div className="text-xs text-green-600 mt-1">98% retention rate</div>
                                </div>
                              </div>

                              <div className="rounded-lg border border-gray-100 divide-y divide-gray-100">
                                <div className="p-2 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">
                                      <Users className="h-3 w-3 text-[#1a4480]" />
                                    </div>
                                    <span className="text-xs">Department Performance</span>
                                  </div>
                                  <div className="text-xs text-blue-600">View All</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {selectedRole === "edtech" && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden border border-blue-100 relative z-10"
                          >
                            <div className="bg-[#1a4480] text-white p-3 flex justify-between items-center">
                              <span className="text-sm font-medium">EdTech Platform Console</span>
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                                <div className="w-2 h-2 rounded-full bg-white/30"></div>
                              </div>
                            </div>

                            <div className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h5 className="text-sm font-medium">Course Analytics</h5>
                                  <p className="text-xs text-gray-500">Performance overview</p>
                                </div>
                                <div className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                                  Revenue: $12,450
                                </div>
                              </div>

                              <div className="mb-4 rounded-lg border border-gray-100 divide-y divide-gray-100">
                                <div className="p-3 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center mr-2">
                                      <Zap className="h-4 w-4 text-amber-600" />
                                    </div>
                                    <div>
                                      <div className="text-xs font-medium">Advanced Physics</div>
                                      <div className="text-xs text-gray-500">12 modules • Live</div>
                                    </div>
                                  </div>
                                  <div className="text-xs font-medium text-green-500">$89.99</div>
                                </div>
                                <div className="p-3 flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-2">
                                      <BookOpen className="h-4 w-4 text-[#1a4480]" />
                                    </div>
                                    <div>
                                      <div className="text-xs font-medium">Web Development</div>
                                      <div className="text-xs text-gray-500">24 modules • Self-paced</div>
                                    </div>
                                  </div>
                                  <div className="text-xs font-medium text-green-500">$129.99</div>
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="text-xs text-blue-600 cursor-pointer">+ Create New Course</div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Key features highlight */}
                  <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100 shadow-sm text-center">
                      <div className="w-10 h-10 rounded-full bg-[#1a4480]/10 flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="h-5 w-5 text-[#1a4480]" />
                      </div>
                      <h4 className="font-medium text-sm">Virtual Classrooms</h4>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100 shadow-sm text-center">
                      <div className="w-10 h-10 rounded-full bg-[#1a4480]/10 flex items-center justify-center mx-auto mb-2">
                        <BarChart className="h-5 w-5 text-[#1a4480]" />
                      </div>
                      <h4 className="font-medium text-sm">Performance Analytics</h4>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100 shadow-sm text-center">
                      <div className="w-10 h-10 rounded-full bg-[#1a4480]/10 flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="h-5 w-5 text-[#1a4480]" />
                      </div>
                      <h4 className="font-medium text-sm">Automated Testing</h4>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100 shadow-sm text-center">
                      <div className="w-10 h-10 rounded-full bg-[#1a4480]/10 flex items-center justify-center mx-auto mb-2">
                        <Shield className="h-5 w-5 text-[#1a4480]" />
                      </div>
                      <h4 className="font-medium text-sm">Secure Platform</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white via-blue-50/20 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a4480' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="inline-block mb-4">
              <div className="px-4 py-1 bg-[#1a4480]/10 rounded-full">
                <span className="text-sm font-semibold text-[#1a4480]">Core Capabilities</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]">
              Powerful Features That Transform Education
            </h2>
            <p className="mt-6 text-xl text-gray-600">
              A complete toolkit designed for every aspect of modern educational management
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                }}
                className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-blue-100 relative overflow-hidden group"
              >
                {/* Decorative gradient blob */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-tr from-blue-100/50 to-indigo-100/50 rounded-full opacity-50 transition-all duration-500 group-hover:scale-125"></div>

                {/* Semi-transparent pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxYTQ0ODAiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bTEyIDEydjZoNnYtNmgtNnptMC0xMnY2aDZ2LTZoLTZ6bS0yNCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

                <div className="p-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a4480] to-[#3672d0] flex items-center justify-center text-white mb-7 shadow-lg transform transition-transform group-hover:rotate-3 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#1a4480] to-[#3672d0] bg-clip-text group-hover:text-transparent transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>

                {/* Visual indicator for hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a4480] to-[#3672d0] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="lg" className="rounded-full px-8 shadow-xl bg-[#1a4480] hover:bg-[#0f2b50] border border-[#1a4480]/20">
                <Link to="/register">
                  Explore All Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent -z-10"></div>

        {/* Enhanced background effects */}
        <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-10 left-[10%] w-80 h-80 bg-gradient-to-r from-blue-200/30 to-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-gradient-to-r from-indigo-200/30 to-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '4s' }}></div>

          {/* Subtle noise pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%231a4480' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")",
            backgroundSize: "8px 8px"
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-block mb-6">
              <motion.div
                className="px-6 py-2 bg-[#1a4480]/10 rounded-full border border-[#1a4480]/20 shadow-sm"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="text-sm font-semibold text-[#1a4480] flex items-center">
                  <motion.div
                    className="w-4 h-4 mr-2 bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  ></motion.div>
                  Success Stories
                </span>
              </motion.div>
            </div>

            <motion.h2
              className="text-5xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] via-[#2c5aa0] to-[#1a4480] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Trusted by educators worldwide
            </motion.h2>

            <motion.p
              className="mt-6 text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              See how educational institutions are transforming with our platform
            </motion.p>
          </motion.div>

          {/* 3D Testimonial Cards with Perspective Effect */}
          <div className="relative perspective-1000">
            <div className="grid gap-x-12 gap-y-24 md:grid-cols-3 mt-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, rotateX: 10, y: 50 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="relative"
                >
                  {/* Avatar with animated ring */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Animated ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 -m-1"
                        animate={{
                          rotate: 360,
                          background: [
                            "linear-gradient(90deg, #1a4480, #3672d0, #1a4480)",
                            "linear-gradient(180deg, #1a4480, #3672d0, #1a4480)",
                            "linear-gradient(270deg, #1a4480, #3672d0, #1a4480)",
                            "linear-gradient(360deg, #1a4480, #3672d0, #1a4480)"
                          ]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      ></motion.div>

                      <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl bg-gradient-to-br from-[#1a4480] to-[#3672d0] flex items-center justify-center relative z-10">
                        <span className="font-bold text-white text-2xl">{testimonial.avatar}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Card with glass effect */}
                  <motion.div
                    className="group h-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 pt-16 border border-blue-100 flex flex-col relative z-10 overflow-hidden"
                    whileHover={{
                      y: -15,
                      boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
                      background: 'rgba(255, 255, 255, 0.95)'
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* 3D layered background effects */}
                    <div className="absolute -z-10 inset-0">
                      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-400 to-indigo-500 blur-xl group-hover:opacity-20 transition-opacity duration-300"></div>
                      <motion.div
                        className="absolute right-0 bottom-0 w-40 h-40 bg-blue-200/20 rounded-full opacity-60"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        style={{ translateZ: "-10px" }}
                      ></motion.div>
                      <motion.div
                        className="absolute left-0 top-0 w-40 h-40 bg-indigo-200/20 rounded-full opacity-60"
                        animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 0] }}
                        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                        style={{ translateZ: "-5px" }}
                      ></motion.div>
                    </div>

                    {/* Star ratings with animated entry and glow effect */}
                    <div className="flex mb-6 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                          transition={{
                            delay: 0.8 + (i * 0.1) + (index * 0.1),
                            duration: 0.4,
                            type: "spring"
                          }}
                          className="relative mx-1"
                        >
                          <div className="absolute inset-0 text-yellow-300 blur-sm opacity-70">
                            <Star className="h-6 w-6 fill-current" />
                          </div>
                          <Star className="h-6 w-6 text-yellow-400 fill-current relative z-10" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote with quotation marks */}
                    <div className="relative">
                      <div className="absolute -top-5 -left-2 text-5xl text-blue-200 opacity-40 font-serif">"</div>
                      <div className="absolute -bottom-12 -right-2 text-5xl text-blue-200 opacity-40 font-serif">"</div>
                      <blockquote className="text-gray-700 mb-8 text-center flex-grow italic relative z-10 text-lg">
                        {testimonial.quote}
                      </blockquote>
                    </div>

                    {/* Author info with hover effect */}
                    <motion.div
                      className="text-center pb-2 pt-4 border-t border-blue-100/50 mt-auto"
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="font-medium text-xl text-[#1a4480]">{testimonial.author}</div>
                      <div className="text-blue-500 font-medium mt-1">{testimonial.position}</div>
                    </motion.div>

                    {/* Bottom accent bar */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1a4480] via-blue-400 to-[#3672d0]"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + (index * 0.2) }}
                    ></motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="px-4 py-1 bg-[#1a4480]/10 rounded-full">
                <span className="text-sm font-semibold text-[#1a4480]">Join Our Community</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#1a4480] to-[#2c5aa0]">
              Ready to revolutionize education?
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of educational institutions already transforming with EduSpry.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-100 rounded-lg rotate-12"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-indigo-100 rounded-lg -rotate-12"></div>

            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden relative z-10">
              <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                <div className="md:col-span-3 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#1a4480]/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-[#1a4480]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">EduSpry Platform</h3>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Start your educational transformation today
                  </h2>

                  <p className="text-gray-600 mb-8">
                    Experience the power of AI-driven learning, analytics, and management tools in one
                    integrated platform. Our 30-day free trial gives you full access to all features.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">All user roles included</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Fast setup process</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Dedicated support</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">No credit card required</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 p-8 md:p-12 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Get started in minutes
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Start with our 30-day free trial. No credit card required.
                    </p>
                  </div>

                  <div className="mt-auto space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button asChild size="lg" className="w-full rounded-full shadow-lg bg-[#1a4480] hover:bg-[#0f2b50]">
                        <Link to="/register">
                          Start Free Trial
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button asChild variant="outline" size="lg" className="w-full rounded-full border-[#1a4480] text-[#1a4480]">
                        <a href="#">
                          Schedule Demo
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 pb-8 relative overflow-hidden" style={{ backgroundColor: '#1a4480', position: 'relative', zIndex: 1 }}>
        <div className="absolute inset-0 bg-[#1a4480] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4 lg:col-span-5">
              <div className="pr-8">
                <motion.div
                  className="flex items-center mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <BookOpen className="h-8 w-8 text-white" />
                  <span className="ml-2 text-xl font-bold text-white">EduSpry</span>
                </motion.div>

                <p className="text-blue-100 text-base mb-8 opacity-80">
                  Transforming education through intelligent analytics, AI-powered insights, and comprehensive management tools for educational institutions worldwide.
                </p>

                <div className="flex space-x-4">
                  {/* Social icons */}
                  {[
                    { icon: <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></motion.svg>, ariaLabel: "Facebook" },
                    { icon: <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></motion.svg>, ariaLabel: "Twitter" },
                    { icon: <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></motion.svg>, ariaLabel: "LinkedIn" },
                    { icon: <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></motion.svg>, ariaLabel: "Instagram" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.ariaLabel}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-8 lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center">
                    <span className="w-5 h-0.5 bg-blue-300 mr-2"></span>
                    Solutions
                  </h3>
                  <ul className="space-y-3">
                    {['For Students', 'For Teachers', 'For Administrators', 'For Parents'].map((item, i) => (
                      <motion.li key={i}>
                        <motion.a
                          href="#"
                          className="text-blue-100 hover:text-white flex items-center"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                          <span>{item}</span>
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center">
                    <span className="w-5 h-0.5 bg-blue-300 mr-2"></span>
                    Resources
                  </h3>
                  <ul className="space-y-3">
                    {['Documentation', 'Guides', 'API Status', 'Help Center', 'Community'].map((item, i) => (
                      <motion.li key={i}>
                        <motion.a
                          href="#"
                          className="text-blue-100 hover:text-white flex items-center"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                          <span>{item}</span>
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6 flex items-center">
                    <span className="w-5 h-0.5 bg-blue-300 mr-2"></span>
                    Company
                  </h3>
                  <ul className="space-y-3">
                    {['About', 'Blog', 'Careers', 'Press', 'Contact', 'Partners'].map((item, i) => (
                      <motion.li key={i}>
                        <motion.a
                          href="#"
                          className="text-blue-100 hover:text-white flex items-center"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="h-4 w-4 mr-1 opacity-70" />
                          <span>{item}</span>
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-200/80 text-sm">
                &copy; {new Date().getFullYear()} EduSpry. All rights reserved.
              </p>

              <div className="flex space-x-6 mt-4 md:mt-0">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="text-blue-200/80 text-sm hover:text-white"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
