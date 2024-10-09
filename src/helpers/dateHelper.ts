export const isToday = (date: Date) => {
  const today = new Date();

  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffInTime = date.getTime() - today.getTime();
  const diffInDay = diffInTime / (24 * 60 * 60 * 1000);
  if (diffInDay == 0) {
    return 'Today';
  } else if (diffInDay == 1) {
    return 'Tomorrow';
  } else if (diffInDay == -1) {
    return 'Yesterday';
  } else {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
};
