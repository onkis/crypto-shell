import nodemailer from "nodemailer"


const transport;
//TODO: add a transport for production?
transport = nodemailer.createTransport({
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
 * @param {Function} callback - called when complete
 */
export function sendTextEmail(recpipient, text, subject, callback){
  let message = {
    from: "Crypto Shell <mike.ball3@gmail.com>",
    to: recpipient,
    subject: subject,
    text:text
  };
  _sendEmail(message, callback);
}

function _sendEmail(message, callback){
  //TODO: validate recipient email address
  //TODO: validate if in "DEV" env emails are only going to 
  // developer recipients
  //TODO: Rate limit. Prevent spamming a single user
  transport.sendMail(mailOptions, callback);
}