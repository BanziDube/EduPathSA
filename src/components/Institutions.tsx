import { useState } from 'react';
import { FormData } from '../interfaces/formTypes';

interface RecommendationGeneratorProps {
  formData: FormData;
}

export function RecommendationGenerator({ formData }: RecommendationGeneratorProps) {
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateAPS = (subjects: { name: string; mark: string }[]) => {
    return subjects.reduce((total, subj) => {
      const mark = parseInt(subj.mark);
      if (!isNaN(mark)) {
        if (mark >= 80) return total + 7;
        if (mark >= 70) return total + 6;
        if (mark >= 60) return total + 5;
        if (mark >= 50) return total + 4;
        if (mark >= 40) return total + 3;
        if (mark >= 30) return total + 2;
      }
      return total;
    }, 0);
  };

  const handleGenerate = async () => {
    setLoading(true);
    const aps = calculateAPS(formData.subjects);
    const subjectDetails = formData.subjects
      .map((s) => `  - ${s.name}: ${s.mark}`)
      .join('\n');

    const prompt = `
Student Information:
- Ethnicity: ${formData.ethnicity}
- Gender: ${formData.gender}
- Province: ${formData.province}
- Grade: ${formData.grade}
- Preferred Institution Type: ${formData.preferredInstitutionType}
- Interests: ${formData.interests.join(', ') || 'None'}
- APS Score: ${aps}
- Subjects & Marks:
${subjectDetails}

Please list:
1. Recommended qualifications this student is eligible for.
2. Best-matched universities or institutions in South Africa.
3. Admission chances based on APS and subjects.
Keep it simple, helpful, and clear for a high school learner.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_EJ_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: { text: prompt },
            temperature: 0.7,
            maxOutputTokens: 512
          })
        }
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const result =
        data?.candidates?.[0]?.content?.text ||
        'No recommendation returned.';
      setRecommendations(result);
    } catch (error) {
      console.error('Failed to fetch Gemini response:', error);
      setRecommendations('There was an error generating recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {loading ? 'Generating...' : 'Get Recommendations'}
      </button>

      {recommendations && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md border border-gray-300 whitespace-pre-line">
          <h4 className="font-semibold text-lg mb-2">Recommendations</h4>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
}
