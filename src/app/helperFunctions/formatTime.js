export function formatTime(seconds) {
  const totalMs = seconds * 1000;
  const date = new Date(totalMs);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const secondsPart = date.getUTCSeconds();

  const hoursString = hours > 0 ? `${hours}h ` : "";
  const minutesString = minutes.toString().padStart(2, "0") + "m ";
  const secondsString = secondsPart.toString().padStart(2, "0") + "s";

  return `${hoursString}${minutesString}${secondsString}`.trim();
}
