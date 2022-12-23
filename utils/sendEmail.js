const nodemailer = require("nodemailer");

const sendEmail = async (
  email = "waxiw@ukr.net",
  subject = "Hello TOPIC!",
  text = "Hello TEXT!"
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "no-reply@tehtix.com", // generated ethereal user
        pass: "45.84.204.213Tehtix!!", // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
