function getAllPreselectedExercises() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("fitScouterDb", 1);
  
      request.onerror = function (event) {
        console.error("An error occurred with IndexedDB", event);
        reject(request.error);
      };
  
      request.onsuccess = function () {
        const db = request.result;
        const transaction = db.transaction("preselected-exercises", "readonly");
        const store = transaction.objectStore("preselected-exercises");
        const getAllRequest = store.getAll();
  
        getAllRequest.onsuccess = function (event) {
          const preselectedExercises = (event.target as IDBOpenDBRequest).result;
          resolve(preselectedExercises);
        };
    
        getAllRequest.onerror = function (event) {
          console.error("Error getting all preselected exercises", event);
          reject(getAllRequest.error);
        };
      };
    });
  }

  export default getAllPreselectedExercises