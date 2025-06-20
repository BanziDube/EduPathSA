import React, { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

interface Subject {
  name: string;
  mark: string;
}

interface FormData {
  firstName: string;
  province: string;
  grade: string;
  subjects: Subject[];
  interests: string[];
  preferredInstitutionType: string;
}

function createBursaryPrompt(formData: FormData): string {
  const academicSummary = formData.subjects.map(sub => `${sub.name}: ${sub.mark}%`).join(', ');
  const interestSummary = formData.interests.join(', ');

  return `
You are an expert South African bursary advisor helping students discover both private and public funding options.

Student Profile:
- Name: ${formData.firstName}
- Province: ${formData.province}
- Grade: ${formData.grade}
- Subjects & Marks: ${academicSummary}
- Interests: ${interestSummary}
- Preferred Institution Type: ${formData.preferredInstitutionType}

Please recommend:
1. At least 4 bursaries or funding schemes, including NSFAS if applicable.
2. For each bursary, provide:
   • Bursary name  
   • Eligibility summary  
   • Application deadline (if available)  
   • Why this student qualifies  
   • How to apply or get started  
3. Prioritize funding programs that support financially needy students, and mention NSFAS if they are a fit.

Format cleanly. No asterisks for emphasis unless for bullet points. Keep it friendly and concise.
`;
}

function formatResponse(raw: string): string {
  return raw
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^\* /gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s*\*.*important.*$/gim, '')
    .replace(/^\s*[*•]\s*/gm, '• ')
    .trim();
}

export function useBursaryRecommendations() {
  const [recommendations, setRecommendations] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const generateBursaries = async (formData: FormData) => {
  setLoading(true);
  setError('');
  setRecommendations('');
  const prompt = createBursaryPrompt(formData);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const rawOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleaned = rawOutput ? formatResponse(rawOutput) : 'No recommendations found.';

    console.log("✅ Final Bursary Response:", cleaned); // <-- Add here

    setRecommendations(cleaned);
  } catch (err) {
    console.error(err);
    setError('Something went wrong while fetching recommendations.');
  } finally {
    setLoading(false);
  }
};


  return {
    generateBursaries,
    recommendations,
    loading,
    error
  };
}

export const BursaryDisplay: React.FC<{
  recommendations: string;
  loading: boolean;
  error: string;
}> = ({ recommendations, loading, error }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-8 mt-6">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">🎓 Bursary Recommendations</h2>

      {loading && (
        <div className="flex items-center text-gray-600 animate-pulse">
          <Loader2 className="animate-spin mr-2" />
          Generating your bursary matches...
        </div>
      )}

      {error && (
        <div className="flex items-center text-red-600 bg-red-50 border border-red-200 p-4 rounded-md mt-2">
          <AlertTriangle className="mr-2" />
          {error}
        </div>
      )}

      {!loading && !error && !recommendations && (
        <p className="text-gray-600 italic">Click "Get Recommendations" to view bursaries based on your profile.</p>
      )}

      {!loading && !error && recommendations && (
        <div className="space-y-4 text-gray-800 leading-relaxed">
          {recommendations.split('\n\n').map((para, idx) => (
            <div
              key={idx}
              className="bg-blue-50 border border-blue-100 rounded-md p-4 transition duration-200 hover:shadow-sm"
            >
              {para.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('•') ? 'ml-4 list-disc' : ''}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

