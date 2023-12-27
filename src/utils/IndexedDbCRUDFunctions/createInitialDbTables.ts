import toast from "react-hot-toast";
import updateAppVersionWithNewDocs from "../accountSetupFunctions/updateAppVersionWithNewDocs";
function createInitialDbTables(USERID: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("fitPowerUpDb", 2);
    if (!request) {
      toast.error(
        "Oops, failed to open the database in createInitialDbTables!"
      );
      reject(new Error("Failed to open IndexedDB"));
      return;
    }

    // Check if there are any errors while opening the DB
    request.onerror = function (event) {
      toast.error("Oops, request in createInitialDbTables has an error!");
      console.error("An error occurred with IndexedDB");
      console.error(event);
      reject(request.error);
    };

    request.onupgradeneeded = async function (event) {
      const db = request.result; // Result of our open request

      if (event.oldVersion < 2) {
        
        //CREATE INDEXED DB TABLE FOR USER-EXERCISES-ENTRIES
        const user_entries = db.createObjectStore("user-exercises-entries", {
          keyPath: "id",
          autoIncrement: true,
        });

        user_entries.createIndex("exercise_date", "date", { unique: false });
        user_entries.createIndex("exercise_amrap", "amrap", {
          unique: false,
        });
        user_entries.createIndex("exercise_name", "exercise", {
          unique: false,
        });
        user_entries.createIndex("exercise_group", "group", {
          unique: false,
        });
        user_entries.createIndex("exercise_weight", "weight", {
          unique: false,
        });
        user_entries.createIndex("exercise_reps", "reps", { unique: false });
        user_entries.createIndex("exercise_distance", "distance", {
          unique: false,
        });
        user_entries.createIndex("exercise_distance_unit", "distance_unit", {
          unique: false,
        });
        user_entries.createIndex("exercise_time", "time", { unique: false });
        user_entries.createIndex("exercise_pr", "pr", { unique: false });
        user_entries.createIndex(
          "exercise_name_and_date",
          ["exercise", "date"],
          {
            unique: false,
          }
        );
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

        const user_preset_workouts = db.createObjectStore("user-preset-workouts", {
          keyPath: "id",
          autoIncrement: true,
        });

        user_preset_workouts.createIndex("exercise_date", "date", { unique: false });
        user_preset_workouts.createIndex("exercise_amrap", "amrap", {
          unique: false,
        });
        user_preset_workouts.createIndex("exercise_name", "exercise", {
          unique: false,
        });
        user_preset_workouts.createIndex("exercise_group", "group", {
          unique: false,
        });
        user_preset_workouts.createIndex("exercise_weight", "weight", {
          unique: false,
        });
        user_preset_workouts.createIndex("exercise_reps", "reps", { unique: false });
        user_preset_workouts.createIndex("exercise_distance", "distance", {
          unique: false,
        });
        user_preset_workouts.createIndex("exercise_distance_unit", "distance_unit", {
          unique: false,
        });
        user_preset_workouts.createIndex("exercise_time", "time", { unique: false });
        user_preset_workouts.createIndex("exercise_pr", "pr", { unique: false });
        user_preset_workouts.createIndex(
          "exercise_name_and_date",
          ["exercise", "date"],
          {
            unique: false,
          }
        );
        user_preset_workouts.createIndex("exercise_name_and_pr", ["exercise", "pr"], {
          unique: false,
        });
        user_preset_workouts.createIndex(
          "exercise_name_and_weight",
          ["exercise", "weight"],
          {
            unique: false,
          }
        );
        user_preset_workouts.createIndex(
          "exercise_name_and_reps",
          ["exercise", "reps"],
          {
            unique: false,
          }
        );
      }
    };

    request.onsuccess = async function () {
      const db = request.result;

      try {
        await updateAppVersionWithNewDocs(USERID);

        resolve();
      } catch (error) {
        reject(error);
      }

      db.close();

      resolve();
    };

  });
}

export default createInitialDbTables;
