import preselectedExercises from "../preselectedExercises";
function populatePreselectedExercisesTbl() {
    const request = indexedDB.open("fitScouterDb", 1);

    request.onsuccess = function (event) {
      const db = request.result;
      const defaultRecord = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("preselected-exercises", "readwrite");
      const store = transaction.objectStore("preselected-exercises");

      const exerciseNameIndex = store.index("exercise_name");
      const exerciseCategoryIndex = store.index("exercise_category");

      preselectedExercises.forEach((exercise) => {
        const formattedExercise = {
          name: exercise.name,
          category: exercise.category,
          measurement: exercise.measurement,
          favorite: exercise.favorite,
        };

        const exerciseNameQuery = exerciseNameIndex.getAll(exercise.name);

        exerciseNameQuery.onsuccess = function (event) {
          const result = (event.target as IDBRequest).result;
          if (result.length === 0) {
            store.add(formattedExercise);
          }
        };
      });

      const categoryQuery = exerciseCategoryIndex.openKeyCursor();
      const uniqueCategories = new Set<string>(); // Specify string type for the Set

      categoryQuery.onsuccess = function (event) {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          const category: string = cursor.key; // Specify string type for the category
          uniqueCategories.add(category);
          cursor.continue();
        } else {

        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

export default populatePreselectedExercisesTbl