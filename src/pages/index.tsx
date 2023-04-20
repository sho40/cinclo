import { Banner } from '@/components/Banner'
import { Header } from '@/components/Header'
import { HomeItemsContainer } from '@/components/HomeItemsContainer'
import { SlideBunner } from '@/components/SlideBunner'
import { Item } from '@/types/Item.type'

import { gql } from '@apollo/client'
import { useGetItemsTestQuery, useGetRecommendedItemsForHomeQuery } from '../libs/apollo/graphql'

export default function Home() {
  // MEMO _in === gender
  const { data } = useGetItemsTestQuery();
  console.log({data})

  return (
    <>
      <Header />
      <Banner />
      <SexSwitch />
      <SlideBunner />
      <div className='px-2'>
        <Recommend />
        <NewArrival />
      </div>
    </>
  )
}

const SexSwitch = () => {
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
      <HomeItemsContainer items={data?.items} title='おすすめ'/>
    </div>
  )
}

const NewArrival = () => {

  const items: Item[] = [
    {
      id: "1",
      category: "トップス",
      name: "aaa",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 32000,
      currentPrice: 32000,
      rentalCount: 0,
    },
    {
      id: "2",
      category: "ジャケット/スーツ",
      name: "bbb",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 18000,
      currentPrice: 18000,
      rentalCount: 0,
    },
    {
      id: "3",
      category: "パンツ",
      name: "ccc",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 12000,
      currentPrice: 12000,
      rentalCount: 0,
    },
    {
      id: "4",
      category: "スカート",
      name: "ddd",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 10000,
      currentPrice: 10000,
      rentalCount: 0,
    },
    {
      id: "5",
      category: "アウター",
      name: "eee",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 23000,
      currentPrice: 23000,
      rentalCount: 0,
    },
    {
      id: "6",
      category: "トップス",
      name: "fff",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 33000,
      currentPrice: 33000,
      rentalCount: 0,
    }
  ]

  return (
    <div className='py-7'>
      {/* <HomeItemsContainer items={items} title='新着アイテム'/> */}
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
