export function formatTime(seconds) {
  const totalMs = seconds * 1000;
  const date = new Date(totalMs);

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const secondsPart = date.getUTCSeconds().toString().padStart(2, "0");

  return `${hours}h ${minutes}m`;
}
