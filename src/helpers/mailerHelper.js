import nodemailer from 'nodemailer';
import {compile} from 'handlebars';
import {config} from 'dotenv';
import {resetPasswordTemplate} from '../public/templates/resetPassword';

config();
const sendResetPasswordMail = (email,name, code) => {
let transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASS
    }
  });
  
  let template = compile(resetPasswordTemplate());
  let data = {name, code};
  let mail = template(data);

  let mailOptions = {
    from: process.env.APP_EMAIL,
    to: email,
    subject: 'Sypement- reset password',
    html:  mail
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export {sendResetPasswordMail}