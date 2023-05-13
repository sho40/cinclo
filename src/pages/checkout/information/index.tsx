import { cartItemListState } from '@/atoms/CartAtom';
import { Layout } from '@/components/customer/Layout'
import { useRecoilValue } from 'recoil';
import styles from "./information.module.scss"
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

export default function CheckoutInformation() {
  const cartItems = useRecoilValue(cartItemListState);

  return (
    <Layout>
      <div className={styles.container}>
        <PaymentConfirm 
          cartItems={cartItems} 
        />
      </div>
    </Layout>
  )
} 