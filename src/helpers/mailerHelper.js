import nodemailer from 'nodemailer';
import {compile} from 'handlebars';

import {resetPasswordTemplate} from '../public/templates/resetPassword';
const sendResetPasswordMail = (email,name, code) => {
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shypment@gmail.com',
      pass: '#@shyp250.'
    }
  });
  
  let template = compile(resetPasswordTemplate());
  let data = {name, code};
  let mail = template(data);

  let mailOptions = {
    from: 'shypment@gmail.com',
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