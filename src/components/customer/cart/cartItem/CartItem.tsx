import Image from 'next/image';
import styles from "./cartItem.module.scss"
import { numberToPriceCustomer } from "@/logic/numberFormatter";
import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from '@/utils/IconButton';
import { CartItem } from "@/atoms/CartAtom"

interface CartItemProps {
  item: CartItem;
  canDelete: boolean;
  handleRemoveItem?: (deleteTargetItemId: number) => void;
}

const discountPercentCalc = (currentPrice: number, regularPrice: number) => {
  return `${ ( 1 - (currentPrice / regularPrice) ) * 100 }%`
}

export const CartItemComponent = ({item, canDelete, handleRemoveItem}: CartItemProps) => {
  const displayImageurl = item.images.length > 0 ? item.images[0].url : undefined;

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemImage}>
        {
          displayImageurl != null ? (
            <Image src={displayImageurl} alt="itemImage" width={70} height={0}/>
          ) : (
            <div>NO IMAGE</div>
          )
        }
      </div>
      <div className={styles.itemDetail}>
        {
          canDelete && handleRemoveItem != null ? (
            <div className={styles.deleteIcon}>
              <IconButton onClick={() => {handleRemoveItem(item.id)}} icon={faXmark}/>
            </div>
          ) : (
            <></>
          )
        }
        <div className={styles.itemName}>
          <p>{item.name}</p>
        </div>
        <div className={styles.brandName}>
          {item.brand?.name != null ? (
            <p>{item.brand?.name ?? ""}</p>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.price}>
          <span className={styles.currentPrice}>{numberToPriceCustomer(item.current_price)}</span>
          <span className={styles.discountInfo}>{item.regular_price != null ? `(${discountPercentCalc(item.current_price, item.regular_price)}引き)` : ""}</span>
        </div>
      </div>
    </div>
  )
}