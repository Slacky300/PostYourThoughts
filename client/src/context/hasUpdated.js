// AuthContext.js
import { createContext, useContext, useState } from 'react';

const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const triggerUpdate = () => {
    setShouldUpdate(prev => !prev);
  };

  return (
    <UpdateContext.Provider value={{ shouldUpdate, triggerUpdate }}>
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdate = () => useContext(UpdateContext);
