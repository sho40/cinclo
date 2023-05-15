import { GetRecommendedItemsForHomeQuery } from "@/libs/apollo/graphql";
import { isValidUrl } from "@/logic/checkUrl";
import { numberToPriceCustomer } from "@/logic/numberFormatter";
import Image from 'next/image';
import Link from "next/link";
import React from "react";
import styles from "./styles/homeItemsContainer.module.scss"

export const HomeItemsContainer = (props: {
  title: string;
  items: GetRecommendedItemsForHomeQuery["items"] | undefined;
}) => {

  return(
    <>
      {
        props.items == null ? (
          <></>
        ) : (
          <div className={styles.container}>
            <div className={`pb-3 ${styles.title}`}><p>{props.title}</p></div>
            <ul className='flex flex-wrap justify-between text-sm'>
              {props.items.map((item, index) => {
                return(
                  <li key={index} className='mb-7' style={{ width: 'calc((100% - 16px) / 2)' }}>
                    {/* TODO リンクを指定する */}
                    <Link href={`/item/detail/${item.id}`}>
                      <div>
                        {item.images != null && item.images.length === 1 && isValidUrl(item.images[0].url) ?
                          // <div className={styles.imageContainer}>
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
                      <p className={styles.count}>{`貸出回数 ${item.current_count} 回`}</p>
                      <div className={styles.priceArea}>
                        <span className='text-red-400'>{item.current_price != null ? numberToPriceCustomer(item.current_price) : ""}</span>
                        <span style={{fontSize: "8px", margin: "0 6px 0 2px"}}>(税込)</span>
                        <span><del>{item.regular_price != null ? numberToPriceCustomer(item.regular_price) : ""}</del></span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className='text-center'>
              {/* TODO リンクにする */}
              <button>
                <div className='rounded-none px-2 py-1' style={{border: "1px solid #111"}}>more...</div>
              </button>
            </div>
          </div>
        )
      }
    </>
  )
}