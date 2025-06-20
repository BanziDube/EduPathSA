import { useLocation, useNavigate } from 'react-router-dom';
import { Bursary } from './Bursary'; // Assuming this is where you stored the component
import { useEffect } from 'react';
 
export function Recommendations() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
 
  useEffect(() => {
    if (!formData) {
      navigate('/student-form'); // redirect if no data is passed
    }
  }, [formData, navigate]);
 
  if (!formData) {
    return null; // Optional fallback
  }
 
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        🎯 Your Personalized Bursary Matches
      </h1>
      <Bursary formData={formData} />
    </div>
  );
}
 