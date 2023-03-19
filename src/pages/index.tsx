import { Banner } from '@/components/Banner'
import { Header } from '@/components/Header'
import { SlideBunner } from './SlideBunner'


export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <SexSwitch />
      <SlideBunner />
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