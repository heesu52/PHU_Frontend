export const getYearMonth = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-based (0 = January, 11 = December)
  return `${year}-${month + 1}`; // '2024-11' 형식
};

export const filterDataByMonth = (
  data: any[],
  selectedDate: Date
): any[] => {
  const selectedYearMonth = getYearMonth(selectedDate);
  return data.filter((item) => {
    const itemYearMonth = getYearMonth(new Date(item.chartDate || item.date)); // item.chartDate or item.date
    return itemYearMonth === selectedYearMonth;
  });
};

export const generateMonthOptions = (data: any[]): string[] => {
  const uniqueMonths = new Set(
    data.map((item) => getYearMonth(new Date(item.chartDate || item.date))) // item.chartDate or item.date
  );
  return Array.from(uniqueMonths).sort().reverse(); // 최신 월부터 표시
};

export const sortDataByDate = (
  data: any[],
  sortOrder: 'latest' | 'oldest'
): any[] => {
  return [...data].sort((a, b) => {
    const dateA = new Date(a.chartDate || a.date).getTime(); // a.chartDate or a.date
    const dateB = new Date(b.chartDate || b.date).getTime(); // b.chartDate or b.date

    if (sortOrder === 'latest') {
      return dateB - dateA; // 내림차순
    } else {
      return dateA - dateB; // 오름차순
    }
  });
};
