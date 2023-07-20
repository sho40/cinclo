"use client"
import { Layout } from "@/components/customer/Layout";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartItemListState, CartItem } from "@/atoms/CartAtom"
import styles from "./cart.module.scss"
import { useEffect, useMemo, useState } from "react";
import { CartItemComponent } from "@/components/customer/cart/cartItem/CartItem"
import { numberToPriceCustomer } from "@/logic/numberFormatter";
import { useRouter } from 'next/router';
import { useForm, UseFormSetValue } from 'react-hook-form'
import { formatDateYYYYMMDDForDateForm, formatDateYYYYMMDDForDisplay } from "@/logic/dateFormatter";
import axios from "axios";
import classNames from "classnames";
import { PurchaseInfo, purchaseInfoState } from "@/atoms/PurchaseInfoAtom";

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
  const setPurchaseInfo = useSetRecoilState(purchaseInfoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<PurchaseInfo>()

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // 住所関連
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');

  const getAddress = async (postalCode: string, setValue: UseFormSetValue<PurchaseInfo>) => {
    try {
      const res = await axios.get(
        "https://zipcloud.ibsnet.co.jp/api/search",
        {
          params: {
            zipcode: postalCode
          }
        }
      );
      if (res.data.results) {
        const result = res.data.results[0];
        setValue("city", result.address1) // react hook formで管理しているvalueを更新
        setValue("line1", result.address2 + result.address3) // react hook formで管理しているvalueを更新
        setCity(result.address1);
        setLine1(result.address2 + result.address3)
      }
    } catch (error) {
      alert("住所の取得に失敗しました。")
    }
  }

  useEffect(() => {
    if (postalCode.length === 7) {
      getAddress(postalCode, setValue)
    }

  }, [postalCode]);

  // 指定日時関連
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 4);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);
  const [specifiedArraivalDate, setSpecifiedArraivalDate] = useState(formatDateYYYYMMDDForDateForm(defaultDate));

  const initReturnDate = new Date();
  initReturnDate.setDate(initReturnDate.getDate() + 11)
  const [returnDate, setReturnDate] = useState<Date>(initReturnDate);

  useEffect(() => {
    const nextDate = new Date(specifiedArraivalDate);
    nextDate.setDate(nextDate.getDate() + 7)
    setReturnDate(nextDate);
  }, [specifiedArraivalDate]);

  const handleRemoveItem = (targetItemId: number) => {
    
    const newItemList = cartItems.filter(item => item.id !== targetItemId);
    setCartItems(newItemList)
  }

  const handleConfirmButton = (data: PurchaseInfo) => {
    const returnDateStr = formatDateYYYYMMDDForDateForm(returnDate)
    setPurchaseInfo({...data, returnDate: returnDateStr})
    router.push("/checkout/information/")
  } 

  const [isCartEmpty, serCartEmpty] = useState<boolean>(false)
  useEffect(() => {
    if (cartItems.length < 1) {
      serCartEmpty(true)
    }

  }, [cartItems])

  const totalAmount = calcTotalAmount(cartItems);

  const buttonDisabled = useMemo(() => {
    return Object.keys(errors).length >= 1 || 
      customerName === "" || email === "" || phoneNumber === "" || postalCode === "" || city === "" || line1 === "" || line2 === "" ? true : false
  }, [errors, customerName, email, phoneNumber, postalCode, city, line1, line2]);

  const shippingFeeSuText: string | undefined = useMemo(() => {
    if (cartItems.length < 1) {
      return undefined
    } else if (cartItems.length < 2) {
      return "あと1点で送料半額"
    } else if (cartItems.length < 3) {
      return "あと2点で送料無料"
    } else if (cartItems.length < 4) {
      return "あと1点で送料無料"
    } else {
      return undefined
    }
  }, [cartItems]);

  return (
    <Layout>
      <div className={styles.container}> 
        { 
          isCartEmpty ? (
            <div className={styles.cartEmpty}>
              <div>
                <p>カートの中身は空です</p>
                <div className={styles.goToItems}>
                  <div onClick={() => router.push("/")}>
                    Topへ
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
                  <div><span>{cartItems.length > 3 ? "送料無料" : "送料別"}</span></div>
                </div>
                <div style={{justifyContent: "end"}}>
                  <span className='text-red-400'>
                    {shippingFeeSuText ?? ""}
                  </span>
                </div>
              </div>
              <div>
                <div className={styles.userInfo}>
                  <span>お届け先情報</span>
                </div>
                <form onSubmit={handleSubmit(handleConfirmButton)}>
                  <div>
                    <div>
                      <div className={styles.customerDataArea}>
                        <div>
                          <fieldset>
                            <h4>
                              <span>お名前</span>
                              <span className={styles.error_message}>{errors.customerName?.message}</span>
                            </h4>
                            <input
                              placeholder="フルネームを入力"
                              {...register('customerName', { required: '必須項目です' })}
                              onChange={e => setCustomerName(e.target.value)}
                            />
                          </fieldset>
                        </div>
                        <div>
                          <fieldset>
                            <h4>
                              <span>電話番号</span>
                              <span className={styles.error_message}>{errors.phoneNumber?.message}</span>
                            </h4>
                            <input
                              type='tel'
                              pattern="\d{2,4}-?\d{2,4}-?\d{3,4}"
                              maxLength={11}
                              {...register('phoneNumber', { required: '必須項目です' })}
                              onChange={e => setPhoneNumber(e.target.value)}
                              autoComplete="nope" // ブラウザの自動入力を効かせないためにautoComplete属性に無効な値を入力
                            />
                          </fieldset>
                        </div>
                        <div>
                          <fieldset>
                            <h4>
                              <span>Eメール</span>
                              <span className={styles.error_message}>{errors.email?.message}</span>
                            </h4>
                            <input
                              type='email'
                              {...register('email', { required: '必須項目です' })}
                              onChange={e => setEmail(e.target.value)}
                            />
                          </fieldset>
                        </div>
                        <div>
                          <fieldset>
                            <h4>
                              <span>郵便番号</span>
                              <span className={styles.error_message}>{errors.postalCode?.message}</span>
                            </h4>
                            <input
                              placeholder="ハイフンなしで入力"
                              type='number'
                              maxLength={7}
                              {...register('postalCode', { required: '必須項目です' })}
                              onChange={e => setPostalCode(e.target.value)}
                              autoComplete="nope" // ブラウザの自動入力を効かせないためにautoComplete属性に無効な値を入力
                            />
                          </fieldset>
                        </div>
                        <div>
                          <fieldset>
                            <h4>
                              <span>都道府県</span>
                              <span className={styles.error_message}>{errors.city?.message}</span>
                            </h4>
                            <input
                              type='text'
                              {...register('city', { required: '必須項目です' })}
                              onChange={e => setCity(e.target.value)}
                            />
                          </fieldset>
                        </div>
                        <div>
                          <fieldset>
                            <h4>
                              <span>市区町村</span>
                              <span className={styles.error_message}>{errors.line1?.message}</span>
                            </h4>
                            <input
                              type='text'
                              {...register('line1', { required: '必須項目です' })}
                              onChange={e => setLine1(e.target.value)}
                            />
                          </fieldset>
                        </div>
                        <div>
                          <fieldset>
                            <h4>
                              <span>番地・建物・部屋番号</span>
                              <span className={styles.error_message}>{errors.line2?.message}</span>
                            </h4>
                            <input
                              type='text'
                              {...register('line2', { required: '必須項目です' })}
                              onChange={e => setLine2(e.target.value)}
                            />
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.customerDataArea}>
                    <div className={styles.specifiedArraivalDate}>
                      <fieldset>
                        <p>指定到着日</p>
                        <p className={styles.subText}>本日より4日後が最短のお届け日となります。</p>
                        <input
                          type='date'
                          {...register('specifiedArraivalDate', { required: '必須項目です' })}
                          onChange={e => setSpecifiedArraivalDate(e.target.value)}
                          defaultValue={formatDateYYYYMMDDForDateForm(defaultDate)}
                          min={formatDateYYYYMMDDForDateForm(defaultDate)}
                          max={formatDateYYYYMMDDForDateForm(maxDate)}
                        />
                      </fieldset>
                      <div className={styles.returnDateArea}>
                        <span>{"返却日(伝票日付)"}</span>
                        <span className={styles.returnDate}>{formatDateYYYYMMDDForDisplay(returnDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className={classNames(styles.goToConfirmButton, {
                    [styles.disabled]: buttonDisabled
                  })}>
                    <button type="submit">決済確認画面へ</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
      </div>
    </Layout>
  )
}