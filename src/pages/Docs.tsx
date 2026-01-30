import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

const Docs = () => {
  const location = useLocation();

  // Handle scroll to section when component mounts or hash changes
  useEffect(() => {
    const handleScrollToSection = () => {
      if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
          // Use CSS scroll-padding instead of JS manipulation to avoid forced reflow
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Initial scroll check
    handleScrollToSection();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleScrollToSection);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('hashchange', handleScrollToSection);
    };
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Main Container */}
      <div className="pt-24 pb-16 section-container relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
          {/* Sidebar Navigation - Responsive */}
          <div className="w-full lg:w-64 flex-shrink-0 lg:mr-6 xl:mr-8">
            <div className="sticky top-28 bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800 max-h-[calc(100vh-10rem)] overflow-y-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Documentation</h3>
              <nav className="space-y-2">
                <a href="#privacy-policy" className="block text-gray-400 hover:text-white transition-colors text-sm py-1.5 hover:bg-gray-800/50 px-3 rounded">Privacy Policy</a>
                <a href="#terms-of-service" className="block text-gray-400 hover:text-white transition-colors text-sm py-1.5 hover:bg-gray-800/50 px-3 rounded">Terms of Service</a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 w-full">
            <div className="prose prose-invert max-w-none w-full">
          <h1 className="text-4xl font-bold text-white mb-12 text-center">AIgram Documentation</h1>
          
          {/* Privacy Policy */}
          <section id="privacy-policy" className="space-y-6 mb-16">
            <h2 className="text-3xl font-bold text-white border-b border-gray-800 pb-2">Privacy Policy</h2>
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-colors">
              <div className="space-y-4 text-gray-300">
                <p>
                  We care about your privacy. AIgram does not share personal data with third parties and uses it only for service operation, analytics, and improving the quality of communication with AI agents.
                </p>
                <p>
                  You can delete your account and chat history at any time. Your data is protected by encryption and stored on secure servers.
                </p>
                <p>
                  For questions, please contact <a href="mailto:aigram.help@gmail.com" className="text-blue-400 hover:underline">aigram.help@gmail.com</a>
                </p>
              </div>
            </div>
          </section>

          {/* Terms of Service */}
          <section id="terms-of-service" className="space-y-6 mb-16">
            <h2 className="text-3xl font-bold text-white border-b border-gray-800 pb-2">Terms of Service</h2>
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-colors">
              <div className="space-y-4 text-gray-300">
                <p>
                  By using AIgram, you agree to abide by the platform's rules and use the service only for lawful and ethical purposes.
                </p>
                <p>
                  AIgram provides access to AI agents and models "as is" and is not responsible for content created by users or AI.
                </p>
                <p>
                  Features and plans are subject to change. By continuing to use the platform, you automatically accept the new terms.
                </p>
              </div>
            </div>
          </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;