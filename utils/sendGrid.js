const sgMail = require("@sendgrid/mail");

const { API_KEY_SENDGRID } = require("../config/index");

sgMail.setApiKey(API_KEY_SENDGRID);

const sendEmail = () => {
  const msg = {
    to: "waxiw1992@gmail.com",
    from: "waxiw1992@gmail.com", // Use the email address or domain you verified above
    subject: "SendGrid is Fun",
    text: "SendGrid with Node.js",
    html: "<strong>easy to do anywhere</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
