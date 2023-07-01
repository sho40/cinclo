import { AddressElement, Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";
import styles from './paymentFormContainer.module.scss'
import { formatDateYYYYMMDDForDateForm, formatDateYYYYMMDDForDisplay } from "@/logic/dateFormatter";
import { NextRouter, useRouter } from "next/router";
import { CreateOrderMutationVariables } from "@/libs/apollo/graphql";
import { v4 as uuidv4 } from 'uuid';
import { useSetRecoilState } from "recoil";
import { CartItem, cartItemListState } from "@/atoms/CartAtom"
import { addTax } from "@/logic/numberFormatter";
import { PurchaseInfo } from "@/atoms/PurchaseInfoAtom";
import classNames from "classnames";
import { loadingState } from "@/atoms/LoadingAtom";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY ?? "");

interface PaymentFormContainer {
  cartItems: CartItem[];
  purchaseInfo: PurchaseInfo;
  amount: number; // 税率をかけていない合計金額
  shippingFee: number; // 送料
  createOrderAndUpdateItems: (createOrderVariables: CreateOrderMutationVariables) => Promise<void>;
  toggleDialogShown: () => void;
}

export default function PaymentFormContainer({cartItems, purchaseInfo, amount, shippingFee, createOrderAndUpdateItems, toggleDialogShown}: PaymentFormContainer) {
  const totalAmountIncludesShippingFee: number = Math.floor(addTax(amount) + shippingFee);

  const [piClientSecret, setPiClientSecret] = useState<string>('')
  useEffect(() => {
    fetch('/api/payment_intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmountIncludesShippingFee,
        currency: 'JPY',
      })
    })
    .then(async data => {
      const response = await data.json();
      if (data.ok) return response;
      throw response;
    })
    .then((paymentIntent) => {
      setPiClientSecret(paymentIntent.client_secret)
    })
    .catch (error => window.alert(error.message)) 
  }, [setPiClientSecret, totalAmountIncludesShippingFee]);

  if (!piClientSecret) return <p>Loading...</p>
  return (
    <div className={styles.container}>
      <Elements stripe={stripePromise} options={{ clientSecret: piClientSecret }}>
        <PaymentForm
          cartItems={cartItems}
          purchaseInfo={purchaseInfo}
          amount={totalAmountIncludesShippingFee}
          totalAmountWithoutTax={amount}
          shippingFee={shippingFee}
          createOrderAndUpdateItems={createOrderAndUpdateItems}
          toggleDialogShown={toggleDialogShown}
        />
      </Elements>
    </div>
  )
}

const sendThanksMail = async (
  name: string, 
  emailAddress: string,
  cartItems: CartItem[],
  totalAmountWithoutTax: number, // 税率・送料抜きの金額
  shippingFee: number,
  arraivalDate: string,
  returnDate: string,
  orderId: string,
  zipAddress: string
) => {
  const res = await fetch('/api/rental_success_mail', {
    body: JSON.stringify({
      name: name,
      email: emailAddress,
      cartItems: cartItems,
      totalAmountWithoutTax: totalAmountWithoutTax,
      shippingFee: shippingFee,
      arraivalDate: arraivalDate,
      returnDate: returnDate,
      orderId: orderId,
      zipAddress: zipAddress
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

  if (res.ok) return
}

interface PaymentFormProps {
  cartItems: CartItem[];
  purchaseInfo: PurchaseInfo;
  amount: number; // 税率・送料込みの金額
  totalAmountWithoutTax: number; // 税率・送料抜きの金額
  shippingFee: number; // 送料
  createOrderAndUpdateItems: (createOrderVariables: CreateOrderMutationVariables) => Promise<void>;
  toggleDialogShown: () => void;
}

const PaymentForm = ({cartItems, purchaseInfo, amount, totalAmountWithoutTax, shippingFee, createOrderAndUpdateItems, toggleDialogShown}: PaymentFormProps) => {
  const router = useRouter();
  const setCartItemList = useSetRecoilState(cartItemListState);
  const [isConfirmChecked, setIsConfirmChecked] = useState<boolean>(false);
  const setLoading = useSetRecoilState(loadingState);
  
  const toggleChecked = () => {
    setIsConfirmChecked(!isConfirmChecked);
  }

  const [cardholderName, setCardholderName] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const confirm = window.confirm("決済してもよろしいですか？");

    // 画面にloading表示
    setLoading(true);

    const result = confirm ? await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://cinclo.jp/checkout/success/',
        payment_method_data: {
          billing_details: {
            name: cardholderName,
            address: {
              country: 'JP'
            }
          }
        }
      },
      redirect: 'if_required',
    }) : null;
    if (result == null) return;
    if (result.error) {
      window.alert(result.error.message)
      return
    }
    if (result.paymentIntent) {
      console.log(`注文完了 (order_id: ${result.paymentIntent.id})`)
      const orderId = uuidv4();
      const zipAddress = purchaseInfo.city + purchaseInfo.line1 + purchaseInfo.line2;
      await createOrderAndUpdateItems({
        id: orderId,
        customer_name: purchaseInfo.customerName,
        mail_address: purchaseInfo.email,
        phone_number: purchaseInfo.phoneNumber,
        amount: amount,
        stripe_checkout_id: result.paymentIntent.id,
        specified_date: purchaseInfo.specifiedArraivalDate,
        zip_code: purchaseInfo.postalCode,
        zip_address: zipAddress,
        shipping_fee: shippingFee
      });

      sendThanksMail(
        purchaseInfo.customerName,
        purchaseInfo.email,
        cartItems,
        totalAmountWithoutTax,
        shippingFee,
        purchaseInfo.specifiedArraivalDate,
        purchaseInfo.returnDate, // specifiedArraivalDateと同じYYYY-MM-DDの形式
        orderId,
        zipAddress,
      )

      // カートの中身をクリア
      setCartItemList([]);
      router.push("/checkout/success/");
    } else {
      window.alert(`注文完了`)
    }

    // loading解除
    setLoading(false);
  }

  return (
    <form onSubmit={handleCheckout}>
      <div>
        <div>
          <div className={styles.cardElementArea}>
            <div className={styles.cardholderName}>
              <fieldset>
                <p>カード名義</p>
                <input 
                  type="text" 
                  value={cardholderName} 
                  onChange={e => setCardholderName(e.target.value)}
                  placeholder="TARO YAMADA"
                />
              </fieldset>
            </div>
            <PaymentElement options={{
              fields: {
                billingDetails: {
                  address: {
                    country: "never"
                  }
                }
              }
            }}/>
          </div>
        </div>
      </div>
      <div className={styles.buttonArea}>
        <div className={styles.confirmCheck}>
          <input
            type="checkbox"
            onChange={() => toggleChecked()}
            checked={isConfirmChecked}
          />
          <span onClick={() => toggleDialogShown()} className={styles.termsOfServiceLinkText}>
            利用規約
          </span>
          <span>
            を確認しました。
          </span>
        </div>
        <div className={classNames(styles.checkoutButton, {
          [styles.disabled]: !isConfirmChecked
        })}>
          <button type="submit">決済する</button>
        </div>
        <div className={styles.warnningMessage}>※決済と同時にキャンセル料が発生いたします</div>
      </div>
    </form>
  )
}
