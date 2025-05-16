import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Lightbulb, Award, ChevronRight, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <header className="bg-[#1a4480] shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-white">EduSpry</Link>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-8">
                <Link to="/features" className="text-white hover:text-blue-200 font-medium">Features</Link>
                <Link to="/pricing" className="text-white hover:text-blue-200 font-medium">Pricing</Link>
                <Link to="/about" className="text-white hover:text-blue-200 font-medium">About</Link>
                <Link to="/contact" className="text-white hover:text-blue-200 font-medium">Contact</Link>
              </nav>
              <Button
                className="bg-white text-[#1a4480] hover:bg-blue-50 px-6 py-2 rounded-md font-medium"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                className="bg-white text-[#1a4480] hover:bg-blue-50 px-6 py-2 rounded-md font-medium"
                asChild
              >
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with subtle pattern and gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] bg-grid-white/[0.05] bg-[length:16px_16px]"></div>

        {/* Accent lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-400"></div>

        {/* Content */}
        <div className="container relative mx-auto px-6 py-24 md:py-32">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              variants={itemVariants}
            >
              Transform Your Education <br className="hidden md:block" />
              <span className="text-blue-200">With AI-Powered Learning</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-3xl mb-8"
              variants={itemVariants}
            >
              EduSpry helps teachers create engaging content, students learn more effectively,
              and institutions track performance - all through an intuitive, AI-enhanced platform.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
              variants={itemVariants}
            >
              <Button
                className="bg-white text-[#1a4480] hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg font-semibold"
                asChild
              >
                <Link to="/demo">Watch Demo <ChevronRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Straight divider */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-50"></div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <img src="/brands/harvard.svg" alt="Harvard" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/brands/stanford.svg" alt="Stanford" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/brands/mit.svg" alt="MIT" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/brands/oxford.svg" alt="Oxford" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
            <img src="/brands/cambridge.svg" alt="Cambridge" className="h-8 grayscale opacity-70 hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduSpry?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to transform every aspect of educational experience
              with innovative AI-powered tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Generated Content</h3>
              <p className="text-gray-600 mb-4">
                Create lesson plans, tests, quizzes and flashcards in seconds with our advanced AI assistance.
              </p>
              <ul className="space-y-2">
                {['Test generators', 'Lesson planners', 'Flashcard creators'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Student Engagement</h3>
              <p className="text-gray-600 mb-4">
                Boost student engagement with interactive learning tools and personalized content.
              </p>
              <ul className="space-y-2">
                {['Voice assistant', 'Doubt solving', 'Interactive quizzes'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Analytics</h3>
              <p className="text-gray-600 mb-4">
                Track student performance with detailed analytics and actionable insights.
              </p>
              <ul className="space-y-2">
                {['Performance dashboards', 'Progress tracking', 'Personalized recommendations'].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from educators and students who've transformed their learning experience with EduSpry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] flex items-center justify-center text-white font-semibold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="bg-gradient-to-r from-[#1a4480] to-[#2c5aa0] rounded-2xl overflow-hidden relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>

            <div className="relative py-16 px-8 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Educational Experience?
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Join thousands of educators and students who are already benefiting from EduSpry's AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-white text-[#1a4480] hover:bg-blue-50 px-8 py-6 text-lg rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link to="/register">Start Your Free Trial</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg font-semibold"
                  asChild
                >
                  <Link to="/contact">Contact Sales <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with extra background wrapper */}
      <div style={{ backgroundColor: '#1a4480' }}>
        <footer
          className="pt-12 pb-8 relative overflow-hidden"
          style={{ backgroundColor: '#1a4480', position: 'relative', zIndex: 1 }}
        >
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
    </div>
  );
};

export default LandingPage;
