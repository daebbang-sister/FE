// shared/utils/date.ts
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getOrderDate = (monthAgo: number) => {
  const today = new Date();
  const endDate = formatDate(today);

  const start = new Date(today);
  start.setMonth(start.getMonth() - monthAgo);
  const startDate = formatDate(start);

  return { startDate, endDate };
};
