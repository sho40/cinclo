import { getLayout } from "@/components/admin/layout";
import PageTitle from "@/components/admin/pageTitle/PageTitle";
import { useGetOrderDetailQuery } from "@/libs/apollo/graphql";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import styles from './orderDetail.module.scss'
import { formatDateYYYYMMDDHHmmss } from "@/logic/dateFormatter";
import { numberToPrice } from "@/logic/numberFormatter";

export default function OrderDetail() {

  const router = useRouter();
  const { id } = router.query;
  const {data, loading} = useGetOrderDetailQuery({variables: {id: id as string}});
  const orderDetail = data?.orders_by_pk
  
  if (loading) return <div>...loading</div>
  if (orderDetail == null) return <></>

  return (
    <>
      <PageTitle title='注文詳細'/>
      <div className={styles.container}>
        <div className={styles.basicInfoArea}>
          <div className='bg-gray-200'>
            <table>
              <caption className='bg-gray-700 text-white pl-2'>注文情報</caption>
              <tbody>
                <tr>
                  <th>stripe_id</th>
                  <td>
                    {orderDetail.stripe_checkout_id}
                  </td>
                </tr>
                <tr>
                  <th>合計金額</th>
                  <td className={styles.description}>
                    {numberToPrice(orderDetail.amount)}
                  </td>
                </tr>
                <tr>
                  <th>注文日</th>
                  <td>
                    {formatDateYYYYMMDDHHmmss(orderDetail.created_at)}
                  </td>
                </tr> 
                <tr>
                  <th>顧客名</th>
                  <td>
                    {orderDetail.customer_name}
                  </td>
                </tr> 
                <tr>
                  <th>メアド</th>
                  <td>
                    {orderDetail.mail_address}
                  </td>
                </tr> 
                <tr>
                  <th>電話番号</th>
                  <td>{orderDetail.phone_number}</td>
                </tr> 
                <tr>
                  <th>郵便番号</th>
                  <td>{orderDetail.zip_code}</td>
                </tr> 
                <tr>
                  <th>住所</th>
                  <td>{orderDetail.zip_address}</td>
                </tr> 
                <tr>
                  <th>指定日</th>
                  <td>{orderDetail.specified_date}</td>
                </tr> 
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.rentalInfoArea}>
          {orderDetail.items.map((item, index) => {
            const orderedItem = item.item;
            return (
              <div className='bg-gray-200' key={index}>
                <table>
                  <caption className='bg-gray-700 text-white pl-2'>{`商品情報 ${index + 1}`}</caption>
                  <tbody key={index}>
                      <tr>
                        <th>商品名</th>
                        <td>
                          {orderedItem?.name}
                        </td>
                      </tr>
                      <tr>
                        <th>定価</th>
                        <td>
                          {orderedItem?.regular_price != null ? numberToPrice(orderedItem.regular_price): ""}
                        </td>
                      </tr>
                      <tr>
                        <th>性別</th>
                        <td>
                          {orderedItem?.gender}
                        </td>
                      </tr>
                      <tr>
                        <th>詳細</th>
                        <div className={styles.detailButton}>
                          <button 
                            className='bg-gray-400 text-white' 
                            onClick={() => router.push(`/admin/item/detail/${orderedItem?.id}`) /* notnullなので必ず存在する */}
                          >商品詳細</button>
                        </div>
                      </tr>
                    </tbody>
                  </table>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

OrderDetail.getLayout = getLayout

gql`
  query getOrderDetail($id: String!) {
    orders_by_pk(id: $id) {
      amount
      created_at
      customer_name
      id
      mail_address
      phone_number
      specified_date
      stripe_checkout_id
      items {
        item {
          name
          regular_price
          gender
          id
        }
        amount
        count
      }
      zip_address
      zip_code
    }
  }
`