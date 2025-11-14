
export const dateToDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  // Calculate difference in milliseconds, accounting for timezone differences between the date and the start of the year
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};
