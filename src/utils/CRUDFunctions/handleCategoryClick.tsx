import toast from "react-hot-toast";

function handleCategoryClick(
  category: string,
  setSelectedCategoryExercises: any
) {
  const request = indexedDB.open("fitScouterDb", 1);

  request.onerror = function (event) {
    toast.error("Oops, handleCategoryClick has an error!");
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onsuccess = function () {
    const db = request.result;
    const transaction = db.transaction("preselected-exercises", "readonly");
    const store = transaction.objectStore("preselected-exercises");
    const exerciseCategoryIndex = store.index("exercise_category");

    const categoryRange = IDBKeyRange.only(category);

    const categoryQuery = exerciseCategoryIndex.openCursor(categoryRange);
    const tempSelectedCategoryExercises: {
      category: string;
      name: string;
      measurement: any[];
    }[] = [];

    categoryQuery.onsuccess = function (event) {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        tempSelectedCategoryExercises.push(cursor.value);
        cursor.continue();
      } else {
        setSelectedCategoryExercises(tempSelectedCategoryExercises);
        console.log("Selected Category Exercises:", tempSelectedCategoryExercises);
      }
    };

    transaction.oncomplete = function () {
      db.close();
    };
  };
}

export default handleCategoryClick;
