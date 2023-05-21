"use client"
import { Layout } from "@/components/customer/Layout";
import { useRecoilState } from "recoil";
import { cartItemListState, CartItem } from "@/atoms/CartAtom"
import styles from "./cart.module.scss"
import { useEffect, useState } from "react";
import { CartItemComponent } from "@/components/customer/cart/cartItem/CartItem"
import { numberToPriceCustomer } from "@/logic/numberFormatter";
import { useRouter } from 'next/router';

export const calcTotalAmount = (items: CartItem[]) => {
  let total: number = 0;

  items.forEach(item => {
    total += item.current_price
  }) 

  return total
}

export default function Cart() {

  const router = useRouter();
  const [cartItems, setCartItems] = useRecoilState(cartItemListState);

  const handleRemoveItem = (targetItemId: number) => {
    
    const newItemList = cartItems.filter(item => item.id !== targetItemId);
    console.log("deleted newItemList", newItemList)
    setCartItems(newItemList)
  }

  const [isCartEmpty, serCartEmpty] = useState<boolean>(false)
  useEffect(() => {
    if (cartItems.length < 1) {
      serCartEmpty(true)
    }

  }, [cartItems])

  const totalAmount = calcTotalAmount(cartItems);

  return (
    <Layout>
      <div className={styles.container}> 
        { 
          isCartEmpty ? (
            <div className={styles.cartEmpty}>
              <div>
                <p>カートの中身は空です</p>
                <div className={styles.goToItems}>
                  <div onClick={() => {}}>
                    商品ページへ
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div className={styles.title}>
                  <span>カート内商品</span>
                </div>
                <div className={styles.cartItemList}>
                  {cartItems.map((item, index) => {
                    return (
                      <div key={index}>
                        <CartItemComponent item={item} canDelete={true} handleRemoveItem={handleRemoveItem}/>
                      </div>
                    )
                  })}
                </div>
              </div>
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
                  <div><span>送料別</span></div>
                </div>
              </div>
              <div>
                <div className={styles.goToPurchaseFormButton}>
                  <div onClick={() => {router.push("/checkout/information/")}}>
                    決済確認画面へ
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </Layout>
  )
}