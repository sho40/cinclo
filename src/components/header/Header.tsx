import {
  faBars,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import styles from './header.module.scss'

import {
  faHeart
} from "@fortawesome/free-regular-svg-icons"
import { IconButton } from '@/utils/IconButton';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.menuDrawer}>
          <IconButton onClick={() => {console.log("clicked")}} icon={faBars}/>
        </div>
        <div className={styles.serviceName}>
          <h1>CINCLO</h1>
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