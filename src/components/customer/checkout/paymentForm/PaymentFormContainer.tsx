import { AddressElement, Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";
import styles from './paymentFormContainer.module.scss'
import { formatDateYYYYMMDDForDateForm, formatDateYYYYMMDDForDisplay } from "@/logic/dateFormatter";
import { useRouter } from "next/router";
import { CartItem } from "@/atoms/CartAtom"
import { CreateOrderMutationVariables } from "@/libs/apollo/graphql";
import { v4 as uuidv4 } from 'uuid';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY ?? "");

interface PaymentFormContainer {
  cartItems: CartItem[];
  amount: number;
  createOrderAndUpdateItems: (createOrderVariables: CreateOrderMutationVariables) => Promise<void>;
}

export default function PaymentFormContainer({cartItems, amount, createOrderAndUpdateItems}: PaymentFormContainer) {

  const [piClientSecret, setPiClientSecret] = useState<string>('')
  useEffect(() => {
    fetch('/api/payment_intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
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
  }, [setPiClientSecret, amount]);

  if (!piClientSecret) return <p>Loading...</p>
  return (
    <div className={styles.container}>
      <Elements stripe={stripePromise} options={{ clientSecret: piClientSecret }}>
        <PaymentForm 
          cartItems={cartItems} 
          amount={amount}
          createOrderAndUpdateItems={createOrderAndUpdateItems}
        />
      </Elements>
    </div>
  )
}

interface CustomerInfo {
  email: string;
  phoneNumber: string;
}

// cincloAPI用
interface CheckoutInfo {
  name: string;
  amount: number;
  email: string;
  phoneNumber: string;
  stripe_checkout_id: string;
}

interface PaymentFormProps {
  cartItems: CartItem[];
  amount: number;
  createOrderAndUpdateItems: (createOrderVariables: CreateOrderMutationVariables) => Promise<void>;
}

const PaymentForm = ({cartItems, amount, createOrderAndUpdateItems}: PaymentFormProps) => {
  const router = useRouter();

  const [cardholderName, setCardholderName] = useState('');
  const [customerName, setCustomerName] = useState('');
  
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const confirm = window.confirm("決済してもよろしいですか？")
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
      await createOrderAndUpdateItems({
        id: orderId,
        customer_name: customerName,
        mail_address: email,
        phone_number: phoneNumber,
        amount: amount,
        stripe_checkout_id: result.paymentIntent.id,
        specified_date: specifiedArraivalDate,
      });
      router.push("/checkout/success/")
    } else {
      window.alert(`注文完了`)
    }
  }

  return (
    <form onSubmit={handleCheckout}>
      <div>
        <div>
          <div className={styles.customerDataArea}>
            <div className={styles.phoneNumber}>
              <fieldset>
                <p>電話番号</p>
                <input
                  type='tel'
                  pattern="\d{2,4}-?\d{2,4}-?\d{3,4}"
                  maxLength={11}
                  required
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </fieldset>
            </div>
            <div className={styles.email}>
              <fieldset>
                <p>Eメール</p>
                <input
                  type='email'
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </fieldset>
            </div>
            <AddressElement 
              options={{
                mode: 'shipping',
                allowedCountries: ['JP'],
              }}
              onChange={e => {
                if (e.complete) {
                  setCustomerName(e.value.name)
                }
              }}
            />
          </div>
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
      <div className={styles.customerDataArea}>
        <div className={styles.specifiedArraivalDate}>
          <fieldset>
            <p>指定到着日</p>
            <p className={styles.subText}>本日より4日後が最短のお届け日となります。</p>
            <input
              type='date'
              required
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
      <div className={styles.checkoutButton}>
        <button type="submit">決済する</button>
      </div>
    </form>
  )
}
