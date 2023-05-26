function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format hours, minutes, and seconds with leading zeros
    const formattedHours = hours > 0 ? hours.toString().padStart(2, "0") : "";
    const formattedMinutes =
      minutes > 0 ? minutes.toString().padStart(2, "0") : "";
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    // Build the formatted time string
    let formattedTime = "";
    if (formattedHours !== "") {
      formattedTime += `${formattedHours}:`;
    }
    if (formattedMinutes !== "") {
      formattedTime += `${formattedMinutes}:`;
    }
    formattedTime += formattedSeconds;

    return formattedTime;
  }

  export default formatTime