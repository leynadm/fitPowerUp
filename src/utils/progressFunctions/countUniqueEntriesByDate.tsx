function countUniqueEntriesByDate():Promise<number> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('fitScouterDb');
    
        request.onerror = function(event) {
          reject('Error opening database');
        };
    
        request.onsuccess = function(event) {
          const db = (event.target as IDBRequest).result;
          const transaction = db.transaction('user-exercises-entries', 'readonly');
          const objectStore = transaction.objectStore('user-exercises-entries');
          const index = objectStore.index('exercise_date');
          const uniqueDates = new Set();
          const countRequest = index.openCursor(null, 'nextunique');
    
          countRequest.onerror = function(event:any) {
            reject('Error counting unique entries');
          };
    
          countRequest.onsuccess = function(event:any) {
            const cursor = event.target.result;
            if (cursor) {
              const date = cursor.value.date;
              uniqueDates.add(date);
              cursor.continue();
            } else {
              const uniqueCount = uniqueDates.size;
              resolve(uniqueCount);
            }
          };
        };
      });
  }
  

  export default countUniqueEntriesByDate