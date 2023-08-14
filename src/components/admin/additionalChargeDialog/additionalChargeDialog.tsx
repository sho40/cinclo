import { useForm } from 'react-hook-form'
import styles from './additionalChargeDialog.module.scss'

interface AdditionalChargeDialogProps {
  customerName: string;
  mailAddress: string;
  returnDate: string;
  totalAmount: number;
  closeDialog: () => void;
}

interface AdditionalChargeMailReq {
  stripeLink: string;
  excessDays: number;
  shippedDate: string;
  additionalCharge: string;
}

const sendAdditionalChargeMail = async (
  stripeLink: string, 
  mailAddress: string,
  customerName: string,
  excessDays: string,
  returnDate: string,
  shippedDate: string,
  additionalCharge: string,
) => {
  const res = await fetch('/api/additional_charge_mail', {
    body: JSON.stringify({
      stripeLink: stripeLink,
      mailAddress: mailAddress,
      customerName: customerName,
      excessDays: excessDays,
      returnDate: returnDate,
      shippedDate: shippedDate,
      additionalCharge: additionalCharge,
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

  if (res.ok) return
}

export const AdditionalChargeDialog = (props: AdditionalChargeDialogProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<AdditionalChargeMailReq>()

  const stripeLink = watch("stripeLink")
  const shippedDate = watch("shippedDate")
  const excessDays = watch("excessDays", 1)
  // 小数点以下切り捨て
  const additionalCharge = Math.floor(props.totalAmount * 0.1 * excessDays);


  const sendMail = (data: AdditionalChargeMailReq) => {
    sendAdditionalChargeMail(
      data.stripeLink,
      props.mailAddress,
      props.customerName,
      String(data.excessDays),
      props.returnDate,
      data.shippedDate,
      String(additionalCharge)
    );
    
    props.closeDialog();
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(sendMail)}>
        <div>
          <div className={styles.formContainer}>
            <label>Stripe Link</label>
            <input
              {...register('stripeLink', { required: '決済リンクを入力してください' })}
              type='text'
              placeholder='stripe payment link'
            />
          </div>
          <div className={styles.formContainer}>
            <label>超過日数</label>
            <input
              {...register('excessDays', { required: '超過日数を入力してください' })}
              type='text'
              placeholder='超過日数を入力'
            />
          </div>
          <div className={styles.formContainer}>
            <label>お客様発送日</label>
            <input
              {...register('shippedDate', { required: 'お客様発送日を入力してください' })}
              type='date'
            />
          </div>
          <div className={styles.errorMessage}>
            <ul>
              <li>
                {errors.stripeLink?.message}
              </li>
              <li>
                {errors.excessDays?.message}
              </li>
              <li>
                {errors.shippedDate?.message}
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.confirmArea}>
          <div className={styles.title}>メール本文確認</div>
          <div className={styles.content}>
            <p>このメールはCINCLOから自動で送信しています。</p>
            <br />
            <p>
              {props.customerName}様<br />
              この度は本サービスをご利用頂き誠にありがとうございます。<br />
              ご返却予定日から{excessDays}日超過していた為、購入単価x10%/日の延滞金をご請求させて頂きます。<br />
              ●ご返却予定日<br />
              {props.returnDate}<br />
              ●お客様発送日<br />
              {shippedDate}<br />
              ●ご請求金額<br />
              {additionalCharge}円<br />
              下記URLからお支払いお願い致します。<br />
              {stripeLink}<br /><br />
              今後とも本サービスを宜しくお願い致します。<br />
              このメールアドレスには返信できません。<br />
              SELECT SHOP SoLuNa
            </p>
          </div>
        </div>
        <div className={styles.sendButton}>
          <button type='submit'>
            送信
          </button>
        </div>
      </form>
    </div>
  )

}