import { GraduationCapIcon, CompassIcon, BookOpenIcon } from 'lucide-react';
export function Hero() {
  return <section className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Your AI-Powered University Application Assistant
            </h1>
            <p className="text-xl mb-8">
              Simplifying tertiary education applications for South African
              youth through personalized recommendations and guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#form" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Get Started
              </a>
              <a href="#how-it-works" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors">
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center p-4 bg-white/10 rounded-md">
                  <GraduationCapIcon size={36} className="mb-3" />
                  <h3 className="text-lg font-medium mb-2">
                    Institution Matching
                  </h3>
                  <p className="text-center text-sm">
                    Find the perfect university based on your profile
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/10 rounded-md">
                  <BookOpenIcon size={36} className="mb-3" />
                  <h3 className="text-lg font-medium mb-2">
                    Course Recommendations
                  </h3>
                  <p className="text-center text-sm">
                    Discover courses aligned with your academic strengths
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/10 rounded-md">
                  <CompassIcon size={36} className="mb-3" />
                  <h3 className="text-lg font-medium mb-2">Career Roadmaps</h3>
                  <p className="text-center text-sm">
                    Visualize your educational journey and career path
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/10 rounded-md">
                  <svg className="w-9 h-9 mb-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">Bursary Matching</h3>
                  <p className="text-center text-sm">
                    Find financial aid opportunities suited to your profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}