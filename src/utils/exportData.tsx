import * as XLSX from 'xlsx';

function exportData(){

    const request = indexedDB.open('fitScouterDb');
    request.onsuccess = function(event) {
        const db = (event.target as IDBOpenDBRequest).result;
      
      const transaction = db.transaction('user-exercises-entries', 'readonly');
      const objectStore = transaction.objectStore('user-exercises-entries');
      const getAllRequest = objectStore.getAll();
      
      getAllRequest.onsuccess = function(event) {
        const data = (event.target as IDBRequest).result;
    
        // Step 2: Convert the data to Excel format
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'User Exercises Entries');
        
        // Step 3: Save the data as a file
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        
        // Generate a download link
        const link = document.createElement('a');
        link.href = url;
        link.download = 'user-exercises-entries.xlsx';
        link.click();
      };
    };

}

export default exportData
