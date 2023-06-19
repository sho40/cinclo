import { CartItem } from '@/atoms/CartAtom';
import { formatDateYYYYMMDDForDisplay } from '@/logic/dateFormatter';
import { addTax, numberToPrice, numberToPriceCustomer } from '@/logic/numberFormatter';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const cartItems: CartItem[] = req.body.cartItems;
  const totalAmount = addTax(req.body.totalAmountWithoutTax);
  const totalAmountIncludesShippingFee: number = totalAmount + req.body.shippingFee;
  const now = new Date;

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_APIKEY);

  const msg = {
    to: req.body.email,
    bcc: '',
    from: 'order-noreply@cinclo.jp',
    subject: 'ご注文明細をお届けいたします。',
    text: `このメールはCINCLOから自動で送信しています\n${req.body.name} 様\nお買い上げ明細をお届けいたします。`,
    html: `
      <h3>${req.body.name} 様</h3>
      <p>
      この度はCINCLOをご利用いただき、ありがとうございます。<br/>
      この度承りましたレンタルの詳細をお届けいたします。<br/>
      </p>
      <h3>[ご注文内容]</h3>
      <p>
      ご注文番号: ${req.body.orderId}<br/>
      ご注文日: ${formatDateYYYYMMDDForDisplay(now)}<br/>
      お届け先: ${req.body.zipAddress}<br/>
      お支払い合計: ${numberToPrice(totalAmountIncludesShippingFee)}<br/>
      到着予定日: ${req.body.arraivalDate}<br/>
      返却予定日: ${req.body.returnDate} ※お客様が発送する日<br/>
      ■ ご返却予定日を超えますと1日ごとに延滞金 (購入単価x10%)発生しますのでご承知置きください。<br/>
      ■ 延滞が発生しましたら別途手続きのメールを送信いたします。<br/>
      ■ 延滞金の請求メールに関しては、商品の返送予定日より4日経っても弊社に商品が届かない場合にシステムより自動送信させていただきます。<br/>
      ■ 返送時は商品を再度梱包の上、同梱された発送伝票をご使用し返送お願いいたします。<br/>
      </p>
      <h3>[ご注文商品明細]</h3>
      ${cartItems.map((item) => {
        return `
          <ul>
          <li>商品名: ${item.name}</li>
          <li>ブランド名: ${item.brand?.name}</li>
          <li>単価: ${numberToPriceCustomer(item.current_price)}</li>
          </ul>
          --------------------------------------<br/>
        `
      })}
      <p>
      小計: ${numberToPrice(totalAmount)}<br/>
      送料: ${numberToPrice(req.body.shippingFee)}<br/>
      </p>
      <p>
      --------------------------------------<br/>
      合計: ${numberToPrice(totalAmountIncludesShippingFee)}<br/>
      --------------------------------------<br/>
      ■ お支払い後のキャンセルや返金はできません。
      </p>
      <p>
      ■ 本メールは送信専用のため、ご返信いただきましても対応致しかねます。<br/>
      ===========================<br/>
      SELECT SHOP SoLuNa<br/>
      ===========================
      </p>
    `
  };

  try {
    const response = await sgMail.send(msg);

    return [
      res.status(200),
      res.send(response)
    ]
    
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      message: (error as Error).message
    });
  }

  

}