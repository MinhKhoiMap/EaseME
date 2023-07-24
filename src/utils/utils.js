export function calcTime(timeString) {
  const timeStringRef = String(timeString);
  const _1s = 1000;
  const _1m = _1s * 60;
  const unitTime = timeStringRef[timeStringRef.length - 1];
  if (Number(unitTime) < 58 && Number(unitTime) > 47) {
    return Number(timeStringRef);
  } else {
    const timeNum = Number(
      timeStringRef.substring(0, timeStringRef.length - 1)
    );
    if (unitTime === "m") {
      return timeNum * _1m;
    } else if (unitTime === "s") {
      return timeNum * _1s;
    }
  }
}
