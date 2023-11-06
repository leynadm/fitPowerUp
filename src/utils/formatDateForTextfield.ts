function formatDateForTextField(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();
  
    // Pad the month and day with zeros if necessary
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');
  
    // Return the date in the yyyy-MM-dd format
    return `${year}-${paddedMonth}-${paddedDay}`;
  };

  export default formatDateForTextField