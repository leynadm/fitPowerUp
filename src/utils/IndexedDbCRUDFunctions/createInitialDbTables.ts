import toast from "react-hot-toast";
import updateAppVersionWithNewDocs from "../accountSetupFunctions/updateAppVersionWithNewDocs";
function createInitialDbTables(USERID: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("fitScouterDb", 2);
    console.log("running create initial db tables:");
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
        if (db.objectStoreNames.contains("preselected-exercises")) {
          db.deleteObjectStore("preselected-exercises");
          console.log("deleted preselected-exercises");
        }
        if (db.objectStoreNames.contains("user-body-tracker")) {
          db.deleteObjectStore("user-body-tracker");
          console.log("deleted user-body-tracker");
        }
        if (db.objectStoreNames.contains("user-data-preferences")) {
          db.deleteObjectStore("user-data-preferences");
          console.log("deleted user-data-preferences");
        }
        if (db.objectStoreNames.contains("user-power-level")) {
          db.deleteObjectStore("user-power-level");
          console.log("deleted user-power-level");
        }
        if (db.objectStoreNames.contains("workout-evaluation")) {
          console.log("deleting workout-evaluation");
          db.deleteObjectStore("workout-evaluation");
        }

        if (db.objectStoreNames.contains("user-exercises-entries")) {
          console.log("deleting user-exercises-entries");
          db.deleteObjectStore("user-exercises-entries");
        }

        if (db.objectStoreNames.contains("user-records-entries")) {
          console.log("deleting user-records-entries");
          db.deleteObjectStore("user-records-entries");
        }

        const user_entries = db.createObjectStore("user-exercises-entries", {
          keyPath: "id",
          autoIncrement: true,
        });

        user_entries.createIndex("exercise_date", "date", { unique: false });
        user_entries.createIndex("exercise_name", "exercise", {
          unique: false,
        });
        user_entries.createIndex("exercise_category", "category", {
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
