import { Layout } from "@/components/customer/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './contactSuccess.module.scss'

export default function CheckoutSuccess() {
  const router = useRouter();

  return(
    <Layout>
      <div className={styles.container}>
        <h1>お問合せを受け付けました。</h1>
        <section>
          <h3>お問合せありがとうございます。</h3>
          <p>※ご入力いただいたメールアドレスへお問合せ内容確認メールを送信しました。</p>
          <p>※万が一メールが届かない場合・ご不明な点がございましたらお手数ですが下記までご連絡ください。</p>
          <p>※メアドを記載</p>
        </section>
        <section>
          <div className={styles.contactPageLinkButton}>
            <button onClick={() => router.push('/')}>Topページへ</button>
          </div>
        </section>
      </div>
    </Layout>
  )
}