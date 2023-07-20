import { Layout } from "@/components/customer/Layout";
import styles from "./guide.module.scss"
import Image from "next/image";
import { useRouter } from 'next/router'
import { useEffect, useRef } from "react";

export default function Guide() {
  const router = useRouter()

  // NOTE: CINCLOについての画像クリックの場合は1が渡される。 買取人ついてのバナークリックで2が渡される。
  const queryKey = router.query["key"];

  const aboutPurchaseElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (queryKey === "2") {
      aboutPurchaseElement.current?.scrollIntoView({
        behavior: "smooth"
      })
    }
  }, [queryKey, aboutPurchaseElement])


  return (
    <Layout>
      <div className={styles.container}>
        <section>
          <h1>
            How to use
          </h1>
        </section>

        <section>
          <p>
            シンクロは弊社おすすめのセレクトブランドを<br />
            1週間レンタルできるサービスになっております。<br />
            さらに、レンタル回数に応じて割引率が変動！
          </p>
        </section>

        <section>
          <div className={styles.guideImage}>
            <table border={1}>
              <tr>
                <td>
                  <div>①</div>
                  <Image src="/guide/guide-1.jpeg" alt="guide1" width={100} height={100}/>
                </td>
                <td>
                  <div>②</div>
                  <Image src="/guide/guide-2.png" alt="guide2" width={100} height={100}/>
                </td>
                <td>
                  <div>③</div>
                  <Image src="/guide/guide-3.jpeg" alt="guide3" width={100} height={100}/>
                </td>
              </tr>
              <tr>
                <td>
                  <div>④</div>
                  <Image src="/guide/guide-4.jpeg" alt="guide4" width={100} height={100}/>
                </td>
                <td>
                  <div>⑤</div>
                  <Image src="/guide/guide-5.jpeg" alt="guide5" width={100} height={100}/>
                </td>
                <td>
                  <div>⑥</div>
                  <Image src="/guide/guide-6.jpeg" alt="guide6" width={100} height={100}/>
                </td>
              </tr>
            </table>
          </div>
        </section>

        <section>
          <h3>①借りたいアイテムを選ぶ</h3>
          <p>
            使用用途に合うようにお好きな服を選ぶ。<br />
            <span>※特にサイズ要チェック</span><br />
            レンタル1回目のアイテムは定価から70%OFFとなっております。<br />
            (例:￥10000→￥3000)<br />
            レンタル毎に前価格の5%OFFとなります。<br />
            (例:￥3000→￥2850)<br />
            2点購入で片道送料無料、4点購入で往復送料無料
          </p>
        </section>

        <section>
          <h3>②サイト内で決済(カード払いのみ)</h3>
          <p>
            当サービスはクレジット決済のみとなります。
            <br />
            {`使用可能カード: VISA,Master`}
            <br />
          </p>
        </section>

        <section>
          <h3>➂ご注文から最短4日でご自宅に発送</h3>
          <div className={styles.shippingFee}>
            <table>
              <tr>
                <th>地方</th>
                <th>県名</th>
                <th>お届け日数</th>
                <th>料金(片道)</th>
              </tr>
              <tr>
                <td>北海道</td>
                <td>北海道</td>
                <td>3日</td>
                <td>1,830</td>
              </tr>
              <tr>
                <td>北東北</td>
                <td>青森<br />秋田<br />岩手</td>
                <td>2日</td>
                <td>1,500</td>
              </tr>
              <tr>
                <td>南東北</td>
                <td>宮城<br />山形<br />福島</td>
                <td>2日</td>
                <td>1,390</td>
              </tr>
              <tr>
                <td>関東</td>
                <td>茨城<br />栃木<br />群馬<br />埼玉<br />千葉<br />神奈川<br />東京<br />山梨</td>
                <td>2日</td>
                <td>1,390</td>
              </tr>
              <tr>
                <td>信越</td>
                <td>新潟<br />長野</td>
                <td>2日</td>
                <td>1,390</td>
              </tr>
              <tr>
                <td>北陸</td>
                <td>富山<br />石川<br />福井</td>
                <td>2日</td>
                <td>1,390</td>
              </tr>
              <tr>
                <td>中部</td>
                <td>静岡<br />愛知<br />三重<br />岐阜</td>
                <td>2日</td>
                <td>1,390</td>
              </tr>
              <tr>
                <td>関西</td>
                <td>大阪<br />京都<br />滋賀<br />奈良<br />和歌山<br />兵庫</td>
                <td>2日</td>
                <td>1,500</td>
              </tr>
              <tr>
                <td>中国</td>
                <td>岡山<br />広島<br />山口<br />鳥取<br />島根</td>
                <td>3日</td>
                <td>1,610</td>
              </tr>
              <tr>
                <td>四国</td>
                <td>香川<br />徳島<br />愛媛<br />高知</td>
                <td>3日</td>
                <td>1,610</td>
              </tr>
              <tr>
                <td>九州</td>
                <td>福岡<br />佐賀<br />長崎<br />熊本<br />大分<br />宮崎<br />鹿児島</td>
                <td>3日</td>
                <td>1,830</td>
              </tr>
              <tr>
                <td>沖縄</td>
                <td>沖縄</td>
                <td>3日</td>
                <td>2,490</td>
              </tr>
            </table>
          </div>
        </section>

        <section>
          <h3>④送られてきた箱に返送</h3>
          <p>
            お送りした際の箱をそのまま返送にご使用下さい。<br />
            箱の紛失・破損の場合はお客様自身で<br />
            ご用意の上返送をお願い致します。<br />
            返送用の伝票は同梱させて頂いております。
          </p>
        </section>

        <section>
          <h3>⑤延滞について</h3>
          <p>
            延滞１日につきレンタル料金の１０％をご請求致します。
            <br />
            例:￥10000円→￥1000/日
            <br />
            レンタル7日目の23時59分までに返送のお手続きを完了ください。
            <br />
            伝票日付で確認させて頂きます。
            <br />
            後日メールにてご請求書を送付致します。
          </p>
        </section>

        <section>
          <h3>⑥破損について</h3>
          <p>
            基本的にはレンタルアイテムの為、<br />
            経年劣化を加味したサービスとなっております。<br />
            ただし返送品を確認した際、著しい破損の場合修繕費(委託先に出していただくお見積額)をご請求致します。<br />
            破損パターン例<br />
            シミ・破れ・ファスナー・装飾・焦げ等<br />
          </p>
        </section>

        <section>
          <div ref={aboutPurchaseElement}>
            <h3>secret</h3>
            <p>
              レンタル回数10回を終えたアイテムはお買い上げ可能となり、<br />
              その際の価格は最終購入価格となります。<br />
              定価の約80%OFF!!
            </p>
          </div>
        </section>
      </div>
    </Layout>
  )
}