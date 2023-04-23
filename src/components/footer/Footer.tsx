import { IconButton } from "@/utils/IconButton";
import Link from "next/link";
import {
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./footer.module.scss"


export default function Footer() {
  return (
    <>
      <div className={styles.container}>
        <ul>
          <li className={styles.serviceName}>
            <p>CINCLO</p>
          </li>
          <li>
            <ul className={styles.links}>
              <li>
                <Link href="/">お問い合わせ</Link>
              </li>
              <li>
                <Link href="/">特定商法取引法に基づく表記</Link>
              </li>
              <li>
                <Link href="/">プライバシーポリシー</Link>
              </li>
              <li>
                <Link href="/">セキュリティーポリシー</Link>
              </li>
              <li>
                <Link href="/">利用規約</Link>
              </li>
              <li>
                <Link href="/">古物営業法に基づく表示</Link>
              </li>
            </ul>
          </li>
          <li className= {styles.snsIcon}>
            <IconButton onClick={() => {console.log("clicked")}} icon={faInstagram as IconDefinition}/>
          </li>
        </ul>
      </div>
      <div className={styles.copyright}>
        <span>&copy;</span>
        <span>2023,</span>
        <span>SELECT SHOP SoLuNa</span>
      </div>
    </>
  )
}