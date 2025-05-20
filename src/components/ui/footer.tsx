import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '/features' },
        { text: 'Pricing', href: '/pricing' },
        { text: 'Security', href: '/security' },
        { text: 'Roadmap', href: '/roadmap' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '/about' },
        { text: 'Careers', href: '/careers' },
        { text: 'Blog', href: '/blog' },
        { text: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', href: '/docs' },
        { text: 'Help Center', href: '/help' },
        { text: 'Community', href: '/community' },
        { text: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy', href: '/privacy' },
        { text: 'Terms', href: '/terms' },
        { text: 'Cookie Policy', href: '/cookies' },
        { text: 'Licenses', href: '/licenses' },
      ],
    },
  ];

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-[#1a4480] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 mr-2" />
              <span className="text-2xl font-bold">EduSpry</span>
            </Link>
            <p className="text-blue-100 mb-6 text-sm">
              Transforming education with AI-powered learning tools and comprehensive analytics.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="text-blue-200 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.href}
                      className="text-blue-200 hover:text-white transition-colors text-sm"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-blue-200 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              © {new Date().getFullYear()} EduSpry. All rights reserved.
            </motion.p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/accessibility" className="text-blue-200 hover:text-white text-sm">
                Accessibility
              </Link>
              <Link to="/sitemap" className="text-blue-200 hover:text-white text-sm">
                Sitemap
              </Link>
              <Link to="/status" className="text-blue-200 hover:text-white text-sm">
                Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
