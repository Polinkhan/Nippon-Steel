const path = require("path");
var nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const smtpTransport = require("nodemailer-smtp-transport");

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "noreply.nsc.eng@gmail.com",
//     pass: "pogarrsecbuwpkpt",
//   },
// });

var transporter = nodemailer.createTransport(
  smtpTransport({
    host: "mail.nippontechnology.com",
    secureConnection: false,
    tls: {
      rejectUnauthorized: false,
    },
    port: 587,
    auth: {
      user: "naeem@nippontechnology.com",
      pass: "Naeem@1993",
    },
  })
);

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".handlebars",
      partialsDir: "./views",
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  })
);

const mailTo = async (email, OTP, isAdminLogin) => {
  const subject = isAdminLogin
    ? `${OTP} is your Nippon Steel Engineering (Admin Panel) Verification OTP`
    : `${OTP} is your Nippon Steel Engineering (App) Verification OTP`;

  var mailOptions = {
    from: "naeem@nippontechnology.com",
    to: email,
    subject: subject,
    template: "index",
    context: {
      OTP: OTP,
    },
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else resolve("A code has been sent to your mail");
    });
  });
};

module.exports = { mailTo };
