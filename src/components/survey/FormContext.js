import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <FormContext.Provider value={{ isSubmitted, setIsSubmitted }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
