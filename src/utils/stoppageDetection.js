const identifyStoppages = (gpsData, threshold) => {
  const stoppages = [];
  let startStoppage = null;

  const formatDuration = (durationInMilliseconds) => {
    const totalSeconds = Math.floor(durationInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours} hours ${remainingMinutes} minutes ${seconds} seconds`;
    } else {
      return `${minutes} minutes ${seconds} seconds`;
    }
  };

  for (let i = 0; i < gpsData.length; i++) {
    const currentPoint = gpsData[i];

    // Check if the current point is the last one
    if (i === gpsData.length - 1) {
      if (startStoppage) {
        stoppages.push({
          start: startStoppage,
          end: currentPoint,
          duration: formatDuration(
            currentPoint.eventGeneratedTime - startStoppage.eventGeneratedTime
          ),
          longitude: startStoppage.longitude,
          latitude: startStoppage.latitude,
        });
        startStoppage = null;
      }
      break; // Exit the loop
    }

    const nextPoint = gpsData[i + 1];
    const timeDifference =
      (nextPoint.eventGeneratedTime - currentPoint.eventGeneratedTime) / 60000; // in minutes
    const distance = nextPoint.odometerReading - currentPoint.odometerReading;

    if (
      currentPoint.speed === 0 &&
      distance === 0 &&
      timeDifference >= threshold
    ) {
      if (!startStoppage) {
        startStoppage = currentPoint;
      }
    } else {
      if (startStoppage) {
        stoppages.push({
          start: startStoppage,
          end: currentPoint,
          duration: formatDuration(
            currentPoint.eventGeneratedTime - startStoppage.eventGeneratedTime
          ),
        });
        startStoppage = null;
      }
    }
  }
  return stoppages;
};

export default identifyStoppages;
