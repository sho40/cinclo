import { useEffect } from "react";
import { CartItem } from "@/atoms/CartAtom"
import { CartItemComponent } from "../../cart/cartItem/CartItem";
import styles from "./paymentConfirm.module.scss"
import { addTax, numberToPrice, numberToPriceCustomer } from "@/logic/numberFormatter";
import { calcTotalAmount } from "@/pages/cart";
import PaymentFormContainer from "../paymentForm/PaymentFormContainer";
import { CreateOrderMutationVariables } from "@/libs/apollo/graphql";
import { PurchaseInfo } from "@/atoms/PurchaseInfoAtom";

interface PaymentConfirmProps {
  cartItems: CartItem[];
  purchaseInfo: PurchaseInfo;
  shippingFee: number;
  createOrderAndUpdateItems: (createOrderVariables: CreateOrderMutationVariables) => Promise<void>;
  toggleDialogShown: () => void;
}

export default function PaymentConfirm({cartItems, purchaseInfo, shippingFee, createOrderAndUpdateItems, toggleDialogShown}: PaymentConfirmProps) {

  const totalAmount = calcTotalAmount(cartItems);

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
                <div><span>{shippingFee === 0 ? "送料無料" : numberToPrice(shippingFee)}</span></div>
              </div>
              <div className={styles.totalAmountRow}>
                <p>合計金額</p>
                <p className={styles.totalAmount}>{numberToPrice(addTax(totalAmount) + shippingFee)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.purchaseInfoArea}>
          <h2>お届けに関する情報</h2>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>お名前</th>
                  <td>{`${purchaseInfo.customerName} 様`}</td>
                </tr>
                <tr>
                  <th>お届け場所</th>
                  <td>{`${purchaseInfo.city} ${purchaseInfo.line1} ${purchaseInfo.line2}`}</td>
                </tr>
                <tr>
                  <th>電話暗号</th>
                  <td>{`${purchaseInfo.phoneNumber}`}</td>
                </tr>
                <tr>
                  <th>メールアドレス</th>
                  <td>{`${purchaseInfo.email}`}</td>
                </tr>
                <tr>
                  <th>指定到着日</th>
                  <td>{`${purchaseInfo.specifiedArraivalDate}`}</td>
                </tr>
                <tr>
                  <th>返却日</th>
                  <td>{`${purchaseInfo.returnDate}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.formArea}>
          <h2>決済情報の入力</h2>
          <PaymentFormContainer
            cartItems={cartItems}
            purchaseInfo={purchaseInfo}
            amount={totalAmount} 
            shippingFee={shippingFee}
            createOrderAndUpdateItems={createOrderAndUpdateItems}
            toggleDialogShown={toggleDialogShown}
          />
        </div>
      </div>
    </div>
  )
}