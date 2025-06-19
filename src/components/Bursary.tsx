import React, { useEffect, useState } from 'react';
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

interface BursaryProps {
  formData: FormData;
}

// ✅ Generate structured Gemini prompt
function createBursaryPrompt(formData: FormData): string {
  const { firstName, province, grade, subjects, interests, preferredInstitutionType } = formData;
  const academicSummary = subjects.map(sub => `${sub.name}: ${sub.mark}%`).join(', ');
  const interestSummary = interests.join(', ');

  return `
You are an expert South African bursary advisor helping students discover **both private and public** funding options.

Student Profile:
- Name: ${firstName}
- Province: ${province}
- Grade: ${grade}
- Subjects & Marks: ${academicSummary}
- Interests: ${interestSummary}
- Preferred Institution Type: ${preferredInstitutionType}

Please recommend:
1. At least 3 bursaries or funding schemes, **including NSFAS** if applicable.
2. For each bursary, provide:
   • Bursary name  
   • Eligibility summary  
   • Application deadline (if available)  
   • Why this student qualifies  
   • How to apply or get started  
3. Prioritize funding programs that support financially needy students, and mention **NSFAS** if they are a fit.

Format cleanly. No asterisks for emphasis unless for bullet points. Keep it friendly and concise.
`;
}


// ✅ Clean up Gemini output to trim *, emojis, and fluff
function formatResponse(raw: string): string {
  return raw
    .replace(/\*\*(.*?)\*\*/g, '$1') // remove **bold**
    .replace(/^\* /gm, '• ') // keep bullet points
    .replace(/\n{3,}/g, '\n\n') // trim excess spacing
    .replace(/^\s*\*.*important.*$/gim, '') // remove disclaimer lines
    .replace(/^\s*[*•]\s*/gm, '• ') // normalize bullet symbols
    .trim();
}

export const Bursary: React.FC<BursaryProps> = ({ formData }) => {
  const [recommendations, setRecommendations] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError('');
      const prompt = createBursaryPrompt(formData);
      console.log('📤 Gemini Prompt:\n', prompt);

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        const data = await response.json();
        const rawOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        const cleaned = rawOutput ? formatResponse(rawOutput) : 'No recommendations found.';
        setRecommendations(cleaned);
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching recommendations.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [formData]);

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Bursary Recommendations</h2>

      {loading && (
        <div className="flex items-center text-gray-600">
          <Loader2 className="animate-spin mr-2" /> Generating your recommendations...
        </div>
      )}

      {error && (
        <div className="text-red-600 flex items-center">
          <AlertTriangle className="mr-2" /> {error}
        </div>
      )}

      {!loading && !error && (
        <div className="whitespace-pre-wrap bg-blue-50 p-6 rounded-md shadow text-gray-800 leading-relaxed">
          {recommendations}
        </div>
      )}
    </section>
  );
};
