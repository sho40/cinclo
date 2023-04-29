import { cartItemListState } from '@/atoms/CartAtom';
import { Layout } from '@/components/customer/Layout'
import { useRecoilValue } from 'recoil';
import styles from "./information.module.scss"
import { CartItemComponent } from '@/components/customer/cart/cartItem/CartItem';
import { useForm, UseFormSetValue } from 'react-hook-form'
import { useEffect, createContext, useContext, useState } from "react";
import axios from "axios";
import { checkoutInformationContext } from '@/hooks/useCheckoutInformation';
import { useRouter } from 'next/router';
import PaymentConfirm from '@/components/customer/checkout/paymentConfirm/PaymentConfirm';

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

// TODO: API Routeへ移管
const getAddress = (query: string, setAddress: UseFormSetValue<CheckoutInfo>) => {

  axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${query}`)
  .then((res) => {

    if (res.status !== 200) {
      throw new Error("api error");
    } else {

      if (res.data.results == null) {
        console.log("address not found")
        return
      }

      const result = res.data.results[0];
      setAddress("address1", result.address1 as string)
      setAddress("address2", result.address2 as string)
      setAddress("address3", result.address3 as string)

    }
  }).catch((error) => {
    console.log("データ取得失敗", error)
  })
}

const PageType = {
  Information: "information",
  PaymentConfirm: "paymentConfirm"
}
type CheckoutPageType = typeof PageType[keyof typeof PageType];

export default function CheckoutInformation() {
  const cartItems = useRecoilValue(cartItemListState);
  const checkoutInfoCtx = useContext(checkoutInformationContext);
  const [pageType, setPageType] = useState<CheckoutPageType>(PageType.Information);
  const [customerInfo, setCustomerInfo] = useState<CheckoutInfo | undefined>(undefined);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutInfo>();

  const saveCheckoutInfo = (data: CheckoutInfo) => {
    console.log({data})
    checkoutInfoCtx.setInfo(data);
    setCustomerInfo(data);
    setPageType(PageType.PaymentConfirm);
    // router.push("/checkout/paymentConfirm/")
  }

  const inputZipCode: string | undefined = watch("zipCode")
  useEffect(() => {
    if (inputZipCode != null && inputZipCode.length === 7) {
      getAddress(inputZipCode, setValue)
    }

  }, [inputZipCode, setValue])

  return (
    <Layout>
      <div className={styles.container}>
        {
          pageType === PageType.Information ? (
            <>
              <div>
                <div>
                  <h1>
                    お届けに関する情報を入力してください
                  </h1>
                </div>
                <form onSubmit={handleSubmit(saveCheckoutInfo)}>
                  <div>
                    <div className={styles.title}>
                      <span>連絡先</span>
                    </div>
                    <div className={styles.inputBox}>
                      <div>
                        <span>Eメール</span>
                        <span className='text-red-400 ml-2'>{errors.email?.message}</span>
                      </div>
                      <input
                        {...register(
                          'email', { 
                          required: '必須項目です',
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "不正な形式です"
                          }
                        })}
                        type='email'
                      />
                    </div>
                  </div>
                  <div>
                    <div className={styles.title}>
                      <span>配送先</span>
                    </div>
                    <div className={styles.inputBox}>
                      <div>
                        <span>姓</span>
                        <span className='text-red-400 ml-2'>{errors.lastName?.message}</span>
                      </div>
                      <input
                        {...register(
                          'lastName', { 
                          required: '入力してください',
                        })}
                        type='text'
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <div>
                        <span>名</span>
                        <span className='text-red-400 ml-2'>{errors.firstName?.message}</span>
                      </div>
                      <input
                        {...register(
                          'firstName', { 
                          required: '入力してください',
                        })}
                        type='text'
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <div>
                        <span>郵便番号</span>
                        <span className='text-red-400 ml-2'>{errors.zipCode?.message}</span>
                      </div>
                      <input
                        {...register(
                          'zipCode', { 
                          required: '入力してください',
                          maxLength: 7
                        })}
                        type='number'
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <div>
                        <span>都道府県</span>
                        <span className='text-red-400 ml-2'>{errors.address1?.message}</span>
                      </div>
                      <input
                        {...register(
                          'address1', { 
                          required: '入力してください',
                        })}
                        type='text'
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <div>
                        <span>市区町村</span>
                        <span className='text-red-400 ml-2'>{errors.address2?.message}</span>
                      </div>
                      <input
                        {...register(
                          'address2', { 
                          required: '入力してください',
                        })}
                        type='text'
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <div>
                        <span>住所</span>
                        <span className='text-red-400 ml-2'>{errors.address3?.message}</span>
                      </div>
                      <input
                        {...register(
                          'address3', { 
                          required: '入力してください',
                        })}
                        type='text'
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <p>建物名、部屋番号など</p>
                      <input
                        {...register(
                          'addressOption',
                        )}
                        type='text'
                        placeholder='該当する場合のみ入力してください'
                      />
                    </div>
                    <div className={styles.inputBox}>
                      <div>
                        <span>電話番号</span>
                        <span className='text-red-400 ml-2'>{errors.tellNumber?.message}</span>
                      </div>
                      <input
                        {...register(
                          'tellNumber', { 
                            required: '入力してください',
                          }
                        )}
                        type='number'
                      />
                    </div>
                  </div>
                  <div className={styles.goCheckoutButton}>
                    <button type='submit'>
                      確認画面へ進む
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div>
              {
                customerInfo != null ? (
                  <PaymentConfirm 
                    cartItems={cartItems} 
                    customerInfo={customerInfo}
                    onChangeEditView={() => setPageType(PageType.Information)}
                  />
                ) : (
                  <></>
                )
              }
            </div>
          )
        }
        
      </div>
    </Layout>
  )
} 