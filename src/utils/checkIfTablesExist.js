function checkIfTablesExist(databaseName, tableNames) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.databases();

    request.onsuccess = () => {
      const databaseList = request.result;
      const database = databaseList.find((db) => db.name === databaseName);
      if (!database) {
        resolve(false); // Database does not exist
        return;
      }

      const dbRequest = indexedDB.open(databaseName, database.version);
      dbRequest.onsuccess = () => {
        const db = dbRequest.result;
        const tableExists = tableNames.every((tableName) => db.objectStoreNames.contains(tableName));
        db.close();
        resolve(tableExists);
      };

      dbRequest.onerror = () => {
        reject(dbRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export default checkIfTablesExist;



/* 

function checkIfFitScouterDbExists() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("fitScouterDb");
  
      request.onerror = function(event) {
        reject(Error('Error opening IndexedDB database'));
      };
  
      request.onsuccess = function(event) {
        const db = event.target.result;
        db.close(); // Close the database since we only want to check its existence
        resolve(true); // Database exists
      };
  
      request.onupgradeneeded = function(event) {
        // Handle database upgrade, if needed
        // This will be called when the database is first created
        // or when the database version is increased
      };
  
      request.onblocked = function(event) {
        reject(Error('fitScouterDb is blocked and cannot be accessed'));
      };
    });
  }
  
  function checkIfTablesExist() {
    let tableNames = ["preselected-exercises","user-body-tracker", "user-data-preferences", "user-exercises-entries","user-power-level","user-records-entries","workout-evaluation"];
    return new Promise((resolve, reject) => {
      checkIfFitScouterDbExists()
        .then((dbExists) => {
          if (dbExists) {
            const request = indexedDB.open("fitScouterDb");
  
            request.onerror = function(event) {
              reject(Error('Error opening IndexedDB database'));
            };
  
            request.onsuccess = function(event) {
              const db = event.target.result;
              const objectStoreNames = db.objectStoreNames;
              // Check if each table name exists in the database
              for (const tableName of tableNames) {
                if (!objectStoreNames.contains(tableName)) {
                  resolve(false); // Table does not exist
                  return;
                }
              }
              resolve(true); // All tables exist
            };
  
            request.onupgradeneeded = function(event) {
              // Handle database upgrade, if needed
              // This will be called when the database is first created
              // or when the database version is increased
              const db = event.target.result;
              // Perform any necessary table creation or migration
              // based on the event.target.transaction
              // ...
            };
          } else {
            resolve(false); // Database does not exist
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  export default checkIfTablesExist;
   */