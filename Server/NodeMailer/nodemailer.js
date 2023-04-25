const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const { log } = require("console");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.nsc.eng@gmail.com",
    pass: "fblqbqegimtlhshd",
  },
});

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
    from: "noreply.nsc.eng@gmail.com",
    to: "naeem@nsc-eng.com",
    subject: subject,
    headers: {
      priority: "high",
    },
    template: "index",
    context: {
      OTP: OTP,
    },
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      console.log(info);
      if (error) {
        console.log(error);
        reject(error);
      } else resolve("A code has been sent to your mail");
    });
  });
};

module.exports = { mailTo };
