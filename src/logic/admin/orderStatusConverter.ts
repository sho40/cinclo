export const orderStatusConverter = (status: number): string => {
  switch (status) {
    case 0:
      return "発送準備中"
    case 1:
      return "返送待ち"
    case 2:
      return "延滞金支払い待ち"
    case 3:
      return "受取り済"
    default:
      return "未定義ステータス"
  }
}