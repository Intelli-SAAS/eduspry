
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Twitter, Linkedin, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a4480] text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0f2a50] to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">EduSpry</span>
            </div>
            <p className="text-blue-100 text-base mb-8 opacity-80">
              Transforming education through intelligent analytics, AI-powered insights, and comprehensive management tools for educational institutions worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-blue-400 pl-3">Solutions</h3>
            <ul className="space-y-3">
              {['For Schools', 'For Universities', 'For Teachers', 'For Students', 'For Administrators'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-blue-100 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-blue-400 pl-3">Resources</h3>
            <ul className="space-y-3">
              {['Documentation', 'API References', 'Case Studies', 'Blog', 'Knowledge Base', 'Community Forum'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-blue-100 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-blue-400 pl-3">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-blue-300 mr-3 mt-0.5" />
                <span className="text-blue-100">support@eduspry.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-blue-300 mr-3 mt-0.5" />
                <span className="text-blue-100">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-300 mr-3 mt-0.5" />
                <span className="text-blue-100">123 Education Blvd, San Francisco, CA 94107</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EduSpry. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-blue-200 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="#" className="text-blue-200 hover:text-white text-sm">Terms of Service</Link>
              <Link to="#" className="text-blue-200 hover:text-white text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
