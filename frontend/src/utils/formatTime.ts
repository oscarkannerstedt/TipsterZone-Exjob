export const formatTime = (utcDate: string) => {
  const date = new Date(utcDate);

  return date.toLocaleString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Stockholm",
  });
};
