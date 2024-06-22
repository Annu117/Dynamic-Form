import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg ">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8">Welcome to Our Form Application</h1>
        <p className="text-gray-700 text-lg mb-10 text-center">
          This application provides various forms for different purposes. Use the navigation bar above to select the form you need. Below are brief descriptions of each form:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Event Registration Form</h2>
            <p className="text-gray-700 mb-4">
              Register for an event by providing your name, email, age, and guest information. This form will dynamically show the "Guest Name" field if you choose to attend with a guest.
            </p>
            <br></br>
            <Link to="/event-registration" className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300">
              Go to Event Registration
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Job Application Form</h2>
            <p className="text-gray-700 mb-4">
              Apply for a job by providing your personal information, relevant experience, and additional skills. The form will dynamically display fields based on the position you are applying for.
            </p>
            <Link to="/job-application" className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300">
              Go to Job Application
            </Link>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Survey Form</h2>
            <p className="text-gray-700 mb-4">
              Participate in our survey by selecting a topic and answering the relevant questions. This form will fetch additional questions based on your selected topic from an external API.
            </p>
            <br></br>
            <Link to="/survey" className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300">
              Go to Survey
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
