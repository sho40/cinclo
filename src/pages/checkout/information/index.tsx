import { cartItemListState } from '@/atoms/CartAtom';
import { Layout } from '@/components/customer/Layout'
import { useRecoilValue } from 'recoil';
import styles from "./information.module.scss"
import PaymentConfirm from '@/components/customer/checkout/paymentConfirm/PaymentConfirm';
import { gql } from '@apollo/client';
import { CreateOrderMutationVariables, useCreateOrderItemRelationMutation, useCreateOrderMutation, useGetRecommendedItemsForHomeQuery, useUpdateItemsByOrderMutation } from '@/libs/apollo/graphql';
import { calcTotalAmount } from '@/pages/cart';
import { v4 as uuidv4 } from 'uuid';

// FIXME: 仮置き
export type CheckoutInfo = {
  lastName: string;
  firstName: string;
  zipCode: string;
  email: string;
  tellNumber: string;
  address1: string;
  address2: string;
  address3: string;
  addressOption?: string;
}

/**
 * 注文に伴い更新する金額を算出する 
 * 
 * 更新後のレンタルカウントが15回目未満の場合は、現在価格 * 0.9
 * 15回目の場合は、* 0.5
 * 16回目以上は変更しない
 * 小数点が発生する場合は、小数点第一位を切り上げする。
*/
const updateItemPrice = (currentPrice: number, nextCount: number): number => {
  if (nextCount < 15) {
    const nextPrice = currentPrice * 0.95;
    return Math.ceil(nextPrice);
  } else if (nextCount === 15) {
    const nextPrice = currentPrice * 0.5;
    return Math.ceil(nextPrice);
  } else {
    return currentPrice
  }
}

export default function CheckoutInformation() {
  const cartItems = useRecoilValue(cartItemListState);
  const [createOrderRecord] = useCreateOrderMutation();
  const [createOrderItemRelationRecord] = useCreateOrderItemRelationMutation();
  const [updateItemsByOrder] = useUpdateItemsByOrderMutation();
  
  const totalAmount = calcTotalAmount(cartItems);
  // FIXME: 配送料定義から取得
  const shippingFee = 1400;
  // FIXME: 金額は四捨五入か？

  useGetRecommendedItemsForHomeQuery()

  const createOrderAndUpdateItems = async (
    createOrderVariables: CreateOrderMutationVariables
  ) => {

    // TODO: refetchQueriesする？
    await createOrderRecord({variables: createOrderVariables});

    cartItems.forEach(async (cartItem) => {
      const orderItemRelationRecordId = uuidv4();
      // amountは税率が掛かって言うない価格
      await createOrderItemRelationRecord({variables: {
        id: orderItemRelationRecordId,
        order_id: createOrderVariables.id,
        amount: cartItem.current_price,
        count: cartItem.current_count,
        item_id: cartItem.id
      }});
    });
    
    cartItems.forEach(async (cartItem) => {
      const nextCount = cartItem.current_count + 1;
      // Itemを更新する
      await updateItemsByOrder({variables: {
        id: cartItem.id,
        current_count: nextCount,
        current_price: updateItemPrice(cartItem.current_price, nextCount),
        can_sale: nextCount === 15,
        next_lending_date: null
      }});
    });
  
  }


  return (
    <Layout>
      <div className={styles.container}>
        <PaymentConfirm 
          cartItems={cartItems} 
          createOrderAndUpdateItems={createOrderAndUpdateItems}
        />
      </div>
    </Layout>
  )
} 

gql`
  mutation UpdateItemsByOrder($id: Int!, $can_sale: Boolean = false, $current_price: Int = 10, $next_lending_date: timestamptz = "", $current_count: Int = 10) {
    update_items_by_pk(pk_columns: {id: $id}, _set: {can_sale: $can_sale, current_price: $current_price, is_rental_available: false, next_lending_date: $next_lending_date, current_count: $current_count}) {
      id
      can_sale
      current_count
      current_price
      is_rental_available
      next_lending_date
    }
  }
`

gql`
  mutation CreateOrder($amount: Int, $customer_name: String, $id: String, $mail_address: String, $phone_number: String, $stripe_checkout_id: String, $specified_date: String) {
    insert_orders_one(object: {amount: $amount, customer_name: $customer_name, id: $id, mail_address: $mail_address, phone_number: $phone_number, stripe_checkout_id: $stripe_checkout_id, specified_date: $specified_date}) {
      id
    }
  }
`

gql`
  mutation CreateOrderItemRelation($id: String, $order_id: String, $amount: Int, $count: Int, $item_id: Int) {
    insert_order_item_relations_one(object: {id: $id, order_id: $order_id, amount: $amount, count: $count, item_id: $item_id}) {
      id
    }
  }
`