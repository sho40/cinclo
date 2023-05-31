import { Layout } from "@/components/customer/Layout";
import { ItemCard } from "@/components/customer/item-card/ItemCard";
import { Items, useGetAllItemCountQuery, useGetItemListByLimitQuery } from "@/libs/apollo/graphql";
import { gql } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./itemList.module.scss"

const ITEM_FETCH_LIMIT_PER_ONCE = 10;

export default function ItemList() {

  const { data } = useGetAllItemCountQuery();
  const allItemCount: number = useMemo(() => {
    if (data?.items_aggregate.aggregate != null) {
      return data.items_aggregate.aggregate.count
    } else {
      return 0
    }
  }, [data?.items_aggregate.aggregate]);
  

  const [items, setItems] = useState<Partial<Items>[]>([]);

  const [offset, setOffset] = useState(0);

  const [hasMore, setHasMore] = useState(true);

  const { fetchMore } = useGetItemListByLimitQuery();

  const getItem = async () => {
    const {data, loading} = await fetchMore({
      variables: { limit: ITEM_FETCH_LIMIT_PER_ONCE, offset }
    })
    if (!loading && data != null) {
      setItems([...items, ...data.items]);
      setOffset(data.items.length);

      // 取得してきたデータがリミット数よりも下回っていたら終了する。
      if (data.items.length < ITEM_FETCH_LIMIT_PER_ONCE) {
        setHasMore(false)
      }
    } else {
      setHasMore(false)
    }
  }

  const loader =<div className="loader" key={0}>Loading ...</div>;

  // 初回ロード
  useEffect(() => {
    getItem();
  }, []);

  console.log("item-list", items )
  return (
    <Layout>
      <div className={styles.title}>
        <h1>
          {`全てのアイテム (${allItemCount}件)`}
        </h1>
      </div>
      <div className={styles.container}>
        <InfiniteScroll
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
        </InfiniteScroll>
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
