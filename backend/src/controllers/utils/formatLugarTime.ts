export function formatTime(hour?: number, minute?: number) {
  if (hour === undefined || minute === undefined) return null;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
}