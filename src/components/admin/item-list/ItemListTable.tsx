import { Items } from "@/libs/apollo/graphql";
import styles from "./itemListTable.module.scss"
import Router from 'next/router'
import { numberToPrice } from "@/logic/numberFormatter";

interface ItemListTableProps {
  items: ({
      __typename?: "items" | undefined;
  } & Pick<Items, "id" | "name" | "regular_price" | "current_price" | "current_count" | "gender" | "can_sale" | "is_rental_available" | "next_lending_date">)[]
}

// FIXME: pagenation
export default function ItemListTable({items}: ItemListTableProps) {

  const goToDetail = (itemId: number) => {
    Router.push(`/admin/item/detail/${itemId}`)
  }

  return (
    <div className={styles.itemListTable}>
      <table>
        <thead>
          <tr className="bg-gray-700 text-white">
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
                    <td>{item.name}</td>
                    <td>{item.gender}</td>
                    <td>{item.current_price && numberToPrice(item.current_price)}</td>
                    <td>{item.regular_price && numberToPrice(item.regular_price)}</td>
                    <td>{item.is_rental_available ? "貸出可" : "貸出不可"}</td>
                    <td>{item.next_lending_date ?? "-"}</td>
                    <td>{item.can_sale ? "可" : "不可"}</td>
                    <td>
                      <div className={styles.detailButton}>
                        <button className='bg-gray-400 text-white' onClick={() => goToDetail(item.id)}>詳細</button>
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