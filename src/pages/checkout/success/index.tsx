import { Layout } from "@/components/customer/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './success.module.scss'

export default function CheckoutSuccess() {
  const router = useRouter();

  return(
    <Layout>
      <div className={styles.container}>
        <h1>レンタルありがとうございます</h1>
        <section>
          <h3>お支払い手続きが完了しました。</h3>
          <p>※ご入力いただいたメールアドレスへレンタル受付メールを送信しました。</p>
          <p>※レンタルについての詳細はメールにてご確認ください。</p>
          <p>※万が一メールが届かない場合・ご不明な点がございましたらお問合せページよりお問合せください。</p>
        </section>
        <section>
          <div className={styles.contactPageLinkButton}>
            <button onClick={() => router.push('/contact')}>お問合せページへ</button>
          </div>
        </section>
      </div>
    </Layout>
  )
}