const nodemailer = require("nodemailer");

const emailSend = async (mailTo, ...rest) => {
  const [subject, template] = rest;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hamza.mern2201@gmail.com",
        pass: "dgfzcxgngopuccjj",
      },
    });

    await transporter.sendMail({
      from: "hamza.mern2201@gmail.com",
      to: mailTo,
      subject: subject,
      html: template,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = emailSend;