import { Layout } from "@/components/customer/Layout";
import styles from "./fleaMarket.module.scss"

export default function FleaMarket() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>古物営業法に基づく表示</h1>
        </div>
        <section>
          <p>■古物商許可証番号</p>
          <p>東京都公安委員会 第号</p>
        </section>
      </div>
    </Layout>
  )
}