function updateExerciseIsPrToFalse(exerciseName: string, weight: number, reps: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Open the IndexedDB database
      const request = indexedDB.open("fitScouterDb");
  
      // Event handler for successful database opening
      request.onsuccess = () => {
        const db = request.result as IDBDatabase;
  
        // Create a transaction and specify the table to work with
        const transaction = db.transaction("user-exercises-entries", "readwrite");
        const objectStore = transaction.objectStore("user-exercises-entries");
  
        // Get the index and retrieve all matching entries
        const index = objectStore.index("exercise_name");

        const getRequest = index.getAll(exerciseName);
  
        getRequest.onsuccess = () => {
          const entries = getRequest.result as Array<any>;
  
          // Update the is_pr property of entries where weight is lower than the passed weight and reps values
          entries.forEach(entry => {
            if (entry.weight < weight && entry.reps<=reps) {
              entry.is_pr = false;
              objectStore.put(entry);
            } else if(entry.reps < reps && (entry.weight <= weight )){
                entry.is_pr = false;
                objectStore.put(entry);
            } 
          });
  
          // Complete the transaction
          transaction.oncomplete = () => {
            db.close();
            resolve();
          };
        };
  
        getRequest.onerror = () => {
          db.close();
          reject(new Error('Error retrieving entries'));
        };
      };
  
      // Event handler for database opening error
      request.onerror = () => {
        reject(new Error('Error opening database'));
      };
    });
  }
  
  export default updateExerciseIsPrToFalse;
  