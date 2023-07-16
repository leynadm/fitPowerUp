import React, { createContext, ReactNode, useEffect, useState } from 'react';
import createInitialDbTables from '../utils/CRUDFunctions/createInitialDbTables';
import checkIfTablesExist from '../utils/checkIfTablesExist';
import enablePersistentData from '../utils/enablePersistentData';
interface IndexedDBProviderProps {
  children: ReactNode;
}

interface IndexedDBContextValue {

}

export const IndexedDBContext = createContext<IndexedDBContextValue>({
});

export const IndexedDBProvider: React.FC<IndexedDBProviderProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    checkIfTablesExist()
    .then((tablesExist) => {
      if (tablesExist) {
        console.log('Tables already exist');
      } else {
        enablePersistentData()
        return createInitialDbTables();
      }
    })
    .then(() => {
      console.log('Tables are inside database.');
    })
    .catch((error) => {
      console.error('Error checking or creating tables:', error);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const contextValue: IndexedDBContextValue = {
    
  };

  return (
    <IndexedDBContext.Provider value={contextValue}>
      {children}
    </IndexedDBContext.Provider>
  );
};
