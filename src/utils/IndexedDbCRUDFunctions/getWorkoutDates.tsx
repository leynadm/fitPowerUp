import dayjs, { Dayjs } from "dayjs";
import toast from "react-hot-toast";

function getWorkoutDates() {
    return new Promise<string[]>((resolve, reject) => {
      const request = window.indexedDB.open("fitScouterDb");
  
      request.onerror = (event) => {
        toast.error("Oops, getWorkoutDates has an error!");
        reject(new Error("Error opening IndexedDB database"));
      };
  
      request.onsuccess = (event) => {
        const db = (event.target as IDBRequest).result;
        const transaction = db.transaction("user-exercises-entries", "readonly");
        const objectStore = transaction.objectStore("user-exercises-entries");
        const uniqueDates: string[] = [];
  
        const request = objectStore.openCursor();
        request.onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            const date = dayjs(cursor.value.date).format("YYYY-MM-DD");
            if (!uniqueDates.includes(date)) {
              uniqueDates.push(date);
            }
            cursor.continue();
          } else {
            resolve(uniqueDates);
          }
        };
  
        request.onerror = (event: any) => {
          toast.error("Oops, getWorkoutDates has an error!");
          reject(new Error("Error retrieving data from IndexedDB"));
        };
      };
  
      request.onupgradeneeded = (event) => {
        const db = request.result;
        db.createObjectStore("tableName", { keyPath: "id", autoIncrement: true });
      };
    });
  }
  
  export default getWorkoutDates;
  