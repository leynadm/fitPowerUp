function checkExercisePR(name:string) {

    return new Promise((resolve, reject) => {
      // Open the IndexedDB database
      const request = indexedDB.open("fitScouterDb");
  
      // Handle success event
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
  
        // Start a transaction to access the object store
        const transaction = db.transaction("user-records-entries", "readonly");
        const objectStore = transaction.objectStore("user-records-entries");
  
        // Create an index to search by name
        const index = objectStore.index("exercise_name");
  
        // Create a range to filter by name
        const range = IDBKeyRange.only(name);
  
        // Open a cursor and search for the record
        const cursorRequest = index.openCursor(range);
        cursorRequest.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
  
          if (cursor) {
            // Found a record matching the name
            resolve(cursor.value);
          } else {
            // No record found
            resolve(null);
          }
  
          // Close the transaction and database connection
          transaction.abort();
          db.close();
        };
  
        cursorRequest.onerror = (event) => {
          reject(request.error);
          transaction.abort();
          db.close();
        };
      };
  
      // Handle error event
      request.onerror = (event) => {
        reject(request.error);
      };
    });
  }
  
  export default checkExercisePR;
  