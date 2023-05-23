import Image from 'next/image';
import styles from "./cartItem.module.scss"
import { numberToPrice, numberToPriceCustomer } from "@/logic/numberFormatter";
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
  return `${ Math.floor(( 1 - (currentPrice / regularPrice) ) * 100) }%`
}

const getDiscountAmount = (currentPrice: number, regularPrice: number) => {
  return regularPrice - currentPrice
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
          <div><span className={styles.currentPrice}>{numberToPrice(item.current_price)}</span></div>
          <span className={styles.discountInfo}>{item.regular_price != null ? `(${discountPercentCalc(item.current_price, item.regular_price)}off)` : ""}</span>
          <span>{` -`}</span>
          <span style={{fontSize: "12px",}} className='text-red-400'>{item.regular_price != null ? `${numberToPrice(getDiscountAmount(item.current_price, item.regular_price))} (レンタル${item.current_count}回目割引)`: ""}</span>
        </div>
      </div>
    </div>
  )
}