import {
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "./loading.module.scss"

export const LoadingContainer = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faSpinner} spin/>
      </div>
    </div>
  )
}
