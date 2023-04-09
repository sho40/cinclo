export const genderFormat = (gender: number): string => {
  if (gender === 1) {
    return "メンズ"
  } else if (gender === 2) {
    return "レディース"
  } else if (gender === 3) {
    return "ユニセックス"
  } else {
    return "不明"
  }
}