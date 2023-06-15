function getLastPowerLevelEntry() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("fitScouterDb", 1);
  
      request.onerror = () => {
        console.error("Failed to open the database");
        reject();
      };
  
      request.onsuccess = () => {
        const db = request.result;
  
        const transaction = db.transaction("user-power-level", "readonly");
        const store = transaction.objectStore("user-power-level");
  
        const index = store.index("powerlevel_date");
        const getRequest = index.openCursor(null, "prev");
  
        getRequest.onsuccess = () => {
          const cursor = getRequest.result;
  
          if (cursor) {
            const lastEntry = cursor.value;
            resolve(lastEntry);
          } else {
            // No entries found
            resolve(null);
          }
        };
  
        getRequest.onerror = () => {
          console.error("Failed to retrieve the last entry");
          reject();
        };
  
        transaction.oncomplete = () => {
          db.close();
        };
      };
    });
  }
  
  export default getLastPowerLevelEntry