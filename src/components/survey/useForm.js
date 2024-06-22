import { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormContext } from './FormContext';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const { setIsSubmitted } = useFormContext();

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
      // Fetch additional questions from an external API
      try {
        const response = await axios.get(`https://api.example.com/questions?topic=${values.surveyTopic}`);
        setAdditionalQuestions(response.data);
      } catch (error) {
        console.error('Error fetching additional questions:', error);
      }
      setSubmittedData(values);
      setIsSubmitted(true);
    }
  };

  return {
    values,
    errors,
    submittedData,
    additionalQuestions,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
