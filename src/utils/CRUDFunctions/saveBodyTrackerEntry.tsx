import toast from "react-hot-toast";

function saveBodyTrackerEntry(selectedMeasurement: any, value: number, todayDate: any) {
  return new Promise<void>((resolve, reject) => {
    const request = window.indexedDB.open("fitScouterDb", 1);

    request.onerror = () => {
      toast.error("Oops, saveBodyTrackerEntry has an error!");
      console.error("Failed to open the database");
      reject();
    };

    request.onsuccess = () => {
      const db = request.result;

      const transaction = db.transaction("user-body-tracker", "readwrite");
      const store = transaction.objectStore("user-body-tracker");

      const index = store.index("bodytracker_name_and_date");
      const getRequest = index.get([selectedMeasurement, todayDate]);

      getRequest.onsuccess = () => {
        const existingEntry = getRequest.result;

        if (existingEntry) {
          // Update the existing entry
          existingEntry.name = selectedMeasurement;
          existingEntry.value = value;
          const updateRequest = store.put(existingEntry);

          updateRequest.onsuccess = () => {
            resolve();
          };

          updateRequest.onerror = () => {
            toast.error("Oops, updateRequest in saveBodyTrackerEntry has an error!");
            console.error("Failed to update the record");
            reject();
          };
        } else {
          // Create a new entry
          const record = {
            name: selectedMeasurement,
            value: value,
            date: todayDate,
          };

          const addRequest = store.add(record);

          addRequest.onsuccess = () => {
            resolve();
          };

          addRequest.onerror = () => {
            toast.error("Oops, addRequest in saveBodyTrackerEntry has an error!");
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

      if (!db.objectStoreNames.contains("user-body-tracker")) {
        const objectStore = db.createObjectStore("user-body-tracker", {
          keyPath: "id",
          autoIncrement: true,
        });

        // Create an index on the date field
        objectStore.createIndex("bodytracker_name_and_date", ["name", "date"], { unique: true });
      }
    };
  });
}

export default saveBodyTrackerEntry;
