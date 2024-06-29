function extractTime(dateString) {
  const date = new Date(dateString);
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}

function getTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""}`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
  if (minutes > 0) return `${minutes} min${minutes > 1 ? "s" : ""}`;
  return `${seconds} sec${seconds > 1 ? "s" : ""}`;
}

export { getTimeAgo };


export { extractTime };
