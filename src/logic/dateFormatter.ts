
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
  const d = displayDate.getDate();
  return `${y}/${m + 1}/${d}`
}

export const formatDateYYYYMMDDForDateForm = (date: Date) => {
  const y = date.getFullYear();
  const m = ("0" + (date.getMonth() + 1)).slice(-2)
  const d = ("0" + date.getDate()).slice(-2)

  return `${y}-${m}-${d}`
}