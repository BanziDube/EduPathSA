import { useState } from 'react';
import { FormData } from '../interfaces/formTypes';

interface RecommendationGeneratorProps {
  formData: FormData;
}

export function RecommendationGenerator({ formData }: RecommendationGeneratorProps) {
  const [recommendations, setRecommendations] = useState('');
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
    // Remove single and double asterisks
    let formattedText = rawText.replace(/\*\*/g, ''); // Remove double asterisks
    formattedText = formattedText.replace(/\*/g, ''); // Remove single asterisks
    // Replace bullet points with HTML list items for better readability
    formattedText = formattedText
      .replace(/(\n\s*\d+\.\s)/g, '<h3>$1</h3>') // Convert numbered sections to headers
      .replace(/(\n\s*-\s)/g, '<li>') // Convert bullet points to list items
      .replace(/(\n\s*•\s)/g, '<li>') // Convert bullet points with • to list items
      .replace(/\n/g, '<br/>'); // Replace new lines with line breaks
    // Wrap the entire text in a <div> for better structure
    return `<div>${formattedText}</div>`;
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
Keep it simple, helpful, and clear for a high school learner. Furthermore, provide the content in a bullet form and also provide Emojis if necessary.
Bold the heading font instead of numbering them.`;
    console.log('📤 Prompt:', prompt);
    console.log('API Key:', import.meta.env.VITE_GEMINI_EJ_KEY); // Log the API key

    try {
    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };
    console.log('Request Body:', JSON.stringify(body)); // Log the request body
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_EJ_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    );
    console.log('Response Status:', response.status); // Log the response status
    const data = await response.json();
    console.log('Response Data:', data); // Log the entire response data
    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || // Adjust this based on the response structure
      'No recommendation returned.';

      // Format the recommendations before setting them
      const formattedResult = formatRecommendations(result);

      setRecommendations(formattedResult);
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

      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded-md border border-red-300">
          <h4 className="font-semibold text-lg mb-2">Error</h4>
          <p>{error}</p>
        </div>
      )}

      {recommendations && (
        <div
          className="mt-4 p-4 bg-gray-100 rounded-md border border-gray-300"
          dangerouslySetInnerHTML={{ __html: recommendations }} // Render formatted recommendations
        />
      )}
    </div>
  );
}
