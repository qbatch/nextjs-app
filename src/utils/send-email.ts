import nodemailer from 'nodemailer';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

interface SendEmailParams {
  email: string;
  unique: string;
  page: string;
}

const { APP_URL } = process.env;

const SendEmail = ({
  email,
  unique,
  page
}: SendEmailParams) => {
  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ahsnkhalid1027@gmail.com',
      pass: 'drek mbxf mouf xmiw'
    }
  });

  const mailOptions: MailOptions = {
    from: 'ahsnkhalid1027@gmail.com',
    to: email,
    subject: 'Reset Password Email Confirmation',
    html: `Click <a href="${APP_URL}/${page}?token=${unique}">here</a> to verify your account.`
  };

  transport.sendMail(mailOptions, (error) => {
    if (error) {
      throw error;
    } else {
      console.log('\n\n Success');
    }
  });
};

export default SendEmail;
