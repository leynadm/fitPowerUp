function updateExerciseCategories(setExercisesCategories: any) {
  const request = indexedDB.open("fitScouterDb", 1);

  if (!request) {
    console.log("request value:");
    console.log(request);
    return;
  }

  // Check if there are any error while opening the Db
  request.onerror = function (event) {
    console.error("And error occurred with IndexedDb");
    console.error(event);
  };

  // Check if there are any error while opening the Db
  request.onerror = function (event) {
    console.error("And error occurred with IndexedDb");
    console.error(event);
  };

  request.onupgradeneeded = function () {
    const db = request.result; // Result of our open request
  };

  request.onsuccess = function (event) {
    const db = request.result;
    const defaultRecord = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction("preselected-exercises", "readwrite");
    const store = transaction.objectStore("preselected-exercises");
    const exerciseCategoryIndex = store.index("exercise_category");

    const categoryQuery = exerciseCategoryIndex.openKeyCursor();
    const uniqueCategories = new Set<string>(); // Specify string type for the Set

    categoryQuery.onsuccess = function (event) {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        const category: string = cursor.key; // Specify string type for the category
        uniqueCategories.add(category);
        cursor.continue();
      } else {
        const categories: string[] = Array.from(uniqueCategories).sort(); // Specify string[] type
        console.log("Categories:", categories);

        console.log("categories");

        setExercisesCategories(categories);

        console.log(categories);
      }
    };

    transaction.oncomplete = function () {
      db.close();
    };
  };
}

export default updateExerciseCategories;
