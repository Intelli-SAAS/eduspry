
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, CheckCircle, User, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-16 pb-20 md:pt-24 md:pb-28">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Modern Learning Platform for</span>{' '}
                <span className="block text-primary xl:inline">Educational Excellence</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Empower students, teachers, and educational leaders with our comprehensive exam 
                preparation and performance analytics platform.
              </p>
              <div className="mt-8 sm:mt-12 flex justify-center space-x-3">
                <Button asChild size="lg" className="rounded-full px-8 shadow-lg transition-all duration-300 hover:scale-105">
                  <Link to="/login">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-2 shadow-sm transition-all duration-300 hover:scale-105">
                  <a href="#features">
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract shapes background */}
        <div className="absolute top-0 left-0 right-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C300,100 600,300 1200,200 L1200,600 L0,600 Z" fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for educational success
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              A comprehensive platform tailored for different educational roles.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
              <div className="relative group">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl opacity-20 group-hover:opacity-30 blur-lg transition-all duration-300"></div>
                  <div className="relative flex flex-col h-full">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-md">
                        <User className="h-6 w-6 text-primary" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">For Students</h3>
                    <div className="mt-4 flex-1">
                      <p className="text-base text-gray-500">
                        Access practice tests, track performance over time, and identify areas for improvement.
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {['Performance analytics', 'Test preparation', 'Personalized feedback'].map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl opacity-20 group-hover:opacity-30 blur-lg transition-all duration-300"></div>
                  <div className="relative flex flex-col h-full">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-green-100 rounded-md">
                        <BookOpen className="h-6 w-6 text-green-600" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">For Teachers</h3>
                    <div className="mt-4 flex-1">
                      <p className="text-base text-gray-500">
                        Create and manage tests, track class performance, and identify areas where students need help.
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {['Test creation', 'Student analytics', 'Question bank'].map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl opacity-20 group-hover:opacity-30 blur-lg transition-all duration-300"></div>
                  <div className="relative flex flex-col h-full">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-md">
                        <Users className="h-6 w-6 text-purple-600" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">For Principals</h3>
                    <div className="mt-4 flex-1">
                      <p className="text-base text-gray-500">
                        Overview of school performance, teacher management, and educational analytics.
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {['School analytics', 'Teacher management', 'Department oversight'].map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl mx-4 sm:mx-8 lg:mx-auto max-w-7xl overflow-hidden shadow-xl my-20">
        <div className="relative px-6 py-16 sm:py-24 sm:px-12 lg:px-16">
          <div className="relative max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to transform your educational experience?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join thousands of educational institutions already using our platform to improve student performance and streamline administrative tasks.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="rounded-full bg-white text-blue-600 hover:bg-blue-50 px-8 shadow-lg transition-all duration-300 hover:scale-105">
                <Link to="/login">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-gray-900">Spark Hub</span>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-base text-gray-500">
                &copy; {new Date().getFullYear()} Spark Hub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
