import toast from "react-hot-toast";

function findMaxWeight(exerciseName: string, id: number) {
  return new Promise<{ id: number, maxWeight: number }>((resolve, reject) => {
    const request = indexedDB.open("fitScouterDb", 1);

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      const transaction = db.transaction("user-exercises-entries", "readonly");
      const objectStore = transaction.objectStore("user-exercises-entries");
      const index = objectStore.index("exercise_name_and_weight");

      const lowerBound = [exerciseName, 0];
      const upperBound = [exerciseName, Number.MAX_SAFE_INTEGER];
      const range = IDBKeyRange.bound(lowerBound, upperBound, false, true);

      const order = "prev";

      const cursorRequest = index.openCursor(range, order);
      cursorRequest.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const entryId = cursor.value.id;
          if (entryId !== id) {
            const maxWeight = cursor.value.weight;
            resolve({ id: entryId, maxWeight: maxWeight });
          } else {
            cursor.continue(); // Skip the entry with the specified id
          }
        } else {
          resolve({ id: 0, maxWeight: 0 }); // Return 0 if no records found
        }
      };

      cursorRequest.onerror = (event) => {
        toast.error("Oops, findMaxWeight cursor has an error!");
        reject(request.error);
        transaction.abort();
        db.close();
      };
    };

    request.onerror = (event) => {
      toast.error("Oops, couldn't open the database in findMaxWeight!");
      reject(request.error);
    };
  });
}

export default findMaxWeight;
