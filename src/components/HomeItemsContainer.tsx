import { GetRecommendedItemsForHomeQuery, GetNewArrivalItemsQuery } from "@/libs/apollo/graphql";
import React from "react";
import styles from "./styles/homeItemsContainer.module.scss"
import { ItemCard } from "./customer/item-card/ItemCard";

export const HomeItemsContainer = (props: {
  title: string;
  items: GetRecommendedItemsForHomeQuery["items"] | GetNewArrivalItemsQuery["items"] | undefined;
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
                    <ItemCard item={item}/>
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