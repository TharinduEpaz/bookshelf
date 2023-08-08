import React, { createContext, useState, useEffect, useMemo } from 'react';

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user data to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Create the memoized context value
  const userProviderValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <userContext.Provider value={userProviderValue}>
      {children}
    </userContext.Provider>
  );
};

export { UserProvider, userContext };
