
// 往復の配送料を取得
export const getShippingFee = (prefecture: string): number => {
  switch (prefecture) {
    case "北海道":
      return 3660
    case "青森県":
    case "秋田県":
    case "岩手県":
      return 3000
    case "宮城県":
    case "山形県":
    case "福島県":
    case "茨城県":
    case "栃木県":
    case "群馬県":
    case "埼玉県":
    case "千葉県":
    case "神奈川県":
    case "東京都":
    case "山梨県":
    case "新潟県":
    case "長野県":
    case "富山県":
    case "石川県":
    case "福井県":
    case "静岡県":
    case "愛知県":
    case "三重県":
    case "岐阜県":
      return 2780
    case "大阪府":
    case "京都府":
    case "滋賀県":
    case "奈良県":
    case "和歌山県":
    case "兵庫県":
      return 3000
    case "岡山県":
    case "広島県":
    case "山口県":
    case "鳥取県":
    case "島根県":
    case "香川県":
    case "徳島県":
    case "愛媛県":
    case "高知県":
      return 3220
    case "福岡県":
    case "長崎県":
    case "佐賀県":
    case "熊本県":
    case "大分県":
    case "宮崎県":
    case "鹿児島県":
      return 3660
    case "沖縄県":
      return 4980
    default:
      return 4980
  }
}