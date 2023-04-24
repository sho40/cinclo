import { Banner } from '@/components/Banner'
import { Header } from '@/components/header/Header'
import { HomeItemsContainer } from '@/components/HomeItemsContainer'
import { SlideBunner } from '@/components/slideanner/SlideBanner'

import { gql } from '@apollo/client'
import { useGetItemsTestQuery, useGetRecommendedItemsForHomeQuery } from '../libs/apollo/graphql'
import Footer from '@/components/footer/Footer'
import { Layout } from '@/components/customer/Layout'

export default function Home() {
  // MEMO _in === gender
  const { data } = useGetItemsTestQuery();
  console.log({data})
  return (
    <>
      <Layout>
      <GenderSwitch />
      <SlideBunner />
      <div className='px-2'>
        <Recommend />
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

const Recommend = () => {
  const { data } = useGetRecommendedItemsForHomeQuery({variables : {limit: 6, _in: [1, 2, 3]}});

  return(
    <div className='py-7'>
      <HomeItemsContainer items={data?.items} title='おすすめアイテム'/>
    </div>
  )
}

gql`
  query getItemsTest {
    items {
      id
      name
    }
  }
`

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
  query GetHomeBannerImages {
    home_banners(order_by: {display_index: asc}, where: {delete_flg: {_eq: false}}) {
      id
      url
    }
  }
`