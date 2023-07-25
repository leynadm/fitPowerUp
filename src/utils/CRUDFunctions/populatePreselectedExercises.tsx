import toast from "react-hot-toast";

function populatePreselectedExercises(setExercisesCategories:any) {
    const request = indexedDB.open("fitScouterDb", 1);
  
    if (!request) {
      console.log("request value:");
      console.log(request);
      return;
    }
  
    // Check if there are any errors while opening the DB
    request.onerror = function (event) {
      toast.error("Oops, populatePreselectedExercises has an error!");
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };
  
    request.onupgradeneeded = function () {
      const db = request.result; // Result of our open request
  
      // Create the "preselected-exercises" table with its indexes
      const store = db.createObjectStore("preselected-exercises", {
        keyPath: "id",
        autoIncrement: true,
      });
  
      store.createIndex("exercise_name", "name", { unique: false });
      store.createIndex("exercise_category", "category", { unique: false });
      store.createIndex("exercise_name_and_category", ["name", "category"], {
        unique: false,
      });
    };
  
    request.onsuccess = function (event) {
      const db = request.result;
      const transaction = db.transaction("preselected-exercises", "readwrite");
      const store = transaction.objectStore("preselected-exercises");
  
      const exerciseNameIndex = store.index("exercise_name");
      const exerciseCategoryIndex = store.index("exercise_category");
  
      const cursorRequest = store.openCursor();
  
      cursorRequest.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          const exercise = cursor.value;
  
          const formattedExercise = {
            name: exercise.name,
            category: exercise.category,
            measurement: exercise.measurement,
          };
  
          const exerciseNameQuery = exerciseNameIndex.getAll(exercise.name);
  
          exerciseNameQuery.onsuccess = function (event) {
            const result = (event.target as IDBRequest).result;
            if (result.length === 0) {
              store.add(formattedExercise);
            }
          };
  
          cursor.continue();
        } else {
          const categoryQuery = exerciseCategoryIndex.openKeyCursor();
          const uniqueCategories = new Set();
  
          categoryQuery.onsuccess = function (event) {
            const cursor = (event.target as IDBRequest).result;
            if (cursor) {
              const category = cursor.key;
              uniqueCategories.add(category);
              cursor.continue();
            } else {
              const categories = Array.from(uniqueCategories);
              console.log("Categories:", categories);
              setExercisesCategories(categories);
            }
          };
  
          transaction.oncomplete = function () {
            db.close();
          };
        }
      };
    };
  }
  
  export default populatePreselectedExercises;
  
