import * as XLSX from 'xlsx';
import toast from "react-hot-toast";

function exportData() {
  const request = indexedDB.open('fitScouterDb');
  request.onsuccess = function(event) {
    const db = (event.target as IDBOpenDBRequest).result;

    const transaction = db.transaction(['user-exercises-entries', 'user-body-tracker'], 'readonly');
    const objectStoreEntries = transaction.objectStore('user-exercises-entries');
    const objectStoreTracker = transaction.objectStore('user-body-tracker');

    const entriesCursorRequest = objectStoreEntries.openCursor();
    const trackerCursorRequest = objectStoreTracker.openCursor();

    let entriesData:any = [];
    let trackerData:any = [];

    entriesCursorRequest.onsuccess = function(event) {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        entriesData.push(cursor.value);
        cursor.continue();
      }
    };

    entriesCursorRequest.onerror = function(event) {

      toast.error('An error occurred while fetching data. Please try again.');
    };

    trackerCursorRequest.onsuccess = function(event) {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        trackerData.push(cursor.value);
        cursor.continue();
      }
    };

    trackerCursorRequest.onerror = function(event) {
      toast.error('An error occurred while fetching data. Please try again.');
    };

    transaction.oncomplete = function() {
      try {
        // Step 2: Convert the data to Excel format
        const workbook = XLSX.utils.book_new();

        // Create a sheet for user-exercises-entries
        const entriesWorksheet = XLSX.utils.json_to_sheet(entriesData);
        XLSX.utils.book_append_sheet(workbook, entriesWorksheet, 'User Exercises Entries');

        // Create a sheet for user-body-tracker
        const trackerWorksheet = XLSX.utils.json_to_sheet(trackerData);
        XLSX.utils.book_append_sheet(workbook, trackerWorksheet, 'User Body Tracker');

        // Step 3: Save the data as a file
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        // Generate a download link
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.href = url;
        link.download = `fitPowerUp_Exercises_Tracker_Export_${timestamp}.xlsx`;
        link.click();
        
        // Close the database connection after the export is completed
        db.close();
        toast.success("Data exported successfully!")
      } catch (error) {
        // Handle any errors that occur during the export process
        console.error('Export error:', error);
        toast.error('An error occurred during export. Please try again.');
      }
    };

    transaction.onerror = function(event) {
      toast.error('An error occurred during the transaction. Please try again.');
    };
  };

  // Handle errors during indexedDB open request
  request.onerror = function(event) {
    toast.error('An error occurred while accessing the database. Please try again.');
  };
}

export default exportData;
