const toTimeString = (sec, showMilliSeconds = true) => {
  sec = parseFloat(sec);
  let minutes = Math.floor(sec / 60);
  let seconds = sec - minutes * 60;
  // add 0 if value < 10; Example: 2 => 02
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds.toFixed(3); // Ensure seconds have 3 decimal places
  } else {
    seconds = seconds.toFixed(3); // Ensure seconds have 3 decimal places
  }

  if (showMilliSeconds) {
    // Extract milliseconds from the formatted seconds
    let [wholeSeconds, milliSeconds] = seconds.split(".");
    milliSeconds = milliSeconds || "000"; // Pad milliseconds with zeros if not present
    return minutes + ":" + wholeSeconds + "." + milliSeconds;
  } else {
    return minutes + ":" + seconds.split(".")[0]; // Exclude milliseconds
  }
};

const formatFileSize = (sizeInBytes) => {
  if (sizeInBytes < 1024) {
      return `${sizeInBytes} KB`;
  } else {
      const sizeInKB = sizeInBytes / 1024;
      if (sizeInKB < 1024) {
          return `${sizeInKB.toFixed(2)} KB`;
      } else {
          const sizeInMB = sizeInKB / 1024;
          return `${sizeInMB.toFixed(2)} MB`;
      }
  }
};

const formatDuration = (durationInSeconds) => {
const minutes = Math.floor(durationInSeconds / 60);
const seconds = Math.floor(durationInSeconds % 60);
return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const readFileAsBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const download = (url) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "");
  link.click();
};

export { toTimeString, readFileAsBase64, download, formatFileSize, formatDuration };