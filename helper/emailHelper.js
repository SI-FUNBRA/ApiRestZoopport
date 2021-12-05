const nodemailer = require("nodemailer");

const sendEmail = (para, asunto, msj) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "45939ae8a2c75b",
      pass: "df4eae2d80e22b"
    }
});

    const mailOptions = {
        from: "proyectoadsi2021@gmail.com",
        to: para,
        subject: asunto,
        html: msj,
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("enviado con exito");
    }
  });
};

module.exports = { sendEmail };