import { Layout } from "@/components/customer/Layout";
import styles from "./legalNotice.module.scss"

export default function LegalNotice() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>特定商取引法に基づく表記</h1>
        </div>
        <ul>
          <li>
            <h3>販売業社名</h3>
            <p>SELECT SHOP SoLuNa</p>
          </li>
          <li>
            <h3>運営統括責任者</h3>
            <p>田中 廉</p>
          </li>
          <li>
            <h3>所在地</h3>
            <p>埼玉県飯能市双柳802-113</p>
          </li>
          <li>
            <h3>お客様サポート窓口</h3>
            <p></p>
          </li>
          <li>
            <h3>販売価格</h3>
            <p>各商品ごとに表示</p>
          </li>
          <li>
            <h3>販売数量</h3>
            <p>在庫切れの場合は、随時メール・電話にてご連絡させていただきます。</p>
          </li>
          <li>
            <h3>商品以外の必要代金</h3>
            <p>■ レンタル商品の返送料</p>
            <p>■ 購入済み商品の配送料</p>
            <p>■ 破損品の配送料・別途クリーニング代</p>
            <p>■ 弊社指定の返送方法以外の方法で返送する場合の送料</p>
            <p>■ 商品紛失等の際の違約金</p>
          </li>
          <li>
            <h3>お支払方法</h3>
            <p>クレジットカード</p>
          </li>
          <li>
            <h3>引き渡し時期</h3>
            <p>最短で申込み日を含む4日となります。※地域や受付時刻によって異なります。</p>
          </li>
          <li>
            <h3>返品等の対応</h3>
            <p>■ お届けした商品の不備（品違い等）を除くお客様都合の返品は、お受けできません。</p>
            <p>■ 商品お引渡し時点における商品の不備が発生した場合は、返品をお受けいたします。</p>
          </li>
        </ul>
      </div>
    </Layout>
  )
}