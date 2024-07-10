import React, { useState, createContext, useCallback, useMemo } from 'react';
import initialMessages from './constants/initialMessages';

const LatestMessagesContext = createContext({});

export default LatestMessagesContext;

export function LatestMessages({ children }) {
  const [messages, setMessages] = useState(initialMessages);

  const setLatestMessage = useCallback((userId, value) => {
    setMessages({ ...messages, [userId]: value });
  }, [messages]);


  const providerValue = useMemo(() => ({ messages, setLatestMessage }), [
    messages,
    setLatestMessage
  ]);

  return (
    <LatestMessagesContext.Provider value={providerValue}>
      {children}
    </LatestMessagesContext.Provider>
  );
}
