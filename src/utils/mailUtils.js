const nodemailer = require('nodemailer');

// 163邮箱SMTP配置
const config = {
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'zh155329471280@163.com',
    pass: process.env.SMTP_PASS || 'XBRU2gU42k5BWVMg'
  }
};

async function sendEmail(options) {
  const { to, subject, text, html } = options;
  const transporter = nodemailer.createTransport(config);
  
  await transporter.verify();
  
  const info = await transporter.sendMail({
    from: `"API Monitor" <${config.auth.user}>`,
    to,
    subject: `[API Monitor] ${subject}`,
    text,
    html
  });
  
  console.log(`✅ 邮件发送成功: ${info.messageId}`);
  return info;
}

module.exports = { sendEmail };
