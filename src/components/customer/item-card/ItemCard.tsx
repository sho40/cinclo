import { Items } from "@/libs/apollo/graphql"
import styles from "./itemCard.module.scss"
import { isValidUrl } from "@/logic/checkUrl"
import Image from 'next/image';
import { numberToPriceCustomer } from "@/logic/numberFormatter";
import { useRouter } from "next/router";

interface ItemCardProps {
  item: Partial<Items>
}

export const ItemCard = ({item}: ItemCardProps) => {
  const router = useRouter();
  return (
    <div className={styles.container} onClick={() => router.push(`/item/detail/${item.id}`)}>
      {!item.is_rental_available ? 
        <div className={styles.mask}>
          <p>Coming soon...</p>
        </div>
        :
        <></>
      }
      <div>
        {item.images != null && item.images.length > 0 && isValidUrl(item.images[0].url) ?
          <div className={styles.itemImage}>
            <Image src={item.images[0].url} alt="" fill/>
          </div> 
          :
          <div className={`bg-gray-400 mb-1 ${styles.itemImage}` } >
            <div className={styles.noImage}>
              <p>NO IMAGE</p>
            </div>
          </div>
        }
      </div>
      <p className={styles.itemName}>{item.name}</p>
      <p className={styles.count}>{`レンタル ${item.current_count} 回目`}</p>
      <div className={styles.priceArea}>
        <span className='text-red-400'>{item.current_price != null ? numberToPriceCustomer(item.current_price) : ""}</span>
        <span style={{fontSize: "8px", margin: "0 6px 0 2px"}}>(税込)</span>
        <span><del>{item.regular_price != null ? numberToPriceCustomer(item.regular_price) : ""}</del></span>
      </div>
    </div>
  )
}