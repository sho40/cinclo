
// 日本標準時で出力
export const stringToDate = (dateStr: string) => {
  const date = new Date(dateStr);

  return date;
}

export const formatDateYYYYMMDDHHmmss = (dateStr: string): string => {
  const displayDate = new Date(dateStr);
  return displayDate.toLocaleString()
}

export const formatDateYYYYMMDD = (dateStr: string): string => {
  const displayDate = new Date(dateStr);
  const y = displayDate.getFullYear();
  const m = displayDate.getMonth();
  const d = displayDate.getDay();
  return `${y}/${m}/${d}`
}