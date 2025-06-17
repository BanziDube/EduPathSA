import { useState } from 'react';

export function Accessibility() {
  const [userInput, setUserInput] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Simulated AI Recommendation Handler
  const handleRecommendation = () => {
    // Replace with API logic later
    const response = `Based on your input, we recommend applying to Nelson Mandela University for a BSc in Computer Science. You may also qualify for the Funza Lushaka bursary.`;
    setRecommendation(response);
    speak(response);
  };

  // Basic Text-to-Speech
  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  // Basic Speech Recognition
  const handleMicInput = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) return alert("Speech Recognition not supported in this browser.");

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-ZA';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setUserInput(speechResult);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Couldn't capture voice input. Please try again.");
    };
  };

  return (
    <section id="accessibility" className="bg-blue-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">EduPath Assistant (Accessibility Mode)</h2>
        <p className="text-gray-700 mb-6">
          Speak or type your academic background and interests. Our assistant will suggest suitable institutions, programs, and bursaries tailored to you.
        </p>

        <div className="flex flex-col gap-4">
          <textarea
            rows={4}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="E.g., I got 70% in Maths and want to study teaching..."
            className="p-4 border rounded-lg resize-none"
          />

          <div className="flex items-center gap-4">
            <button
              onClick={handleMicInput}
              className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${isListening ? 'animate-pulse' : ''}`}
            >
              🎤 {isListening ? 'Listening...' : 'Speak Input'}
            </button>

            <button
              onClick={handleRecommendation}
              disabled={!userInput}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              🎯 Get Recommendation
            </button>
          </div>

          {recommendation && (
            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-600 rounded">
              <h3 className="text-green-700 font-semibold mb-2">Suggested Path:</h3>
              <p className="text-gray-800">{recommendation}</p>
              <button
                onClick={() => speak(recommendation)}
                className="mt-3 text-sm text-blue-600 underline hover:text-blue-800"
              >
                🔊 Read this out loud
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
