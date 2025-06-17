import React from 'react';
import { CheckCircleIcon, SearchIcon, BookIcon, TrendingUpIcon } from 'lucide-react';
export function Features() {
  return <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How EduPathSA Transforms Your Application Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform simplifies the complex university
            application process for South African students
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-blue-50 rounded-xl p-8 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-blue-600 rounded-full p-3">
              <SearchIcon size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Smart Institution Matching
            </h3>
            <p className="text-gray-700 mb-6">
              Our algorithm analyzes your academic performance, interests, and
              goals to recommend South African universities and colleges that
              best match your profile.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Personalized university recommendations
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Admission requirement analysis
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Location and campus culture insights
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-8 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-green-600 rounded-full p-3">
              <BookIcon size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Course Recommendation Engine
            </h3>
            <p className="text-gray-700 mb-6">
              Discover degree programs and courses that align with your academic
              strengths, interests, and career aspirations.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Subject-based course recommendations
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Career outcome projections
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Alternative study path suggestions
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-purple-50 rounded-xl p-8 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-purple-600 rounded-full p-3">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Bursary & Funding Matcher
            </h3>
            <p className="text-gray-700 mb-6">
              Connect with financial aid opportunities specifically designed for
              South African students that match your profile and needs.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-purple-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Personalized bursary recommendations
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-purple-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Application deadline reminders
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-purple-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Funding requirement analysis
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-amber-50 rounded-xl p-8 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-amber-600 rounded-full p-3">
              <TrendingUpIcon size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Career Roadmap Generator
            </h3>
            <p className="text-gray-700 mb-6">
              Visualize your educational journey and potential career paths with
              our interactive roadmap tool.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-amber-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Personalized career trajectory planning
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-amber-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Industry demand forecasts</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon size={20} className="text-amber-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Skills development recommendations
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>;
}