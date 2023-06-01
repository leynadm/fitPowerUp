import React, { createContext, ReactNode, useEffect, useState } from 'react';
import createInitialDbTables from '../utils/CRUDFunctions/createInitialDbTables';

interface IndexedDBProviderProps {
  children: ReactNode;
}

interface IndexedDBContextValue {
  database: IDBDatabase | null;
  request: IDBOpenDBRequest | null;
}

export const IndexedDBContext = createContext<IndexedDBContextValue>({
  database: null,
  request: null,
});

export const IndexedDBProvider: React.FC<IndexedDBProviderProps> = ({ children }) => {
  const [database, setDatabase] = useState<IDBDatabase | null>(null);
  const [request, setRequest] = useState<IDBOpenDBRequest | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    createInitialDbTables()
      .then(() => {
        const request = indexedDB.open("fitScouterDb", 1);

        request.onerror = function (event) {
          console.error("An error occurred with IndexedDB");
          console.error(event);
        };

        request.onsuccess = function () {
          const db = request.result;
          setDatabase(db);
        };

        setRequest(request);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating initial tables:", error);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const contextValue: IndexedDBContextValue = {
    database,
    request,
  };

  return (
    <IndexedDBContext.Provider value={contextValue}>
      {children}
    </IndexedDBContext.Provider>
  );
};
