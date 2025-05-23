
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const footerItems = [
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Careers', href: '/careers' },
        { text: 'Blog', href: '/blog' },
        { text: 'Press', href: '/press' },
      ]
    },
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '/features' },
        { text: 'Pricing', href: '/pricing' },
        { text: 'Integrations', href: '/integrations' },
        { text: 'Roadmap', href: '/roadmap' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', href: '/docs' },
        { text: 'Guides', href: '/guides' },
        { text: 'Webinars', href: '/webinars' },
        { text: 'Support', href: '/support' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { text: 'Terms of Service', href: '/terms' },
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Security', href: '/security' },
        { text: 'Compliance', href: '/compliance' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'X', href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'in', href: 'https://linkedin.com' },
    { name: 'Facebook', icon: 'f', href: 'https://facebook.com' },
    { name: 'Instagram', icon: 'Ig', href: 'https://instagram.com' },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerItems.map((item, index) => (
            <motion.div 
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                {item.title}
              </h3>
              <ul className="space-y-3">
                {item.links.map((link) => (
                  <li key={link.text}>
                    <Link 
                      to={link.href} 
                      className="text-base text-gray-600 hover:text-[#1a4480] transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-[#1a4480]">EduSpry</span>
              </Link>
              <p className="mt-2 text-sm text-gray-500">
                &copy; {new Date().getFullYear()} EduSpry. All rights reserved.
              </p>
            </div>

            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-[#1a4480]"
                >
                  <span className="sr-only">{social.name}</span>
                  <div className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#1a4480]">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
