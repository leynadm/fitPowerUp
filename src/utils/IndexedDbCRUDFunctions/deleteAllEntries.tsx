import toast from "react-hot-toast";

async function deleteAllEntries() {
  // Open the IndexedDB database
  const request = window.indexedDB.open("fitScouterDb");

  // Handle successful database opening
  request.onsuccess = function (event) {
    const db = (event.target as IDBRequest).result;

    // Start a transaction and get the object store
    const transaction = db.transaction(["user-exercises-entries"], "readwrite");
    const objectStore = transaction.objectStore("user-exercises-entries");

    // Clear all entries in the object store
    const clearRequest = objectStore.clear();

    clearRequest.onsuccess = function (event: any) {
      // Display a success toast message
      toast.success("Entries successfully deleted!");
    };

    // Close the transaction and database
    transaction.oncomplete = function () {
      db.close();
    };
  };

  // Handle errors in opening the database
  request.onerror = function (event) {
    // Display an error toast message
    toast.error("Oops, couldn't open the database in deleteAllEntries!");

    console.error("Error opening database:", request.error);
  };
}

export default deleteAllEntries;
