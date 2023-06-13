import { useEffect } from "react";
import { CartItem } from "@/atoms/CartAtom"
import { CartItemComponent } from "../../cart/cartItem/CartItem";
import styles from "./paymentConfirm.module.scss"
import { addTax, numberToPrice, numberToPriceCustomer } from "@/logic/numberFormatter";
import { calcTotalAmount } from "@/pages/cart";
import PaymentFormContainer from "../paymentForm/PaymentFormContainer";
import { CreateOrderMutationVariables } from "@/libs/apollo/graphql";

interface PaymentConfirmProps {
  cartItems: CartItem[];
  createOrderAndUpdateItems: (createOrderVariables: CreateOrderMutationVariables) => Promise<void>;
}

export default function PaymentConfirm({cartItems, createOrderAndUpdateItems}: PaymentConfirmProps) {

  const totalAmount = calcTotalAmount(cartItems);

  // FIXME: 配送料定義から取得
  const shippingFee = 1400;

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [])
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.rentalItemsArea}>
          <h2>レンタル内容確認</h2>
          <div className={styles.cartItemList}>
            {cartItems.map((item, index) => {
              return (
                <div key={index}>
                  <CartItemComponent item={item} canDelete={false}/>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <div>
            <div className={styles.amountArea}>
              <div>
                <div><span>小計</span></div>
                <div>
                  <span>{numberToPriceCustomer(totalAmount)}</span>
                  <span style={{fontSize: "8px", paddingLeft: "2px"}}>{"(税込)"}</span>
                </div>
              </div>
              <div>
                <div><span>送料</span></div>
                <div><span>{numberToPrice(shippingFee)}</span></div>
              </div>
              <div className={styles.totalAmountRow}>
                <p>合計金額</p>
                <p className={styles.totalAmount}>{numberToPrice(addTax(totalAmount) + shippingFee)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formArea}>
          <h2>決済・配送情報の入力</h2>
          <PaymentFormContainer
            cartItems={cartItems}
            amount={totalAmount} 
            shippingFee={shippingFee}
            createOrderAndUpdateItems={createOrderAndUpdateItems}
          />
        </div>
      </div>
    </div>
  )
}