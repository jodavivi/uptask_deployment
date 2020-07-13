const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transporter =  nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port, 
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.pass, // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info =  {
    from: 'UpTask <no-reply@uptask.com>', // sender address
    to: "jodavivi@gmail.com", // list of receivers
    subject: "Hola", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter.sendMail(info);

  exports.enviar = async (opciones) => {
      let opcionesEmail = {
        from: 'UpTask <no-reply@uptask.com>', // sender address
        to: "jodavivi@gmail.com", // list of receivers
        subject: "Hola", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      };

      const enviarEmail = util.promisify(transporter.sendMail, transporter);
      return enviarEmail.call(transporter, opcionesEmail);
  }