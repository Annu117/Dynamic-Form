import React from 'react';
import 'tailwindcss/tailwind.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventRegistrationForm from './components/EventRegistration/EventRegistrationForm';
import JobApplicationForm from './components/JobApplication/JobApplicationForm';
import SurveyForm from './components/survey/SurveyForm';

function App() {
  return (
    <Router>
    <div className="font-sans">
      <Navbar />
      <div className="p-4">
        <Routes>
          {/* <EventRegistrationForm />
          <JobApplicationForm />
          <SurveyForm /> */}
            <Route path="/event-registration" element={<EventRegistrationForm />} />
            <Route path="/job-application" element={<JobApplicationForm />} />
            <Route path="/survey" element={<SurveyForm />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;


