/* eslint-disable @typescript-eslint/no-explicit-any */
// dateUtils.js

// 날짜를 yyyy-MM-dd 형식으로 변환하는 함수
export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // "yyyy-MM-dd" 형식
};

// 월을 yyyy-MM 형식으로 변환하는 함수 (월을 두 자리로 맞춤)
export const getYearMonth = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-based (0 = January, 11 = December)
  return `${year}-${month < 10 ? `0${month}` : month}`; // '2024-01', '2024-11' 형식
};

// 선택된 월에 맞는 데이터 필터링
export const filterDataByMonth = (
  data: any[],
  selectedDate: Date
): any[] => {
  const selectedYearMonth = getYearMonth(selectedDate);
  return data.filter((item) => {
    const itemYearMonth = getYearMonth(new Date(formatDate(item.createAt || item.date)));
    return itemYearMonth === selectedYearMonth;
  });
};

// 데이터에서 고유한 월들을 생성 (중복 제거)
export const generateMonthOptions = (data: any[]): string[] => {
  const uniqueMonths = new Set(
    data.map((item) => getYearMonth(new Date(formatDate(item.createAt || item.date))))
  );
  return Array.from(uniqueMonths).sort().reverse(); // 최신 월부터 표시
};

// 날짜를 기준으로 정렬 (최신순, 오래된순)
export const sortDataByDate = (
  data: any[],
  sortOrder: 'latest' | 'oldest'
): any[] => {
  return [...data].sort((a, b) => {
    const dateA = new Date(formatDate(a.createAt || a.date)).getTime();
    const dateB = new Date(formatDate(b.createAt || b.date)).getTime();

    if (sortOrder === 'latest') {
      return dateB - dateA; // 내림차순
    } else {
      return dateA - dateB; // 오름차순
    }
  });
};
