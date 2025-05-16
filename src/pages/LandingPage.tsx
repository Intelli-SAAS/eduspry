import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Lightbulb, Award, ChevronRight, Star } from 'lucide-react';
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
    <div className="bg-gray-50 overflow-hidden">
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

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-[60px] w-full fill-gray-50">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,26.38,0,59.44Z"></path>
          </svg>
        </div>
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EduSpry</h3>
              <p className="text-gray-400 mb-4">
                Transforming education with AI-powered tools for students, teachers, and institutions.
              </p>
              <div className="flex space-x-4">
                {/* Social media icons */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Use Cases', 'Testimonials', 'Demo'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Blog', 'Documentation', 'Help Center', 'API', 'Community'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EduSpry. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
