import toast from "react-hot-toast";

function deleteAllEntries() {
    // Open the IndexedDB database
    var request = window.indexedDB.open('fitScouterDb');
  
    // Handle successful database opening
    request.onsuccess = function(event) {
        const db = (event.target as IDBRequest).result;
  
      // Start a transaction and get the object store
      var transaction = db.transaction(['user-exercises-entries'], 'readwrite');
      var objectStore = transaction.objectStore('user-exercises-entries');
  
      // Clear all entries in the object store
      var clearRequest = objectStore.clear();
  
      clearRequest.onsuccess = function(event:any) {
        console.log('All entries deleted successfully.');
      };
  
      clearRequest.onerror = function(event:any) {
        toast.error("Oops, deleteAllEntries has an error!");
        console.error('Error deleting entries:', clearRequest.error);
      };
  
      // Close the transaction and database
      transaction.oncomplete = function(event:any) {
        toast.success("Entries succesfully deleted!")
        db.close();
      };
    };
  
    // Handle errors in opening the database
    request.onerror = function(event) {
      toast.error("Oops, couldn't open the database in deleteAllEntries!");
      console.error('Error opening database:', request.error);
    };
  }
  

  export default deleteAllEntries