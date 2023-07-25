import toast from "react-hot-toast";

// Define the function to update records in the user-exercises-entries table
function updateExerciseCategory(updatedExerciseName:string, newCategory:string) {
    const request = indexedDB.open("fitScouterDb");
  
    request.onerror = (event) => {
      toast.error("Oops, updateExerciseCategory has an error!");
      console.log("Error opening IndexedDB:", request.error);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result;
  
      // Start a new transaction with readwrite access
      const transaction = db.transaction("user-exercises-entries", "readwrite");
  
      // Retrieve the object store
      const store = transaction.objectStore("user-exercises-entries");
  
      // Create a cursor to iterate over all records in the object store
      const cursorRequest = store.openCursor();
  
      cursorRequest.onsuccess = (event:any) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          const entry = cursor.value;


          // Check if the exercise name matches the updated exercise name
          if (entry.exercise === updatedExerciseName) {
            // Update the category to the new value
            entry.category = newCategory;
  
            // Update the record with the new data
            const updateRequest = cursor.update(entry);
  
            updateRequest.onsuccess = () => {
              console.log("Record updated successfully:", updateRequest.result);
            };
  
            updateRequest.onerror = () => {
              toast.error("Oops, updateRequest in updateExerciseCategory has an error!");
              console.log("Error updating record:", updateRequest.error);
            };
          }
  
          // Move to the next record
          cursor.continue();
        }
      };
  
      cursorRequest.onerror = () => {
        console.log("Error opening cursor:", cursorRequest.error);
      };
  
      // Close the transaction and the database connection
      transaction.oncomplete = () => {
        db.close();
      };
    };
  }

  export default updateExerciseCategory
  