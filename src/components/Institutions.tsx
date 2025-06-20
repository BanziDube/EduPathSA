import { useState } from 'react';
import { FormData } from '../interfaces/formTypes';


interface RecommendationGeneratorProps {
  formData: FormData;
}

export function RecommendationGenerator({ formData }: RecommendationGeneratorProps) {
  const [institutionRecommendations, setInstitutionRecommendations] = useState('');
  const [bursaryRecommendations, setBursaryRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const formatRecommendations = (rawText: string) => {
    let formattedText = rawText.replace(/\*\*/g, '');
    formattedText = formattedText.replace(/\*/g, '');
    formattedText = formattedText
      .replace(/(\n\s*\d+\.\s)/g, '<h3>$1</h3>')
      .replace(/(\n\s*[-•]\s)/g, '<li>')
      .replace(/\n/g, '<br/>');
    return `<div>${formattedText}</div>`;
  };

  const createBursaryPrompt = (formData: FormData): string => {
    const academicSummary = formData.subjects.map(sub => `${sub.name}: ${sub.mark}%`).join(', ');
    const interestSummary = formData.interests.join(', ');
    return `
You are an expert South African bursary advisor helping students discover both private and public funding options.

Student Profile:
- Name: ${formData.ethnicity}
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
3. Prioritize funding programs that support financially needy students.
Format cleanly. No asterisks. Keep it friendly and concise.
`;
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setInstitutionRecommendations('');
    setBursaryRecommendations('');

    const aps = calculateAPS(formData.subjects);
    const subjectDetails = formData.subjects.map((s) => `- ${s.name}: ${s.mark}`).join('\n');

    const institutionPrompt = `
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
Keep it simple, helpful, and clear. Use bullet points and emojis. Bold headings instead of numbering.
`;

    const bursaryPrompt = createBursaryPrompt(formData);

    try {
      const body = (prompt: string) => ({
        contents: [{ parts: [{ text: prompt }] }]
      });

      const [instRes, bursRes] = await Promise.all([
        fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_EJ_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body(institutionPrompt))
          }
        ).then((res) => res.json()),

        fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body(bursaryPrompt))
          }
        ).then((res) => res.json())
      ]);

      const institutionOutput = instRes?.candidates?.[0]?.content?.parts?.[0]?.text || 'No institutional recommendations.';
      const bursaryOutput = bursRes?.candidates?.[0]?.content?.parts?.[0]?.text || 'No bursary recommendations.';

      setInstitutionRecommendations(formatRecommendations(institutionOutput));
      setBursaryRecommendations(formatRecommendations(bursaryOutput));
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recommendations.');
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

      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded-md border border-red-300">
          <h4 className="font-semibold text-lg mb-2">Error</h4>
          <p>{error}</p>
        </div>
      )}

      {institutionRecommendations && (
        <div
          className="mt-4 p-4 bg-gray-100 rounded-md border border-gray-300"
          dangerouslySetInnerHTML={{ __html: institutionRecommendations }}
        />
      )}

      {bursaryRecommendations && (
        <div
          className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-300"
          dangerouslySetInnerHTML={{ __html: bursaryRecommendations }}
        />
      )}
    </div>
  );
}
