
function createInitialDbTables(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("fitScouterDb", 1);
  
      console.log('inside createInitialDbTables:')
      if (!request) {
        console.log("request value:");
        console.log(request);
        reject(new Error("Failed to open IndexedDB"));
        return;
      }
  
      // Check if there are any errors while opening the DB
      request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
        reject(request.error);
      };
  
      request.onupgradeneeded = function () {
        const db = request.result; // Result of our open request
  
        // Create first table with its indexes
        const store = db.createObjectStore("preselected-exercises", {
          keyPath: "id",
          autoIncrement: true,
        });
  
        store.createIndex("exercise_name", "name", { unique: false });
        store.createIndex("exercise_category", "category", { unique: false });
        store.createIndex("exercise_name_and_category", ["name", "category"], {
          unique: false,
        });
  
        // create second table with its indexes
        const user_entries = db.createObjectStore("user-exercises-entries", {
          keyPath: "id",
          autoIncrement: true,
        });
  
        user_entries.createIndex("exercise_date", "date", { unique: false });
        user_entries.createIndex("exercise_name", "exercise", { unique: false });
        user_entries.createIndex("exercise_category", "category", {
          unique: false,
        });
        user_entries.createIndex("exercise_weight", "weight", { unique: false });
        user_entries.createIndex("exercise_reps", "reps", { unique: false });
        user_entries.createIndex("exercise_distance", "distance", {
          unique: false,
        });
        user_entries.createIndex("exercise_distance_unit", "distance_unit", {
          unique: false,
        });
        user_entries.createIndex("exercise_time", "time", { unique: false });
        user_entries.createIndex("exercise_pr", "pr", { unique: false });
        user_entries.createIndex("exercise_name_and_date", ["exercise", "date"], {
          unique: false,
        });
        user_entries.createIndex("exercise_name_and_pr", ["exercise", "pr"], {
          unique: false,
        });
        user_entries.createIndex(
          "exercise_name_and_weight",
          ["exercise", "weight"],
          {
            unique: false,
          }
        );
        user_entries.createIndex(
          "exercise_name_and_reps",
          ["exercise", "reps"],
          {
            unique: false,
          }
        );
  
        // create the body tracker table with its indexes
        const body_tracker = db.createObjectStore("user-body-tracker", {
          keyPath: "id",
          autoIncrement: true,
        });
  
        body_tracker.createIndex("bodytracker_name", "name", { unique: false });
        body_tracker.createIndex("bodytracker_date", "date", { unique: false });
        body_tracker.createIndex("bodytracker_value", "value", { unique: false });
        body_tracker.createIndex(
          "bodytracker_name_and_date",
          ["name", "date"],
          { unique: false }
        );


        // create the body tracker table with its indexes
        const workout_evaluation = db.createObjectStore("workout-evaluation", {
          keyPath: "id",
          autoIncrement: true,
        });
  
        workout_evaluation.createIndex("workout_evaluation_rating", "rating", { unique: false });
        workout_evaluation.createIndex("workout_evaluation_date", "date", { unique: true });
        workout_evaluation.createIndex("workout_evaluation_comment", "comment", { unique: false });
        workout_evaluation.createIndex("workout_evaluation_train", "train", { unique: false });
        workout_evaluation.createIndex("workout_evaluation_pain", "pain", { unique: false });
        workout_evaluation.createIndex("workout_evaluation_warm_stretch", "warm_stretch", { unique: false });

        // create the power level tracker table with its indexes
        const power_level = db.createObjectStore("user-power-level", {
          keyPath: "id",
          autoIncrement: true,
        });
  
        power_level.createIndex("powerlevel_score", "score", { unique: false });
        power_level.createIndex("powerlevel_date", "date", { unique: true });
        power_level.createIndex("powerlevel_bodyweight", "bodyweight", { unique: false });
        power_level.createIndex("powerlevel_first_exercise", "first", { unique: false });
        power_level.createIndex("powerlevel_second_exercise", "second", { unique: false });
        power_level.createIndex("powerlevel_third_exercise", "third", { unique: false });
        power_level.createIndex(
          "powerlevel_score_and_date",
          ["score", "date"],
          { unique: false }
        );
  

  
        // create the record table with its indexes
        const user_records = db.createObjectStore("user-records-entries", {
          keyPath: "id",
          autoIncrement: true,
        });
  
        user_records.createIndex("exercise_date", "date", { unique: false });
        user_records.createIndex("exercise_name", "exercise", { unique: false });
        user_records.createIndex("exercise_category", "category", {
          unique: false,
        });
        user_records.createIndex("exercise_weight", "weight", { unique: false });
        user_records.createIndex("exercise_reps", "reps", { unique: false });
        user_records.createIndex("exercise_distance", "distance", {
          unique: false,
        });
        user_records.createIndex("exercise_distance_unit", "distance_unit", {
          unique: false,
        });
        user_records.createIndex("exercise_time", "time", { unique: false });
        user_records.createIndex("exercise_pr", "pr", { unique: false });
        user_records.createIndex(
          "exercise_name_and_date",
          ["exercise", "date"],
          { unique: false }
        );
        user_records.createIndex("exercise_name_and_pr", ["exercise", "pr"], {
          unique: false,
        });
  
        const objectStore = db.createObjectStore("user-data-preferences", {
          keyPath: "id",
          autoIncrement: true,
        });
  
        // Add an index for querying if needed
        objectStore.createIndex("unitsIndex", "unitsSystem");
  
        // Add the default record
        const defaultRecord = {
          unitsSystem: "metric",
          defaultWeightIncrement: 2.5,
        };
  
        objectStore.add(defaultRecord);
      };
  
      request.onsuccess = function () {
        const db = request.result;
         
        db.close();
         
        resolve();
      };
    });
  }
  
  export default createInitialDbTables;
  