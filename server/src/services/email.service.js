import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    secure: process.env.EMAIL_SECURE,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailConfigurations = {
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      return error;
    }
  });
};

export { sendEmail };
