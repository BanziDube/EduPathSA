import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBursaryRecommendations, BursaryDisplay } from './Bursary';

export function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  const {
    generateBursaries,
    recommendations,
    loading,
    error
  } = useBursaryRecommendations();

  const [ejOutput, setEjOutput] = useState<string>('');

  useEffect(() => {
    if (!formData) navigate('/student-form');
  }, [formData, navigate]);

  const handleGenerate = async () => {
    await generateBursaries(formData);
    setEjOutput('<p>🎯 EJ’s program matches will appear here</p>');
  };

  if (!formData) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        🎯 Your Personalized Recommendations
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? 'Generating...' : 'Get Recommendations'}
        </button>
      </div>

      {ejOutput && (
        <div
          className="mb-6 p-4 bg-gray-100 rounded-md border border-gray-300"
          dangerouslySetInnerHTML={{ __html: ejOutput }}
        />
      )}

      <BursaryDisplay
        recommendations={recommendations}
        loading={loading}
        error={error}
      />
    </div>
  );
}
