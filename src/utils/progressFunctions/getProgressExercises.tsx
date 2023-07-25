import toast from "react-hot-toast";

function getProgressExercises() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('fitScouterDb', 1);
  
      request.onerror = function (event) {
        toast.error("Oops, getProgressExercises has an error!");
        console.error('An error occurred with IndexedDB');
        console.error(event);
        reject(event);
      };
  
      request.onsuccess = function () {
        const db = request.result;
        const transaction = db.transaction('preselected-exercises', 'readonly');
        const store = transaction.objectStore('preselected-exercises');
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
            resolve(selectedCategoryExercises);
          }
        };
  
        transaction.oncomplete = function () {
          db.close();
        };
      };
    });
  }
  
  export default getProgressExercises;
  