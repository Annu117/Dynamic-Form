import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { QuestionsContext, QuestionsProvider } from './QuestionsContext';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const { additionalQuestions, setAdditionalQuestions } = useContext(QuestionsContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(values);
    }
  };
  useEffect(() => {
    const fetchAdditionalQuestions = async () => {
      if (submittedData && submittedData.surveyTopic) {
        try {
          const response = await axios.get(`https://api.example.com/questions?topic=${submittedData.surveyTopic}`);
          setAdditionalQuestions(response.data);
        } catch (error) {
          console.error('Error fetching additional questions:', error);
        }
      }
    };
    fetchAdditionalQuestions();
  }, [submittedData, setAdditionalQuestions]);

  return {
    values,
    errors,
    submittedData,
    additionalQuestions,
    handleChange,
    handleSubmit,
  };
};

const validate = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = 'Full Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.surveyTopic) {
    errors.surveyTopic = 'Survey Topic is required';
  }
  if (values.surveyTopic === 'Technology') {
    if (!values.favoriteProgrammingLanguage) {
      errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
    }
    if (!values.yearsOfExperience) {
      errors.yearsOfExperience = 'Years of Experience is required';
    } else if (isNaN(values.yearsOfExperience) || values.yearsOfExperience <= 0) {
      errors.yearsOfExperience = 'Years of Experience must be a number greater than 0';
    }
  }
  if (values.surveyTopic === 'Health') {
    if (!values.exerciseFrequency) {
      errors.exerciseFrequency = 'Exercise Frequency is required';
    }
    if (!values.dietPreference) {
      errors.dietPreference = 'Diet Preference is required';
    }
  }
  if (values.surveyTopic === 'Education') {
    if (!values.highestQualification) {
      errors.highestQualification = 'Highest Qualification is required';
    }
    if (!values.fieldOfStudy) {
      errors.fieldOfStudy = 'Field of Study is required';
    }
  }
  if (!values.feedback) {
    errors.feedback = 'Feedback is required';
  } else if (values.feedback.length < 50) {
    errors.feedback = 'Feedback must be at least 50 characters';
  }
  return errors;
};

const SurveyForm = () => {
  const { values, errors, submittedData, additionalQuestions, handleChange, handleSubmit } = useForm(
    {
      fullName: '',
      email: '',
      surveyTopic: '',
      favoriteProgrammingLanguage: '',
      yearsOfExperience: '',
      exerciseFrequency: '',
      dietPreference: '',
      highestQualification: '',
      fieldOfStudy: '',
      feedback: '',
    },
    validate
  );  
  return (
    <div id='survey' className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Survey Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Survey Topic</label>
            <select
              name="surveyTopic"
              value={values.surveyTopic}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && <p className="text-red-500 text-sm">{errors.surveyTopic}</p>}
          </div>

          {values.surveyTopic === 'Technology' && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium">Favorite Programming Language</label>
                <select
                  name="favoriteProgrammingLanguage"
                  value={values.favoriteProgrammingLanguage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                {errors.favoriteProgrammingLanguage && <p className="text-red-500 text-sm">{errors.favoriteProgrammingLanguage}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={values.yearsOfExperience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.yearsOfExperience && <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>}
              </div>
            </div>
          )}

          {values.surveyTopic === 'Health' && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium">Exercise Frequency</label>
                <select
                  name="exerciseFrequency"
                  value={values.exerciseFrequency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && <p className="text-red-500 text-sm">{errors.exerciseFrequency}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Diet Preference</label>
                <select
                  name="dietPreference"
                  value={values.dietPreference}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.dietPreference && <p className="text-red-500 text-sm">{errors.dietPreference}</p>}
              </div>
            </div>
          )}

          {values.surveyTopic === 'Education' && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium">Highest Qualification</label>
                <select
                  name="highestQualification"
                  value={values.highestQualification}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.highestQualification && <p className="text-red-500 text-sm">{errors.highestQualification}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Field of Study</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={values.fieldOfStudy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.fieldOfStudy && <p className="text-red-500 text-sm">{errors.fieldOfStudy}</p>}
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium">Feedback</label>
            <textarea
              name="feedback"
              value={values.feedback}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows="4"
            ></textarea>
            {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Submit
          </button>
        </form>

        {submittedData && (
          <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Submitted Data</h3>
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Full Name:</strong> {submittedData.fullName}</p>
              <p className="text-gray-700"><strong>Email:</strong> {submittedData.email}</p>
              <p className="text-gray-700"><strong>Survey Topic:</strong> {submittedData.surveyTopic}</p>
              {submittedData.surveyTopic === 'Technology' && (
                <>
                  <p className="text-gray-700"><strong>Favorite Programming Language:</strong> {submittedData.favoriteProgrammingLanguage}</p>
                  <p className="text-gray-700"><strong>Years of Experience:</strong> {submittedData.yearsOfExperience}</p>
                </>
              )}
              {submittedData.surveyTopic === 'Health' && (
                <>
                  <p className="text-gray-700"><strong>Exercise Frequency:</strong> {submittedData.exerciseFrequency}</p>
                  <p className="text-gray-700"><strong>Diet Preference:</strong> {submittedData.dietPreference}</p>
                </>
              )}
              {submittedData.surveyTopic === 'Education' && (
                <>
                  <p className="text-gray-700"><strong>Highest Qualification:</strong> {submittedData.highestQualification}</p>
                  <p className="text-gray-700"><strong>Field of Study:</strong> {submittedData.fieldOfStudy}</p>
                </>
              )}
              <p className="text-gray-700"><strong>Feedback:</strong> {submittedData.feedback}</p>
            </div>
            {additionalQuestions.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Additional Questions</h4>
                {additionalQuestions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-gray-700"><strong>Question:</strong> {question.question}</p>
                    <p className="text-gray-700"><strong>Answer:</strong> {question.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
const App = () => (
  <QuestionsProvider>
    <SurveyForm />
  </QuestionsProvider>
);
export default App;

// export default SurveyForm;
