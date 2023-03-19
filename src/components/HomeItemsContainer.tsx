import { numberToPrice } from "@/logic/numberFormatter";
import { Item } from "@/types/Item.type";
import Link from "next/link";

export const HomeItemsContainer = (props: {
  title: string;
  items: Item[];
}) => {
  return(
    <div>
      <div className='pb-3 text-base'>{props.title}</div>
      <ul className='flex flex-wrap justify-between text-sm'>
        {props.items.map((item, index) => {
          return(
            <li key={index} className='mb-7' style={{ width: 'calc((100% - 16px) / 2)' }}>
              {/* TODO リンクを指定する */}
              <Link href='/'>
                {/* TODO 画像を表示する */}
                <div className='bg-gray-400 mb-1' style={{height: '190px'}}></div>
                <p>{item.brand}</p>
                <div>
                  <span className='mr-4'><del>{numberToPrice(item.basePrice)}</del></span>
                  <span className='text-red-400 font-bold'>{numberToPrice(item.currentPrice)}</span>
                </div>
                <p>{`貸出回数 ${item.rentalCount} 回`}</p>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className='text-center'>
        {/* TODO リンクにする */}
        <button>
          <div className='rounded-none px-2 py-1' style={{border: "1px solid #111"}}>もっと見る</div>
        </button>
      </div>
    </div>
  )
}