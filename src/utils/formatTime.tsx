function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format hours, minutes, and seconds with leading zeros
  const formattedHours = hours > 0 ? hours.toString().padStart(2, "0") + ":" : "";
  const formattedMinutes = minutes.toString().padStart(2, "0") + ":";
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  // Build the formatted time string
  let formattedTime = formattedHours + formattedMinutes + formattedSeconds;

  // Add 'h' if it's hours, 'm' if it's minutes, or 's' if it's seconds
  if (hours > 0) {
    formattedTime += "h";
  } else if (minutes > 0) {
    formattedTime += "m";
  } else {
    formattedTime += "s";
  }

  return formattedTime;
}

export default formatTime;
