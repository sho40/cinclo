import { checkoutInformationContext, useCheckoutInformation } from "@/hooks/useCheckoutInformation";
import { useContext, useEffect } from "react";
import { Layout } from '@/components/customer/Layout'
import { cartItemListState, CartItem } from "@/atoms/CartAtom"
import { CartItemComponent } from "../../cart/cartItem/CartItem";
import styles from "./paymentConfirm.module.scss"
import { CheckoutInfo } from "@/pages/checkout/information";
import { addTax, numberToPrice, numberToPriceCustomer } from "@/logic/numberFormatter";
import { CustomerInfoConfirm } from "@/components/customer/checkout/customerInfoConfirm/CustomerInfoConfirm"
import { calcTotalAmount } from "@/pages/cart";

interface PaymentConfirmProps {
  cartItems: CartItem[];
  customerInfo: CheckoutInfo;
  onChangeEditView: () => void;
}

export default function PaymentConfirm({cartItems, customerInfo, onChangeEditView}: PaymentConfirmProps) {

  console.log({customerInfo})
  const totalAmount = calcTotalAmount(cartItems);

  const shippingFee = 700;

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [])
  return (
    <div className={styles.container}>
      <div>
        <div>
          <CustomerInfoConfirm customerInfo={customerInfo} onChangeEditView={onChangeEditView} shippingFee={shippingFee}/>
        </div>
        <div className={styles.rentalItemsArea}>
          <div className={styles.title}>
            <span>レンタル商品</span>
          </div>
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
          <div className={styles.checkoutButton}>
            <div onClick={() => {}}>
              決済する
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}