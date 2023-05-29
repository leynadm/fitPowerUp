function deleteExerciseEntries(exercise:string) {
  const request = indexedDB.open("fitScouterDb", 1);
  
    request.onsuccess = function (event) {
      const db = (event.target as IDBRequest).result;
  
      // Step 1: Connect to the table preselected-exercises
      const preselectedTransaction = db.transaction("preselected-exercises", "readwrite");
      const preselectedStore = preselectedTransaction.objectStore("preselected-exercises");
  
      // Step 2: Find and delete entries matching the category
      const preselectedIndex = preselectedStore.index("exercise_name");
      const preselectedRequest = preselectedIndex.openCursor(IDBKeyRange.only(exercise));
  
      preselectedRequest.onsuccess = function (event:any) {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
  
      // Step 3: Connect to the table user-exercises-entries
      const userEntryTransaction = db.transaction("user-exercises-entries", "readwrite");
      const userEntryStore = userEntryTransaction.objectStore("user-exercises-entries");
  
      // Step 4: Find and delete entries matching the category
      const userEntryIndex = userEntryStore.index("exercise_name");
      const userEntryRequest = userEntryIndex.openCursor(IDBKeyRange.only(exercise));
  
      userEntryRequest.onsuccess = function (event:any) {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
  
      // Step 6: Close the database
      userEntryTransaction.oncomplete = function () {
        db.close();
      };
    };
  
    request.onerror = function () {
      console.log("Error opening database");
    };
  }
  
  export default deleteExerciseEntries