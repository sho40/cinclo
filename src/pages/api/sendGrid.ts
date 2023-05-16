
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // FIXME: 本文の内容確認する
  const sgMail = require('@sendgrid/mail');
  // TODO: APIKey取得し定義
  // sgMail.setApiKey(process.env.SENDGRID_APIKEY);
  const msg = {
    to: req.body.email,
    bcc: '',
    from: '',
    subject: 'お買い上げ明細をお届けいたします。',
    text: `このメールはCINCLOから自動で送信しています\n${req.body.name} 様\nお買い上げ明細をお届けいたします。\nお買い上げ商品\n${req.body.itemNames.map((itemName: string) => `${itemName}\n`)}\n\nご購入日時\n${req.body.date}\n到着予定日\n${req.body.arraivalDate}\nお支払い合計金額\n${req.body.totalAmount}\n購入のキャンセルや返金はできません。\nご返却予定日\n${req.body.returnDate}\nご返却予定日を超えますと延滞金 購入単価x10%/日 発生しますのでご承知置きください。\n返送時は商品を再度梱包の上、同梱された発送伝票をご使用し返送お願いいたします。\n詳細は以下のページをご覧ください\nhttps---\nこのメールアドレスには返信できません。\n\nSELECT SHOP SoLuNa`
  }

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