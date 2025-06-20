import React, { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';

import {
  ethnicities,
  genders,
  grades,
  provinces,
  subjects,
  FormData
} from '../interfaces/formTypes';

export function StudentForm() {
  const [step, setStep] = useState(1);
  type SelectableField = keyof Pick<FormData, 'ethnicity' | 'gender' | 'province' | 'grade'>;

  const optionsMap: Record<SelectableField, readonly string[]> = {
    ethnicity: ethnicities,
    gender: genders,
    province: provinces,
    grade: grades
  };

  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjectMark, setSubjectMark] = useState('');

  const [formData, setFormData] = useState<FormData>({
    ethnicity: '',
    gender: '',
    province: '',
    grade: '',
    subjects: [],
    interests: [],
    preferredInstitutionType: ''
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    if (['ethnicity', 'gender', 'province', 'grade', 'subject'].includes(name)) {
      const validOptions = optionsMap[name as SelectableField];
      if (validOptions && !validOptions.includes(value)) {
        console.warn(`Invalid ${name} selection:`, value);
      } else {
        console.log(`Valid ${name} selection:`, value);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubject = () => {
    if (!selectedSubject || !subjectMark) {
      alert('Please select a subject and enter a mark');
      return;
    }

    if (formData.subjects.length >= 7) {
      alert('Maximum of 7 subjects allowed');
      return;
    }

    if (formData.subjects.some((s) => s.name === selectedSubject)) {
      alert('Subject already added');
      return;
    }

    const newSubject = { name: selectedSubject, mark: subjectMark };

    setFormData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, newSubject]
    }));

    setSelectedSubject('');
    setSubjectMark('');
  };

  const handleSubjectChange = (index: number, field: 'name' | 'mark', value: string) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      subjects: updatedSubjects
    }));
  };

  const removeSubject = (index: number) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      subjects: updatedSubjects
    }));
  };

  const handleInterestToggle = (interest: string) => {
    const currentInterests = formData.interests;
    if (currentInterests.includes(interest)) {
      setFormData({
        ...formData,
        interests: currentInterests.filter((item) => item !== interest)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...currentInterests, interest]
      });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <section id="form" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get Your Personalized Recommendations
          </h2>
          <p className="text-xl text-gray-600">
            Tell us about yourself, and our AI will generate tailored university, course, and bursary recommendations for you
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {(['ethnicity', 'gender', 'province', 'grade'] as const).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <select
                        name={field}
                        value={formData[field]}
                        onChange={handleSelectChange}
                        className="w-full border p-2 rounded"
                      >
                        <option value="">Select {field}</option>
                        {optionsMap[field].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 mt-6">
                <h3 className="text-xl font-semibold">Academic Information</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Subjects and Marks</label>
                  <div className="flex gap-2 mb-4">
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="flex-1 px-4 py-2 border rounded"
                    >
                      <option value="">Select a Subject</option>
                      {subjects.filter((s) => !formData.subjects.some((sub) => sub.name === s)).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Enter Mark"
                      value={subjectMark}
                      onChange={(e) => setSubjectMark(e.target.value)}
                      className="w-24 px-4 py-2 border rounded"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      disabled={formData.subjects.length >= 7}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Add
                    </button>
                  </div>

                  {formData.subjects.map((subject, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={subject.name}
                        readOnly
                        className="flex-1 px-4 py-2 border rounded"
                      />
                      <input
                        type="text"
                        value={subject.mark}
                        onChange={(e) => handleSubjectChange(index, 'mark', e.target.value)}
                        placeholder="Mark"
                        className="w-24 px-4 py-2 border rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 mt-6">
                <h3 className="text-xl font-semibold">Preferences</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Areas of Interest (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      'Science',
                      'Engineering',
                      'Medicine',
                      'Arts',
                      'Humanities',
                      'Business',
                      'Law',
                      'Education',
                      'Technology',
                      'Social Sciences'
                    ].map((interest) => (
                      <div key={interest} className="flex items-center">
                        <input
                          type="checkbox"
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={interest} className="ml-2 text-sm text-gray-700">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Institution Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['University', 'University of Technology', 'TVET College'].map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="radio"
                          id={type}
                          name="preferredInstitutionType"
                          value={type}
                          checked={formData.preferredInstitutionType === type}
                          onChange={(e) => handleSelectChange(e)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={type} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  Next <ArrowRightIcon size={16} className="ml-2" />
                </button>
              ) : null}
            </div>
          </form>
        </div>
       
      </div>
    </section>
  );
}
