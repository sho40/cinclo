import { numberToPrice } from "@/logic/numberFormatter";
import { CheckoutInfo } from "@/pages/checkout/information";
import styles from "./customerInfoConfirm.module.scss"
import { calcTotalAmount } from "@/pages/cart";

interface CustomerInfoConfirmProps {
  customerInfo: CheckoutInfo;
  onChangeEditView: () => void;
  shippingFee: number;
}

export const CustomerInfoConfirm = ({customerInfo, onChangeEditView, shippingFee}: CustomerInfoConfirmProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>お届け情報</p>
        <p className={styles.editLink} onClick={() => onChangeEditView()}>変更</p>
      </div>
      <div className={styles.row}>
        <p>連絡先</p>
        <p>{customerInfo.email}</p>
      </div>
      <div className={styles.row}>
        <p>配送先</p>
        <p>{`〒${customerInfo.zipCode}`}</p>
        <span>{customerInfo.address1}</span>
        <span>{customerInfo.address2}</span>
        <span>{customerInfo.address3}</span>
        {
          customerInfo.addressOption != null ? (
            <span>{customerInfo.addressOption}</span>
          ) : (
            <></>
          )
        }
      </div>
      <div className={styles.row}>
        <p>配送料</p>
        {/** FIXME: マスタから取得 */}
        <p>{numberToPrice(shippingFee)}</p>
      </div>
    </div>
  )

}