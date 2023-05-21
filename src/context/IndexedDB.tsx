import React, { createContext, ReactNode, useEffect, useState } from 'react';

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

  useEffect(() => {
    const req = window.indexedDB.open('fitScouterD', 1);

    req.onerror = function (event) {
      console.error('An error occurred with fitScouterDb');
      console.error(event);
    };

    req.onupgradeneeded = function () {
      const db = req.result;
      // Perform any database schema upgrades here
      // ...
    };

    req.onsuccess = function () {
      const db = req.result;
      setDatabase(db);
    };

    setRequest(req);
  }, []);

  if (!database || !request) {
    // Handle the case when the database or request is not available or not yet opened
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








/* 


import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface IndexedDBProviderProps {
  children: ReactNode;
}

export const IndexedDBContext = createContext<IDBDatabase | null>(null);

export const IndexedDBProvider: React.FC<IndexedDBProviderProps> = ({ children }) => {
  const [database, setDatabase] = useState<IDBDatabase | null>(null);

  useEffect(() => {

    const request = window.indexedDB.open("fitScouterDb", 1);

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };

    request.onupgradeneeded = function () {
      const db = request.result;
      // Perform any database schema upgrades here
      // ...
    };

    request.onsuccess = function () {
      const db = request.result;
      setDatabase(db);
    };
  }, []);

  if (!database) {
    // Handle the case when the database is not available or not yet opened
    return <div>Loading...</div>;
  }

  return (
    <IndexedDBContext.Provider value={database}>
      {children}
    </IndexedDBContext.Provider>
  );
};
 */




/* 

import React, { createContext, ReactNode } from 'react';

interface IndexedDBProviderProps {
  children: ReactNode;
}

export const IndexedDBContext = createContext<IDBFactory | null>(null);

export const IndexedDBProvider: React.FC<IndexedDBProviderProps> = ({ children }) => {
  const indexedDb = window.indexedDB;

  if (!indexedDb) {
    // Handle the case when indexedDB is not available
    return <div>IndexedDB is not supported</div>;
  }

  return (
    <IndexedDBContext.Provider value={indexedDb}>
      {children}
    </IndexedDBContext.Provider>
  );
};
 */