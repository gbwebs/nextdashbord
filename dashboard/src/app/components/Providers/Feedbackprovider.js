'use client';
import { createContext, useContext, useState } from 'react';

const FeedbackContext = createContext();
export const useFeedback = () => useContext(FeedbackContext);

export function FeedbackProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <FeedbackContext.Provider value={{ message, showMessage }}>
      {message && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow">
          {message}
        </div>
      )}
      {children}
    </FeedbackContext.Provider>
  );
}
