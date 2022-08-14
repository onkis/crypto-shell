import {asyncWrap} from "./core.mjs";
import nodemailer from "nodemailer";
import {canSendEmail} from "./rate_limit.mjs";

//TODO: add a transport for production?
var transport, sendingEmail;

if(process.env.NODE_ENV !== 'production'){
  transport = nodemailer.createTransport({
    service: "hotmail",
      auth: {
      user: process.env.HOTMAIL_USER,
      pass: process.env.HOTMAIL_PASS,
    }
  });
  sendingEmail = process.env.HOTMAIL_USER;
}
else{
  //email-smtp.us-east-1.amazonaws.com
  transport = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  sendingEmail = 'do-not-reply@rotipay.com';
}





/**
 * send a basic text email
 * @param {String} recipient - The recipient email address
 * @param {String} text - the email body
 * @param {String} subject - The email subject
 * @returns {Array} - returns [err, value] tuple
 */
export async function sendTextEmail(recipient, text, subject){
  let message = {
    from: sendingEmail,
    to: recipient,
    subject: subject,
    text: text
  };
  return _sendEmail(message);
}

export async function sendHtmlEmail(recipient, html, subject){
  let message = {
    from: sendingEmail,
    to: recipient,
    subject: subject,
    html: html
  };
  return _sendEmail(message);
}

async function _sendEmail(message){
  //TODO: validate recipient email address
  //TODO: validate if in "DEV" env emails are only going to 
  // developer recipients
  
  let [err, canSend] = await canSendEmail(message.to);
  if(canSend){
    return asyncWrap(transport.sendMail(message));
  }
  else{
    console.error("Recipient Rate limit reached", message);
    return [new Error("Recipient Rate limit reached")]
  }
}