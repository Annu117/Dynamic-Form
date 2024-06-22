import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setValues(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(values));
  }, [values]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(values);
      localStorage.removeItem('formData');
    }
  };

  return {
    values,
    errors,
    submittedData,
    handleChange,
    handleSubmit,
  };
};

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Age must be a number greater than 0';
  }
  if (values.attendingWithGuest && !values.guestName) {
    errors.guestName = 'Guest name is required if attending with a guest';
  }
  return errors;
};

const EventRegistrationForm = () => {
  const { values, errors, submittedData, handleChange, handleSubmit } = useForm(
    {
      name: '',
      email: '',
      age: '',
      attendingWithGuest: false,
      guestName: '',
    },
    validate
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Event Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Are you attending with a guest?</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="attendingWithGuest"
                checked={values.attendingWithGuest}
                onChange={handleChange}
                className="mr-2 h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="text-gray-700">Yes</span>
            </div>
          </div>
          {values.attendingWithGuest && (
            <div>
              <label className="block text-gray-700 font-medium">Guest Name</label>
              <input
                type="text"
                name="guestName"
                value={values.guestName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.guestName && <p className="text-red-500 text-sm">{errors.guestName}</p>}
            </div>
          )}
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
              <p className="text-gray-700"><strong>Name:</strong> {submittedData.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {submittedData.email}</p>
              <p className="text-gray-700"><strong>Age:</strong> {submittedData.age}</p>
              <p className="text-gray-700"><strong>Attending with Guest:</strong> {submittedData.attendingWithGuest ? 'Yes' : 'No'}</p>
              {submittedData.attendingWithGuest && (
                <p className="text-gray-700"><strong>Guest Name:</strong> {submittedData.guestName}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventRegistrationForm;
