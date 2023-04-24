import {
  faBars,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import styles from './header.module.scss'

import {
  faHeart
} from "@fortawesome/free-regular-svg-icons"
import { IconButton } from '@/utils/IconButton';
import Link from "next/link";

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.menuDrawer}>
          <IconButton onClick={() => {console.log("clicked")}} icon={faBars}/>
        </div>
        <div className={styles.serviceName}>
          <Link href="/">
            <h1>CINCLO</h1>
          </Link>
        </div>
        <div className={styles.icons}>
          <div className='pr-4'>
            <IconButton onClick={() => {console.log("clicked")}} icon={faHeart}/>
          </div>
          <div>
            <IconButton onClick={() => {console.log("clicked")}} icon={faCartShopping}/>
          </div>
        </div>
      </div>
    </div>
  )
}