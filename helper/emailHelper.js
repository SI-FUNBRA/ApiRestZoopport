const nodemailer = require("nodemailer");

const sendEmail = (para, asunto, msj) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'proyectoadsi2021@gmail.com',
        pass: 'alfrejuke2021'
    },
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