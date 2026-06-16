const nodemailer = require('nodemailer');

// 复用 transporter 实例，避免每次创建连接
let _transporter = null;

function getTransporter() {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'zh155329471280@163.com',
        pass: process.env.SMTP_PASS || 'XBRU2gU42k5BWVMg'
      }
    });
  }
  return _transporter;
}

async function sendEmail(options) {
  const { to, subject, text, html } = options;
  const transporter = getTransporter();
  
  const info = await transporter.sendMail({
    from: `"API Monitor" <${transporter.options.auth.user}>`,
    to,
    subject: `[API Monitor] ${subject}`,
    text,
    html
  });
  
  console.log(`✅ 邮件发送成功: ${info.messageId}`);
  return info;
}

module.exports = { sendEmail };
