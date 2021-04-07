import nodemailer from 'nodemailer';
import {compile} from 'handlebars';

import {resetPasswordTemplate} from '../public/templates/resetPassword';
const sendResetPasswordMail = () => {
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shypment@gmail.com',
      pass: '#@shyp250.'
    }
  });
  
  let template = compile(resetPasswordTemplate());
  let data = {firstname:'Patrick', code: '125733'};
  let mail = template(data);

  let mailOptions = {
    from: 'shypment@gmail.com',
    to: 'patrickniyogitare28@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
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