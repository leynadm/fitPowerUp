import toast from "react-hot-toast";

function getFavoriteExercises(setExercisesToSearch: any) {

    const request = indexedDB.open("fitScouterDb", 1);

  request.onerror = function (event) {
    toast.error("Oops, getAllExercises has an error!");
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onsuccess = function () {
    const db = request.result;
    const transaction = db.transaction("preselected-exercises", "readonly");
    const store = transaction.objectStore("preselected-exercises");

    const selectedCategoryExercises: {
      category: string;
      name: string;
      measurement: any[];
      favorite: boolean;
    }[] = [];

    // Open a cursor to iterate through all records
    const exerciseQuery = store.openCursor();

    exerciseQuery.onsuccess = function (event) {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        // Check if "favorite" property is true and then add it to the array
        if (cursor.value.favorite === true) {
          selectedCategoryExercises.push(cursor.value);
        }
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

export default getFavoriteExercises;
