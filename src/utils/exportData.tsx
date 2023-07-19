import * as XLSX from 'xlsx';

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

    trackerCursorRequest.onsuccess = function(event) {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        trackerData.push(cursor.value);
        cursor.continue();
      }
    };

    transaction.oncomplete = function() {
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
    };
  };
}

export default exportData;
