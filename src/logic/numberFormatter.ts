
export const numberToPrice = (number: number) => {
  return new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'}).format(number)
}
