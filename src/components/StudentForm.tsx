import React, { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
export function StudentForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    province: '',
    grade: '',
    subjects: [{
      name: '',
      mark: ''
    }],
    interests: [],
    preferredInstitutionType: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubjectChange = (index: number, field: string, value: string) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [field]: value
    };
    setFormData({
      ...formData,
      subjects: updatedSubjects
    });
  };
  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, {
        name: '',
        mark: ''
      }]
    });
  };
  const removeSubject = (index: number) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects.splice(index, 1);
    setFormData({
      ...formData,
      subjects: updatedSubjects
    });
  };
  const handleInterestToggle = (interest: string) => {
    const currentInterests = formData.interests as string[];
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
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                      Province
                    </label>
                    <select id="province" name="province" value={formData.province} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                      <option value="">Select Province</option>
                      <option value="Eastern Cape">Eastern Cape</option>
                      <option value="Free State">Free State</option>
                      <option value="Gauteng">Gauteng</option>
                      <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                      <option value="Limpopo">Limpopo</option>
                      <option value="Mpumalanga">Mpumalanga</option>
                      <option value="Northern Cape">Northern Cape</option>
                      <option value="North West">North West</option>
                      <option value="Western Cape">Western Cape</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Grade
                    </label>
                    <select id="grade" name="grade" value={formData.grade} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required>
                      <option value="">Select Grade</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                      <option value="Completed Matric">Completed Matric</option>
                    </select>
                  </div>
                </div>
              </div>}
            {step === 2 && <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Academic Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Subjects and Marks
                  </label>
                  {formData.subjects.map((subject, index) => <div key={index} className="flex items-center space-x-4 mb-3">
                      <div className="flex-grow">
                        <select value={subject.name} onChange={e => handleSubjectChange(index, 'name', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Select Subject</option>
                          <option value="English">English</option>
                          <option value="Afrikaans">Afrikaans</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Mathematical Literacy">
                            Mathematical Literacy
                          </option>
                          <option value="Physical Sciences">
                            Physical Sciences
                          </option>
                          <option value="Life Sciences">Life Sciences</option>
                          <option value="Geography">Geography</option>
                          <option value="History">History</option>
                          <option value="Accounting">Accounting</option>
                          <option value="Business Studies">
                            Business Studies
                          </option>
                          <option value="Economics">Economics</option>
                          <option value="Computer Applications Technology">
                            Computer Applications Technology
                          </option>
                          <option value="Information Technology">
                            Information Technology
                          </option>
                          <option value="Life Orientation">
                            Life Orientation
                          </option>
                        </select>
                      </div>
                      <div className="w-24">
                        <input type="number" min="0" max="100" placeholder="Mark %" value={subject.mark} onChange={e => handleSubjectChange(index, 'mark', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                      </div>
                      {formData.subjects.length > 1 && <button type="button" onClick={() => removeSubject(index)} className="text-red-600 hover:text-red-800">
                          Remove
                        </button>}
                    </div>)}
                  {formData.subjects.length < 8 && <button type="button" onClick={addSubject} className="mt-2 text-blue-600 hover:text-blue-800">
                      + Add Subject
                    </button>}
                </div>
              </div>}
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
                        <input type="radio" id={type} name="preferredInstitutionType" value={type} checked={formData.preferredInstitutionType === type} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
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