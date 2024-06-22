import { useState } from 'react';

const useFormValidation = (formValues) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let validationErrors = {};
    if (!formValues.fullName) validationErrors.fullName = 'Full Name is required.';
    if (!formValues.email) {
      validationErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      validationErrors.email = 'Email is invalid.';
    }
    if (!formValues.phoneNumber) {
      validationErrors.phoneNumber = 'Phone Number is required.';
    } else if (isNaN(formValues.phoneNumber)) {
      validationErrors.phoneNumber = 'Phone Number must be a valid number.';
    }
    if (['Developer', 'Designer'].includes(formValues.position)) {
      if (!formValues.relevantExperience) {
        validationErrors.relevantExperience = 'Relevant Experience is required.';
      } else if (formValues.relevantExperience <= 0) {
        validationErrors.relevantExperience = 'Relevant Experience must be greater than 0.';
      }
    }
    if (formValues.position === 'Designer') {
      if (!formValues.portfolioUrl) {
        validationErrors.portfolioUrl = 'Portfolio URL is required.';
      } else if (!/^https?:\/\/\S+$/.test(formValues.portfolioUrl)) {
        validationErrors.portfolioUrl = 'Portfolio URL is invalid.';
      }
    }
    if (formValues.position === 'Manager') {
      if (!formValues.managementExperience) {
        validationErrors.managementExperience = 'Management Experience is required.';
      }
    }
    if (formValues.additionalSkills.length === 0) {
      validationErrors.additionalSkills = 'At least one skill must be selected.';
    }
    if (!formValues.preferredInterviewTime) {
      validationErrors.preferredInterviewTime = 'Preferred Interview Time is required.';
    } else if (isNaN(Date.parse(formValues.preferredInterviewTime))) {
      validationErrors.preferredInterviewTime = 'Preferred Interview Time is invalid.';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return [errors, validate];
};

export default useFormValidation;

