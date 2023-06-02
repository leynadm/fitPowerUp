function getAllExercises(setExercisesToSearch: any) {
    const request = indexedDB.open("fitScouterDb", 1);
  
    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };
  
    request.onsuccess = function () {
      const db = request.result;
      const transaction = db.transaction("preselected-exercises", "readonly");
      const store = transaction.objectStore("preselected-exercises");
      const exerciseQuery = store.openCursor();
      const selectedCategoryExercises: {
        category: string;
        name: string;
        measurement: any[];
      }[] = [];
  
      exerciseQuery.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          selectedCategoryExercises.push(cursor.value);
          cursor.continue();
        } else {
            setExercisesToSearch(selectedCategoryExercises);
        }
      };
  
      transaction.oncomplete = function () {
        db.close();
      };
  
    };
  }
  
  export default getAllExercises