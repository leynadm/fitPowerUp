import React, { createContext, ReactNode, useEffect, useState } from "react";
import createInitialDbTables from "../utils/CRUDFunctions/createInitialDbTables";
import enablePersistentData from "../utils/enablePersistentData";
interface IndexedDBProviderProps {
  children: ReactNode;
}

interface IndexedDBContextValue {}

export const IndexedDBContext = createContext<IndexedDBContextValue>({});

export const IndexedDBProvider: React.FC<IndexedDBProviderProps> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    enablePersistentData();
    createInitialDbTables()
      .then(() => {
        console.log("Tables are inside the database.");
      })
      .catch((error) => {
        console.error("Error creating tables:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const contextValue: IndexedDBContextValue = {};

  return (
    <IndexedDBContext.Provider value={contextValue}>
      {children}
    </IndexedDBContext.Provider>
  );
};
