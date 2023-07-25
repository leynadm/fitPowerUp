import toast from "react-hot-toast";

function deleteEntriesByCategory(category:string) {
    const request = indexedDB.open("fitScouterDb", 1);
  
    request.onsuccess = function (event) {
      const db = (event.target as IDBRequest).result;
  
      // Step 1: Connect to the table preselected-exercises
      const preselectedTransaction = db.transaction("preselected-exercises", "readwrite");
      const preselectedStore = preselectedTransaction.objectStore("preselected-exercises");
  
      // Step 2: Find and delete entries matching the category
      const preselectedIndex = preselectedStore.index("exercise_category");
      const preselectedRequest = preselectedIndex.openCursor(IDBKeyRange.only(category));
  
      preselectedRequest.onsuccess = function (event:any) {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
  
      // Step 3: Connect to the table user-exercises-entries
      const userEntryTransaction = db.transaction("user-exercises-entries", "readwrite");
      const userEntryStore = userEntryTransaction.objectStore("user-exercises-entries");
  
      // Step 4: Find and delete entries matching the category
      const userEntryIndex = userEntryStore.index("exercise_category");
      const userEntryRequest = userEntryIndex.openCursor(IDBKeyRange.only(category));
  
      userEntryRequest.onsuccess = function (event:any) {
        const cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
  
      // Step 6: Close the database
      userEntryTransaction.oncomplete = function () {
        db.close();
      };
    };
  
    request.onerror = function () {
      toast.error("Oops, couldn't open the database in deleteEntriesByCategory!");
      console.log("Error opening database");
    };
  }

  export default deleteEntriesByCategory