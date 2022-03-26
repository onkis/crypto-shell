import {asyncWrap} from "./core.mjs";
import nodemailer from "nodemailer";

//TODO: add a transport for production?
const transport = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth:{
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

/**
 * send a basic text email
 * @param {String} recpipient - The recipient email address
 * @param {String} text - the email body
 * @param {String} subject - The email subject
 * @returns {Array} - returns [err, value] tuple
 */
export async function sendTextEmail(recpipient, text, subject){
  let message = {
    from: "Crypto Shell <mike.ball3@gmail.com>",
    to: recpipient,
    subject: subject,
    text:text
  };
  return _sendEmail(message);
}

async function _sendEmail(message){
  //TODO: validate recipient email address
  //TODO: validate if in "DEV" env emails are only going to 
  // developer recipients
  //TODO: Rate limit. Prevent spamming a single user
  return asyncWrap(transport.sendMail(message));
}