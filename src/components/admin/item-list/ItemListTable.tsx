import { Items } from "@/libs/apollo/graphql";
import styles from "./itemListTable.module.scss"
import Router from 'next/router'
import { numberToPrice } from "@/logic/numberFormatter";
import { formatDateYYYYMMDD } from "@/logic/dateFormatter"
import { genderFormat } from "@/logic/genderFormatter"
import Image from 'next/image';


interface ItemListTableProps {
  items: Partial<Items>[]
}

// FIXME: pagenation
export default function ItemListTable({items}: ItemListTableProps) {

  const goToDetail = (itemId: number) => {
    Router.push(`/admin/item/detail/${itemId}`)
  }

  const isValidUrl = (url: string | undefined | null) => {
    try {
      if (url == null) {
        return false
      }

      new URL(url)
      return true
    } catch(error) {
      return false
    }
  }

  return (
    <div className={styles.itemListTable}>
      <table>
        <thead>
          <tr className="bg-gray-700 text-white">
            <th>画像</th>
            <th>商品名</th>
            <th>性別</th>
            <th>現在価格</th>
            <th>定価</th>
            <th>貸出状況</th>
            <th>次回貸出可能日</th>
            <th>販売可能フラグ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            items.length < 1 ? 
              <div>データがありません</div> 
              : 
              items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {
                        // FIXME: Imageタグを使えるようにする。 同じ画像名で保存すると上書きされてしまうので対処する。
                        item.images && item.images?.length > 0 && item.images[0] != null && isValidUrl(item.images[0].url) ? 
                          <img src={item.images[0].url} alt="" width={"70px"} height={"70px"}/>
                          // <Image src={item.images[0].url} alt="" width={100} height={100}/>
                          :
                          <div style={{
                            height: "70px"
                          }} />
                      }
                    </td>
                    <td>{item.name}</td>
                    <td>{genderFormat(item.gender!) /* notnullなので必ずある */}</td>
                    <td>{item.current_price && numberToPrice(item.current_price)}</td>
                    <td>{item.regular_price && numberToPrice(item.regular_price)}</td>
                    <td>{item.is_rental_available ? "貸出可" : "貸出不可"}</td>
                    <td>{item.next_lending_date ? formatDateYYYYMMDD(item.next_lending_date) : "-"}</td>
                    <td>{item.can_sale ? "可" : "不可"}</td>
                    <td>
                      <div className={styles.detailButton}>
                        <button className='bg-gray-400 text-white' onClick={() => goToDetail(item.id!) /* notnullなので必ずある */}>詳細</button>
                      </div>
                    </td>
                  </tr>
                )
              })
          }
        </tbody>
      </table>
    </div>
  )
} 