import React, { createContext, useState } from 'react';

const QuestionsContext = createContext();

const QuestionsProvider = ({ children }) => {
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  return (
    <QuestionsContext.Provider value={{ additionalQuestions, setAdditionalQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export { QuestionsContext, QuestionsProvider };
