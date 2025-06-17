import{ useState, useEffect } from 'react';
import { Volume2Icon, TypeIcon, EyeIcon } from 'lucide-react';

export function Accessibility() {
  const [fontSize, setFontSize] = useState('16px');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--user-font-size', fontSize);
    document.body.classList.toggle('high-contrast', highContrast);
  }, [fontSize, highContrast]);

  const speakText = () => {
    const message =
      'Welcome to EduPath SA Accessibility Settings. You can adjust font size, toggle high contrast mode, and hear this message using the buttons provided.';
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(message);
    utter.lang = 'en-ZA';
    synth.speak(utter);
  };

  return (
    <section id="accessibility" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Accessibility Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EduPath SA is built with inclusive features to ensure every student
            can access, understand, and interact with the platform effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {/* Text-to-Speech */}
          <div className="bg-blue-50 rounded-xl p-8 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-blue-600 rounded-full p-3">
              <Volume2Icon size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Text-to-Speech
            </h3>
            <p className="text-gray-700 mb-4">
              Have important text read aloud to assist users with visual
              impairments or reading challenges.
            </p>
            <button
              onClick={speakText}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              aria-label="Play accessibility message"
            >
              🔊 Speak Message
            </button>
          </div>

          {/* Font Size Controls */}
          <div className="bg-green-50 rounded-xl p-8 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-green-600 rounded-full p-3">
              <TypeIcon size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Font Size Control
            </h3>
            <p className="text-gray-700 mb-4">
              Adjust the font size of text to suit your reading preferences and
              comfort.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setFontSize('20px')}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('16px')}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                A
              </button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="bg-purple-50 rounded-xl p-8 relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-purple-600 rounded-full p-3">
              <EyeIcon size={24} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              High Contrast Mode
            </h3>
            <p className="text-gray-700 mb-4">
              Toggle high-contrast mode to enhance visibility for users with
              vision impairments or sensitivity to colors.
            </p>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              {highContrast ? 'Disable' : 'Enable'} High Contrast
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
