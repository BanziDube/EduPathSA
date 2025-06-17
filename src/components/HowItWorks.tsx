import React from 'react';
import { ClipboardCheckIcon, BarChart2Icon, AwardIcon, TargetIcon } from 'lucide-react';
export function HowItWorks() {
  return <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform uses advanced AI to simplify your university
            application process in four easy steps
          </p>
        </div>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block" style={{
          transform: 'translateX(-50%)'
        }}></div>
          <div className="space-y-24">
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-center md:text-right">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Enter Your Information
                </h3>
                <p className="text-gray-700">
                  Fill in details about your academic performance, interests,
                  and preferences through our user-friendly form.
                </p>
              </div>
              <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-blue-600 rounded-full p-4 z-10">
                <ClipboardCheckIcon size={32} className="text-white" />
              </div>
              <div className="md:w-1/2 md:pl-12"></div>
            </div>
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12"></div>
              <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-blue-600 rounded-full p-4 z-10">
                <BarChart2Icon size={32} className="text-white" />
              </div>
              <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  AI Analysis
                </h3>
                <p className="text-gray-700">
                  Our advanced algorithms analyze your data to identify the best
                  educational paths based on your unique profile.
                </p>
              </div>
            </div>
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 text-center md:text-right">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Receive Recommendations
                </h3>
                <p className="text-gray-700">
                  Get personalized institution suggestions, course
                  recommendations, and bursary opportunities that match your
                  profile.
                </p>
              </div>
              <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-blue-600 rounded-full p-4 z-10">
                <AwardIcon size={32} className="text-white" />
              </div>
              <div className="md:w-1/2 md:pl-12"></div>
            </div>
            <div className="relative flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12"></div>
              <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-blue-600 rounded-full p-4 z-10">
                <TargetIcon size={32} className="text-white" />
              </div>
              <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Plan Your Future
                </h3>
                <p className="text-gray-700">
                  Use your personalized career roadmap to guide your educational
                  journey and achieve your professional goals.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center">
          <a href="#form" className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
            Start Your Journey Now
          </a>
        </div>
      </div>
    </section>;
}