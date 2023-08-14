import { getLayout } from "@/components/admin/layout";
import PageTitle from "@/components/admin/pageTitle/PageTitle";
import { UpdateOrderStatusMutationVariables, useGetOrderDetailQuery, useUpdateOrderStatusMutation } from "@/libs/apollo/graphql";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import styles from './orderDetail.module.scss'
import { formatDateYYYYMMDDForDateForm, formatDateYYYYMMDDHHmmss } from "@/logic/dateFormatter";
import { numberToPrice } from "@/logic/numberFormatter";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { orderStatusConverter } from "@/logic/admin/orderStatusConverter";
import { AdditionalChargeDialog } from "@/components/admin/additionalChargeDialog/additionalChargeDialog";

const ConfirmDialog = (props: {
  children: ReactNode;
  onClose: () => void;
}) => {

  const dialogContainerElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = dialogContainerElement.current
    if (dialogContainerElement != null && container != null) {
    }
  })

  return (
    <>
      <div className={styles.overlay}/>
      <div className={styles.dialogContainer} ref={dialogContainerElement}>
        <div>{props.children}</div>
        <div className={styles.closeButton} onClick={props.onClose}>
          <button>close</button>
        </div>
      </div>
    </>
  )
}

export default function OrderDetail() {

  const router = useRouter();
  const { id } = router.query;
  const {data, loading} = useGetOrderDetailQuery({variables: {id: id as string}});
  const orderDetail = data?.orders_by_pk;

  const returnDate = useMemo(() => {
    if (orderDetail == null) {
      return null;
    }
    const specifiedDate = orderDetail.specified_date != null ? new Date(orderDetail.specified_date) : null;
    if (specifiedDate != null) {
      specifiedDate.setDate(specifiedDate.getDate() + 7)
      return specifiedDate;
    } else {
      return null
    }
  }, [orderDetail]);

  const [updateStatus] = useUpdateOrderStatusMutation();

  const onUpdateOrderStatus = async (id: string, status: number) => {

    const params: UpdateOrderStatusMutationVariables = {
      id: id,
      order_status: status
    }

    try {
      await updateStatus({variables: params})
    } catch (error) {
      console.log({error})
    }
  }

  const [isDialogShown, setDialogShown] = useState<boolean>(false);
  const toggleDialogShown = () => {
    setDialogShown(!isDialogShown)
  }
  
  if (loading) return <div>...loading</div>
  if (orderDetail == null) return <></>

  // 配送料含まない合計金額
  const totalAmount = orderDetail.items.reduce((acc, currentItem) => acc + currentItem.amount, 0);

  return (
    <>
      <PageTitle title='注文詳細'/>
      <div className={styles.container}>
        <div className={styles.buttonArea}>
          <div className={styles.additionalChargeMailArea}>
            <div className={styles.additionalChargeMailButton}>
              <button onClick={() => toggleDialogShown()}>延滞金請求</button>
            </div>
          </div>
          <div className={styles.actionButtonArea}>
            <div className={styles.prepare}>
              <button onClick={() => onUpdateOrderStatus(orderDetail.id, 0)}>発送準備中にする</button>
            </div>
            <div className={styles.shipped}>
              <button onClick={() => onUpdateOrderStatus(orderDetail.id, 1)}>発送済にする</button>
            </div>
            <div className={styles.penalty}>
              <button onClick={() => onUpdateOrderStatus(orderDetail.id, 2)}>延滞金支払い待ちにする</button>
            </div>
            <div className={styles.recieved}>
              <button onClick={() => onUpdateOrderStatus(orderDetail.id, 3)}>商品受取り済にする</button>
            </div>
          </div>
        </div>
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
                  <th>{`合計金額(配送料含む)`}</th>
                  <td className={styles.description}>
                    {numberToPrice(orderDetail.amount)}
                  </td>
                </tr>
                <tr>
                  <th>配送料</th>
                  <td>
                    {orderDetail.shipping_fee != null ? numberToPrice(orderDetail.shipping_fee) : "-"}
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
                  <th>メールアドレス</th>
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
                <tr>
                  <th>返却日</th>
                  <td>{returnDate != null ? formatDateYYYYMMDDForDateForm(returnDate) : ""}</td>
                </tr> 
                <tr>
                  <th>ステータス</th>
                  <td>{orderStatusConverter(orderDetail.order_status)}</td>
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
      {isDialogShown ? 
        <ConfirmDialog onClose={() => setDialogShown(false)}>
          <AdditionalChargeDialog 
            customerName={orderDetail.customer_name} 
            mailAddress={orderDetail.mail_address} 
            returnDate={returnDate != null ? formatDateYYYYMMDDForDateForm(returnDate) : ""} 
            totalAmount={totalAmount}
            closeDialog={() => setDialogShown(false)}
          />
        </ConfirmDialog> 
        : <></>
      }
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
      order_status
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
      shipping_fee
    }
  }
`

gql`
  mutation UpdateOrderStatus($id: String!, $order_status: Int) {
    update_orders_by_pk(pk_columns: {id: $id}, _set: {order_status: $order_status}) {
      id
      order_status
    }
  }
`
