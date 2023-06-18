export default function handler(req: any, res: any) {
  if(req.method === 'POST') {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_APIKEY);

    const replacedMessage = req.body.message.replace(/(\r\n|\n|\r)/gm, '<br>');
     
    const msg = {
      to: req.body.mail_address,
      bcc: 'admin@cinclo.jp', 
      from: 'support-system@cinclo.jp',
      subject: 'お問合せを受け付けました。',
      text: `
        お問合せを受け付けました。\n
        ${req.body.customer_name}様\n
        いつもCINCLOをご利用いただき、ありがとうございます。\n
        下記お問合せを受け付けました。\n
        お問合せ内容を確認後、スタッフよりメールにてご連絡させていただきます。\n
        ====== お問い合わせ内容 ======\n
        ${req.body.message}\n
        ===========================\n\n
        ■ 本メールは送信専用のため、ご返信いただきましても対応致しかねます。\n\n
        SELECT SHOP SoLuNa`,
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