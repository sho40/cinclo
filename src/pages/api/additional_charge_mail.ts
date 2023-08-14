export default function handler(req: any, res: any) {
  if(req.method === 'POST') {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_APIKEY);
     
    const msg = {
      to: req.body.mailAddress,
      bcc: 'admin@cinclo.jp', 
      from: 'support-system@cinclo.jp',
      subject: '延滞金のお支払いをお願いいたします。',
      text: `
        このメールはCINCLOから自動で送信しています。\n
        ${req.body.customerName}様\n
        この度は本サービスをご利用頂き誠にありがとうございます。\n
        ご返却予定日から${req.body.excessDays}日超過していた為、購入単価x10%/日の延滞金をご請求させて頂きます。\n
        ●ご返却予定日\n
        ${req.body.returnDate}\n
        ●お客様発送日\n
        ${req.body.shippedDate}\n
        ●ご請求金額\n
        ${req.body.additionalCharge}\n
        下記URLからお支払いお願い致します。\n
        ${req.body.stripeLink}\n\n
        今後とも本サービスを宜しくお願い致します。\n
        このメールアドレスには返信できません。\n
        SELECT SHOP SoLuNa
        `,
      html: `
        <p>このメールはCINCLOから自動で送信しています。</p>
        <br />
        <p>${req.body.customerName}様<br />
          この度は本サービスをご利用頂き誠にありがとうございます。<br />
          ご返却予定日から${req.body.excessDays}日超過していた為、購入単価x10%/日の延滞金をご請求させて頂きます。<br />
          ●ご返却予定日<br />
          ${req.body.returnDate}<br />
          ●お客様発送日<br />
          ${req.body.shippedDate}<br />
          ●ご請求金額<br />
          ${req.body.additionalCharge}円<br />
          下記URLからお支払いお願い致します。<br />
          ${req.body.stripeLink}<br /><br />
          今後とも本サービスを宜しくお願い致します。<br />
          このメールアドレスには返信できません。<br />
          SELECT SHOP SoLuNa
        </p>
      `
    };

    // console.log("msg", msg)
 
    (async () => {
      try {
        await sgMail.send(msg);
        res.status(200)
      } catch (error: any) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();
  }
}