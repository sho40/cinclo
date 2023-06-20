import { Layout } from "@/components/customer/Layout";
import { ItemCard } from "@/components/customer/item-card/ItemCard";
import { Items, useGetAllItemCountQuery, useGetItemListByLimitQuery, useGetAllItemListQuery } from "@/libs/apollo/graphql";
import { gql } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./itemList.module.scss"

const ITEM_FETCH_LIMIT_PER_ONCE = 10;

export default function ItemList() {

  const itemCount = useGetAllItemCountQuery();
  const allItemCount: number = itemCount.data?.items_aggregate.aggregate?.count ?? 0;

  // const [items, setItems] = useState<Partial<Items>[]>([]);

  // const [offset, setOffset] = useState(0);

  // const [hasMore, setHasMore] = useState(true);

  // const { fetchMore } = useGetItemListByLimitQuery();
  const { data, loading } = useGetAllItemListQuery();

  // const getItem = async () => {
  //   // const {data, loading} = await fetchMore({
  //   //   variables: { limit: ITEM_FETCH_LIMIT_PER_ONCE, offset }
  //   // })
  //   if (!loading && data != null) {
  //     setItems((prevItems) => [...prevItems, ...data.items]);
  //     // setOffset(items.length);

  //     // 取得してきたデータが0件の時はスクロール終了。
  //     // if (data.items.length === 0) {
  //     //   setHasMore(false)
  //     // }
  //   }
  // }

  const loader =<div className="loader" key={0}>Loading ...</div>;

  // 初回ロード
  // useEffect(() => {
  //   getItem();
  // }, []);


  // TODO: 無限スクロール
  // 初回データ取得
  // 総件数取得
  // スクロール実装したコンポーネントに渡す
  // 初回データを初期値にセットした上でスクロール時に追加データを取得する。

  return (
    <Layout>
      <div className={styles.title}>
        <h1>
          {`全てのアイテム (${allItemCount}件)`}
        </h1>
      </div>
      <div className={styles.container}>
        {loading ? <>loading ...</> : (
          <ul className='flex flex-wrap justify-between text-sm'>
            {data?.items.map((item, index) => 
              <li key={index} className='mb-7' style={{ width: 'calc((100% - 16px) / 2)' }}>
                <ItemCard item={item}/>
              </li>
            )}
        </ul>
        )}
        {/* <InfiniteScroll
          dataLength={items.length}
          next={getItem}
          hasMore={hasMore}
          loader={loader}
        >
          <ul className='flex flex-wrap justify-between text-sm'>
            {items.map((item, index) => 
              <li key={index} className='mb-7' style={{ width: 'calc((100% - 16px) / 2)' }}>
                <ItemCard item={item}/>
              </li>
            )}
          </ul>
        </InfiniteScroll> */}
        {/* <ul className='flex flex-wrap justify-between text-sm'>
          {data.items.map((item, index) => 
            <li key={index} className='mb-7' style={{ width: 'calc((100% - 16px) / 2)' }}>
              <ItemCard item={item}/>
            </li>
          )}
        </ul> */}
      </div>

    </Layout>
  )
}

gql`
  query GetAllItemCount {
    items_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
`

gql`
  query GetItemListByLimit($limit: Int, $offset: Int) {
    items(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
      current_count
      current_price
      id
      gender
      images(limit: 1) {
        id
        url
      }
      name
      next_lending_date
      regular_price
    }
  }
`

gql`
  query GetAllItemList {
    items(order_by: {created_at: desc}) {
      current_count
      current_price
      id
      gender
      images {
        id
        url
      }
      name
      next_lending_date
      regular_price
      display_index
      is_rental_available
    }
  }
`
