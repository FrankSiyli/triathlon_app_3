export function formatTime(seconds) {
  const totalMs = seconds * 1000;
  const date = new Date(totalMs);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const secondsPart = date.getUTCSeconds();

  if (hours > 0) {
    return date.toISOString().slice(11, 19);
  } else {
    return `${minutes.toString().padStart(2, "0")}:${secondsPart
      .toString()
      .padStart(2, "0")}`;
  }
}
