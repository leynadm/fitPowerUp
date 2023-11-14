import Exercise from "../interfaces/Exercise";
async function getIndexedDbExercises(
  exerciseName: string
): Promise<Exercise[]> {
  return new Promise((resolve, reject) => {
    // Open the IndexedDB database
    const request = indexedDB.open("fitScouterDb", 2);

    // Handle database open success
    request.onsuccess = (event: Event) => {
      const db = (event.target as any).result;

      // Open a transaction and get the object store
      const transaction = db.transaction("user-exercises-entries", "readonly");
      const objectStore = transaction.objectStore("user-exercises-entries");

      const entries: Exercise[] = [];

      // Open a cursor to iterate through the object store
      const cursorRequest = objectStore.openCursor();

      cursorRequest.onsuccess = (event: Event) => {
        const cursor = (event.target as IDBRequest)
          .result as IDBCursorWithValue;

        if (cursor) {
          if (cursor.value.exercise === exerciseName) {
            entries.push(cursor.value);
          }
          cursor.continue();
        } else {
          resolve(entries);
        }
      };

      cursorRequest.onerror = () => {
        reject(cursorRequest.error);
      };

      // Handle transaction completion
      transaction.oncomplete = () => {
        db.close();
      };
    };

    // Handle database open error
    request.onerror = () => {
      reject(request.error);
    };
  });
}

export default getIndexedDbExercises;
