import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY ?? "");

export default function PaymenntFormContainer() {

  const [piClientSecret, setPiClientSecret] = useState<string>('')
  useEffect(() => {
    fetch('/api/payment_intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 700,
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
  }, [setPiClientSecret]);

  if (!piClientSecret) return <p>Loading...</p>
  return (
    <div>
      <h1>決済ページ</h1>
      <Elements stripe={stripePromise} options={{ clientSecret: piClientSecret }}>
        <PaymentForm/>
      </Elements>
    </div>
  )
}

const PaymentForm = () => {
  const [cardholderName, setCardholderName] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const doCheckout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:4200',
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
    })
    if (result.error) {
      window.alert(result.error.message)
      return
    }
    if (result.paymentIntent) {
      window.alert(`注文完了 (order_id: ${result.paymentIntent.id})`)
    } else {
      window.alert(`注文完了`)
    }
  }

  return (
    <form onSubmit={doCheckout}>
      <fieldset>
        <legend>カード所有者</legend>
        <input type="text" value={cardholderName} onChange={e => setCardholderName(e.target.value)}/>
      </fieldset>
      <PaymentElement options={{
        fields: {
          billingDetails: {
            address: {
              country: "never"
            }
          }
        }
      }}/>
      <button type="submit">決済する</button>
    </form>
  )

}