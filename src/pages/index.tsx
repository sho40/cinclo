import { HomeItemsContainer } from '@/components/HomeItemsContainer'
import { SlideBunner } from '@/components/slideanner/SlideBanner'

import { gql } from '@apollo/client'
import { useGetRecommendedItemsForHomeQuery, useGetNewArrivalItemsQuery, useGetAllItemCountQuery, useGetAllItemListQuery } from '../libs/apollo/graphql'
import { Layout } from '@/components/customer/Layout'
import { ItemCard } from '@/components/customer/item-card/ItemCard'
import styles from "./home.module.scss"

export default function Home() {
  // MEMO _in === gender
  return (
    <>
      <Layout>
      {/* <GenderSwitch /> */}
      <SlideBunner />
      {/* <div className='px-2'>
        <Recommend />
      </div>
      <div className='px-2'>
        <NewArrival />
      </div> */}
      <div>
        <AllItems />
      </div>
      </Layout>
    </>
  )
}

const GenderSwitch = () => {
  return(
    <div className='flex justify-center py-5'>
      <div className='px-4'>
        <button>
          ALL
        </button>
      </div>
      <div className='px-4'>
        <button>
          WOMEM
        </button>
      </div>
      <div className='px-4'>
        <button>
          MEN
        </button>
      </div>
    </div>
  )
}
// TODO: とりあえず一覧画面には全商品出す

// const Recommend = () => {
//   const { data } = useGetRecommendedItemsForHomeQuery({variables : {limit: 6, _in: [1, 2, 3]}});

//   return(
//     <div className='py-7'>
//       <HomeItemsContainer items={data?.items} title='Recommend'/>
//     </div>
//   )
// }

// const NewArrival = () => {
//   const { data } = useGetNewArrivalItemsQuery({variables : {limit: 6, _in: [1, 2, 3]}});

//   return (
//     <div className='py-7'>
//       <HomeItemsContainer items={data?.items} title='New Arrival'/>
//     </div>
//   )
// }

const AllItems = () => {
  const itemCount = useGetAllItemCountQuery();
  const allItemCount: number = itemCount.data?.items_aggregate.aggregate?.count ?? 0;

  const { data, loading } = useGetAllItemListQuery();

  return (
    <div className='py-7'>
      <div className={styles.title}>
        <h1>
          {`ALL ITEMS`}
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
      </div>
    </div>
  )
}

gql`
  query GetRecommendedItemsForHome($limit: Int, $_in: [Int!]) {
    items(limit: $limit, where: {gender: {_in: $_in}, is_recommend: {_eq: true}}, order_by: {current_price: asc}) {
      current_count
      current_price
      id
      images(limit: 1) {
        id
        url
        item_id
      }
      name
      next_lending_date
      regular_price
    }
  }
`

gql`
  query GetNewArrivalItems($limit: Int, $_in: [Int!]) {
    items(limit: $limit, order_by: {created_at: desc}, where: {gender: {_in: $_in}}) {
      current_count
      current_price
      id
      images(limit: 1) {
        id
        url
        item_id
      }
      name
      next_lending_date
      regular_price
    }
  }
`

gql`
  query GetHomeBannerImages {
    home_banners(order_by: {display_index: asc}, where: {delete_flg: {_eq: false}}) {
      id
      url
    }
  }
`