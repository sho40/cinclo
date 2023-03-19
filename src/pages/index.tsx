import { Banner } from '@/components/Banner'
import { Header } from '@/components/Header'
import { SlideBunner } from '@/components/SlideBunner'


export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <SexSwitch />
      <SlideBunner />
      <div className='px-5'>
        <NewArrival />
      </div>
    </>
  )
}

const SexSwitch = () => {
  return(
    <div className='flex justify-center py-5'>
      <div className='pr-4'>
        <button>
          MEN
        </button>
      </div>
      <div className='pl-4'>
        <button>
          WOMEM
        </button>
      </div>
    </div>
  )
}

type NewItem = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

const NewArrival = () => {

  const items: NewItem[] = [
    {
      id: "1",
      name: "aaa",
      imageUrl: "",
      price: 32000
    },
    {
      id: "2",
      name: "bbb",
      imageUrl: "",
      price: 18000
    },
    {
      id: "3",
      name: "ccc",
      imageUrl: "",
      price: 12000
    },
    {
      id: "4",
      name: "ddd",
      imageUrl: "",
      price: 10000
    },
    {
      id: "5",
      name: "eee",
      imageUrl: "",
      price: 23000
    }
  ]

  return (
    <div className='py-7'>
      <div className='pb-3'>新着アイテム</div>
      <div className='flex flex-wrap justify-start'>
        {items.map((item, index) => {
          return (
            <div key={index} style={{ width: "110px" }} className='ml-1'>
              <div className='bg-gray-400' style={{ height: "150px" }}>{item.imageUrl}</div>
              <div className='pt-2'>¥{item.price}</div>
            </div>
          )
        })}
      </div>
      <div className='pt-4 text-center'>
        <button>
          <div className='rounded-none px-2 py-1' style={{border: "1px solid #111"}}>詳細を見る</div>
        </button>
      </div>
    </div>
  )
}