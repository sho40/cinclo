import { Banner } from '@/components/Banner'
import { Header } from '@/components/Header'
import { HomeItemsContainer } from '@/components/HomeItemsContainer'
import { SlideBunner } from '@/components/SlideBunner'
import { Item } from '@/types/Item.type'


export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <SexSwitch />
      <SlideBunner />
      <div className='px-5'>
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

  const items: Item[] = [
    {
      id: "1",
      category: "トップス",
      name: "aaa",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 32000,
      currentPrice: 4500,
      rentalCount: 5,
    },
    {
      id: "2",
      category: "ジャケット/スーツ",
      name: "bbb",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 18000,
      currentPrice: 2000,
      rentalCount: 6,
    },
    {
      id: "3",
      category: "パンツ",
      name: "ccc",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 12000,
      currentPrice: 1000,
      rentalCount: 8,
    },
    {
      id: "4",
      category: "スカート",
      name: "ddd",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 10000,
      currentPrice: 2000,
      rentalCount: 6,
    },
    {
      id: "5",
      category: "アウター",
      name: "eee",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 23000,
      currentPrice: 14000,
      rentalCount: 5,
    },
    {
      id: "6",
      category: "トップス",
      name: "fff",
      brand: "BEAMS",
      imageUrl: "",
      basePrice: 33000,
      currentPrice: 18000,
      rentalCount: 4,
    }
  ]

  return(
    <div className='py-7'>
      <HomeItemsContainer items={items} title='おすすめ'/>
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
      <HomeItemsContainer items={items} title='新着アイテム'/>
    </div>
  )
}
