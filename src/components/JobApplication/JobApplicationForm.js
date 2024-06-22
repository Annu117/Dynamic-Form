import React, { useState, useEffect } from 'react';
import useFormValidation from './useFormValidation';
import 'tailwindcss/tailwind.css';

const JobApplicationForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, validate] = useFormValidation(formValues);

  useEffect(() => {
    localStorage.setItem('formValues', JSON.stringify(formValues));
  }, [formValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormValues((prevState) => {
      if (checked) {
        return { ...prevState, [name]: [...prevState[name], value] };
      } else {
        return { ...prevState, [name]: prevState[name].filter((skill) => skill !== value) };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formValues);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">

      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Job Application Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
        <label className="block text-gray-700 font-medium">Full Name</label>
        <input
            type="text"
            name="fullName"
            value={formValues.fullName}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.fullName && <p className="text-red-500 text-sm ">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block font-medium text-gray-700 ">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm ">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 ">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm ">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 ">Applying for Position</label>
          <select
            name="position"
            value={formValues.position}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.position ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
        </div>

        {['Developer', 'Designer'].includes(formValues.position) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relevant Experience (Years)</label>
            <input
              type="number"
              name="relevantExperience"
              value={formValues.relevantExperience}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.relevantExperience ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.relevantExperience && <p className="text-red-500 text-sm mt-1">{errors.relevantExperience}</p>}
          </div>
        )}

        {formValues.position === 'Designer' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio URL</label>
            <input
              type="text"
              name="portfolioUrl"
              value={formValues.portfolioUrl}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.portfolioUrl ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.portfolioUrl && <p className="text-red-500 text-sm mt-1">{errors.portfolioUrl}</p>}
          </div>
        )}

        {formValues.position === 'Manager' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Management Experience</label>
            <textarea
              name="managementExperience"
              value={formValues.managementExperience}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.managementExperience ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.managementExperience && <p className="text-red-500 text-sm mt-1">{errors.managementExperience}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Skills</label>
          <div className="flex flex-wrap gap-4">
            {['JavaScript', 'CSS', 'Python'].map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value={skill}
                  onChange={handleCheckboxChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
          {errors.additionalSkills && <p className="text-red-500 text-sm mt-1">{errors.additionalSkills}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Interview Time</label>
          <input
            type="datetime-local"
            name="preferredInterviewTime"
            value={formValues.preferredInterviewTime}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.preferredInterviewTime ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.preferredInterviewTime && <p className="text-red-500 text-sm mt-1">{errors.preferredInterviewTime}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Submitted Data</h3>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {submittedData.position}</p>
          {submittedData.relevantExperience && (
            <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience} years</p>
          )}
          {submittedData.portfolioUrl && (
            <p><strong>Portfolio URL:</strong>

{submittedData.portfolioUrl} 
              <a 
                href={submittedData.portfolioUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 underline hover:text-blue-700 transition duration-300">
                (View Portfolio)
              </a>
            </p>
          )}
          {submittedData.managementExperience && (
            <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {submittedData.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {new Date(submittedData.preferredInterviewTime).toLocaleString()}</p>
        </div>
      )}
    </div></div>
  );
};

export default JobApplicationForm;

