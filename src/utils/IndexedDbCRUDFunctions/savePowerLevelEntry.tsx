import toast from "react-hot-toast";

function savePowerLevelEntry(finalPowerLevel:number, weight:number, first:string, second:string, third:string, todayDate:any,finalNumber:number,count:number) {
    return new Promise<void>((resolve, reject) => {
      const request = window.indexedDB.open("fitScouterDb", 1);
  
      request.onerror = () => {
        toast.error("Oops, savePowerLevelEntry has an error!");
        console.error("Failed to open the database");
        reject();
      };
  
      request.onsuccess = () => {
        const db = request.result;
  
        const transaction = db.transaction("user-power-level", "readwrite");
        const store = transaction.objectStore("user-power-level");
  
        const index = store.index("powerlevel_date");
        const getRequest = index.get(todayDate);
  
        getRequest.onsuccess = () => {
          const existingEntry = getRequest.result;
          if (existingEntry) {
            // Update the existing entry
            existingEntry.score = finalPowerLevel;
            existingEntry.bodyweight = weight;
            existingEntry.first = first;
            existingEntry.second = second;
            existingEntry.third = third;
            existingEntry.strength = finalNumber;
            existingEntry.experience = count;
            const updateRequest = store.put(existingEntry);
  
            updateRequest.onsuccess = () => {
              resolve();
            };
  
            updateRequest.onerror = () => {
              console.error("Failed to update the record");
              reject();
            };
          } else {
            // Create a new entry
            const record = {
              score: finalNumber,
              bodyweight: weight,
              first: first,
              second: second,
              third: third,
              date: todayDate,
              strength:finalNumber,
              experience:count
            };
  
            const addRequest = store.add(record);
  
            addRequest.onsuccess = () => {
              resolve();
            };
  
            addRequest.onerror = () => {
              toast.error("Oops, addRequest in savePowerLevelEntry has an error!");
              console.error("Failed to save the record");
              reject();
            };
          }
        };
  
        transaction.oncomplete = () => {
          db.close();
        };
      };
  
      request.onupgradeneeded = (event) => {
        const db = request.result;
  
        if (!db.objectStoreNames.contains("user-power-level")) {
          const objectStore = db.createObjectStore("user-power-level", {
            keyPath: "id",
            autoIncrement: true,
          });
  
          // Create an index on the date field
          objectStore.createIndex("powerlevel_date", "date", { unique: false });
        }
      };
    });
  }
  
  export default savePowerLevelEntry;
  