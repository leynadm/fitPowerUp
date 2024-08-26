function convertTimestamp(timestampValueToPass: any) {
    let date = timestampValueToPass.toDate();
    const isoString = date.toISOString();
    const dateString = isoString.slice(0, 10);
    return dateString;
  }

export default convertTimestamp