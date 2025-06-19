import React, { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { ethnicities, FormData, genders, grades, provinces, subjects } from '../interfaces/formTypes';

export function StudentForm() {
  const [step, setStep] = useState(1);

  type ValidOptionsMap = {
    [key: string]: readonly string[];
  };
  const optionsMap: ValidOptionsMap = {
    ethnicity: ethnicities,
    gender: genders,
    province: provinces,
    grade: grades,
    subject: subjects
  }

  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjectMark, setSubjectMark] = useState('');

  const handleAddSubject = () => {
  if (!selectedSubject || !subjectMark) {
    alert('Please select a subject and enter a mark');
    return;
  }

  if (formData.subjects.length >= 7) {
    alert('Maximum of 7 subjects allowed');
    return;
  }

  if (formData.subjects.some(s => s.name === selectedSubject)) {
    alert('Subject already added');
    return;
  }

  const newSubject = { name: selectedSubject, mark: subjectMark };

  setFormData(prev => ({
    ...prev,
    subjects: [...prev.subjects, newSubject]
  }));

    setSelectedSubject('');
    setSubjectMark('');
  };

  const [formData, setFormData] = useState<FormData>({
    ethnicity: '',
    gender: '',
    province: '',
    grade: '',
    subjects: [{ name: '', mark: '' }],
    interests:[],
    preferredInstitutionType: ''
  });

    const handleSubjectChange = (index: number, field: 'name' | 'mark', value: string) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index][field] = value;

    setFormData(prev => ({
      ...prev,
      subjects: updatedSubjects
    }));
  };

  const removeSubject = (index: number) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects.splice(index, 1);

    setFormData(prev => ({
      ...prev,
      subjects: updatedSubjects
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<any>>
  ) => {
        const {name, value} = e.target;

        setFormData((prev: any) => ({
          ...prev, 
          [name]: value
        }));

        const validOptions = optionsMap[name];
        if(validOptions){
          if(validOptions.includes(value)){
            console.log(`Valid ${name} selection made`, value);
          }else{
            console.warn(`Invalid ${name} selection made`, value);
          }
        }
      }
    
  
  const handleInterestToggle = (interest: string) => {
    const currentInterests = formData.interests ;
    if (currentInterests.includes(interest)) {
      setFormData({
        ...formData,
        interests: currentInterests.filter(item => item !== interest)
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert("Form submitted successfully! We'll generate your personalized recommendations.");
    console.log(formData);
  };
  return <section id="form" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get Your Personalized Recommendations
          </h2>
          <p className="text-xl text-gray-600">
            Tell us about yourself, and our AI will generate tailored
            university, course, and bursary recommendations for you
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map(i => <div key={i} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {i}
                  </div>
                  {i < 3 && <div className={`h-1 w-16 sm:w-24 ${step > i ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
                </div>)}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            {step === 1 && <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                    <label htmlFor="ethnicity" className="block text-sm font-medium text-gray-700 mb-1">
                      Ethnicity
                    </label>
                    <select id="ethnicity" name="ethnicity" value={formData.ethnicity} onChange={(e) => handleSelectChange(e, setFormData)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                     <option value="">Select an Ethnicity</option>
                     {ethnicities.map(option =>(
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select id="gender" name="gender" value={formData.gender} onChange={(e) => handleSelectChange(e, setFormData)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                      <option value="">Select a Gender</option>
                      {genders.map(option =>(
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                      Province
                    </label>
                    <select id="province" name="province" value={formData.province} onChange={(e) => handleSelectChange(e, setFormData)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                      <option value="">Select a Province</option>
                      {provinces.map(option =>(
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Grade
                    </label>
                    <select id="grade" name="grade" value={formData.grade} onChange={(e) => handleSelectChange(e, setFormData)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                      <option value="">Select Grade</option>
                      {grades.map(option =>(
                        <option key={option} value={option}>{option}</option>
                      ))}
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                      <option value="Completed Matric">Completed Matric</option>
                    </select>
                  </div>
                </div>
              </div>}
                      
           {step === 2 && (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-gray-900">
      Academic Information
    </h3>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Subjects and Marks
      </label>

      {/* Add Subject Section */}
      <div className="flex gap-2 mb-4">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        >
          <option value="">Select a Subject</option>
          {subjects
            .filter(option => !formData.subjects.some(s => s.name === option)) // Hide already added
            .map(option => (
              <option key={option} value={option}>{option}</option>
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

      {/* Display Added Subjects */}
      {formData.subjects.map((subject, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            name={`subject-name-${index}`}
            value={subject.name}
            onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
            placeholder={`Subject ${index + 1}`}
            className="flex-1 px-4 py-2 border rounded"
            readOnly
          />

          <input
            type="text"
            name={`subject-mark-${index}`}
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


            {step === 3 && <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Preferences
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Areas of Interest (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['Science', 'Engineering', 'Medicine', 'Arts', 'Humanities', 'Business', 'Law', 'Education', 'Technology', 'Social Sciences'].map(interest => <div key={interest} className="flex items-center">
                        <input type="checkbox" id={interest} checked={(formData.interests as string[]).includes(interest)} onChange={() => handleInterestToggle(interest)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor={interest} className="ml-2 text-sm text-gray-700">
                          {interest}
                        </label>
                      </div>)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Institution Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['University', 'University of Technology', 'TVET College'].map(type => <div key={type} className="flex items-center">
                        <input type="radio" id={type} name="preferredInstitutionType" value={type} checked={formData.preferredInstitutionType === type} onChange={(e) => handleSelectChange(e, setFormData)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <label htmlFor={type} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>)}
                  </div>
                </div>
              </div>}
            <div className="mt-8 flex justify-between">
              {step > 1 && <button type="button" onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Back
                </button>}
              {step < 3 ? <button type="button" onClick={nextStep} className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                  Next <ArrowRightIcon size={16} className="ml-2" />
                </button> : <button type="submit" className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Get Recommendations
                </button>}
            </div>
          </form>
        </div>
      </div>
    </section>;
}