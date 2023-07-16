function checkIfDatabaseExists(databaseName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(databaseName);
  
      request.onsuccess = () => {
        request.result.close();
        resolve(true);
      };
  
      request.onerror = () => {
        resolve(false);
      };
    });
  }
  
export default checkIfDatabaseExists