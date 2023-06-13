export default function handler(req: any, res: any) {
  if(req.method === 'POST') {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_APIKEY);

    const replacedMessage = req.body.message.replace(/(\r\n|\n|\r)/gm, '<br>');
    console.log("req.body.message", replacedMessage)
     
    const msg = {
      to: req.body.mail_address,
      from: 'support-system@cinclo.jp',
      subject: 'お問合せを受け付けました。',
      text: `お問合せを受け付けました。\n回答をお待ちください。\n${req.body.message}`,
      html: `
        <strong>お問合せありがとうございます。</strong>
        <br />
        <p>${req.body.customer_name}様</p>
        <p>いつもCINCLOをご利用いただき、ありがとうございます。</p>
        <p>下記お問合せを受け付けました。</p>
        <p>お問合せ内容を確認後、スタッフよりメールにてご連絡させていただきます。</p>
        <p>====== お問い合わせ内容 ======</p>
        <p>${replacedMessage}</p>
        <p>===========================</p>
        <br />
        <p>■ 本メールは送信専用のため、ご返信いただきましても対応致しかねます。</p>
        <br />
        <hr>
        <p>SELECT SHOP SoLuNa</p>
        <hr>
      `
    };
 
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