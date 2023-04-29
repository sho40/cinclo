
export const numberToPrice = (number: number) => {
  return new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'}).format(number)
}

/**
 * カスタマ画面用に税率10%をかけて表示
 * @param number DBに保存されているprice
 * @returns フォーマットされた税率込みの金額
 */
export const numberToPriceCustomer = (number: number) => {
  const priceWithTax = number * 1.1
  return new Intl.NumberFormat('ja-JP', {style: 'currency', currency: 'JPY'}).format(priceWithTax)
}

// 消費税10%
const TAX_RATE = 1.1

export const addTax = (number: number) => {
  return number * TAX_RATE
}
