import PageTitle from "@/components/admin/pageTitle/PageTitle";
import { useGetOrderListQuery } from "@/libs/apollo/graphql";
import { gql } from "@apollo/client";
import styles from './orderList.module.scss'
import { numberToPrice } from "@/logic/numberFormatter";
import { formatDateYYYYMMDDHHmmss } from "@/logic/dateFormatter";
import { getLayout } from "@/components/admin/layout";
import Router from 'next/router'

export default function OrderList() {

  const { data, loading } = useGetOrderListQuery();
  const items = data?.orders;
  const convertOrderStatus = (status: number) => {
    switch (status) {
      case 0:
        return "発送待ち"
      case 1:
        "返送待ち"
      default:
        "不明"
    }
  }

  return (
    <div>
      <PageTitle title='注文一覧'/>
      {
        loading ? 
          <>...Loading</>
          :
          <div className={styles.itemListTable}>
            <table>
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th>id</th>
                  <th>合計金額</th>
                  <th>指定日</th>
                  <th>stripe_id</th>
                  <th>ステータス</th>
                  <th>注文日時</th>
                  <th>詳細</th>
                </tr>
              </thead>
              <tbody>
                {
                  items == null || items.length < 1 ? 
                    <div>データがありません</div> 
                    : 
                    items.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.amount && numberToPrice(item.amount)}</td>
                          <td>{item.specified_date}</td>
                          <td>{item.stripe_checkout_id}</td>
                          <td>{item.order_status && convertOrderStatus(item.order_status)}</td>
                          <td>{item.created_at ? formatDateYYYYMMDDHHmmss(item.created_at) : "-"}</td>
                          <td>
                            <div className={styles.detailButton}>
                              <button 
                                className='bg-gray-400 text-white' 
                                onClick={() => Router.push(`/admin/order-detail/${item.id}`) /* notnullなので必ず存在する */}
                              >注文詳細</button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                }
              </tbody>
            </table>
          </div>
      }
    </div>
  )
}

OrderList.getLayout = getLayout

gql`
  query GetOrderList {
    orders(order_by: {created_at: desc}) {
      id
      amount
      specified_date
      stripe_checkout_id
      created_at
      order_status
    }
  }
`