const path = require("path");
var nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.nsc.eng@gmail.com",
    pass: "pogarrsecbuwpkpt",
  },
});

const handlebarsOption = {};

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

const mailTo = async (email, OTP, time) => {
  var mailOptions = {
    from: "noreply.nsc.eng@gmail.com",
    to: email,
    subject: `${OTP} is your Nippon Steel App Verification OTP`,
    // text: `Your code - ${OTP}`,
    template: "index",
    context: {
      OTP: OTP,
      endTime: new Date(time + 300000).toLocaleTimeString(),
    },
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) reject(error);
      else resolve("A code has been sent to your mail");
    });
  });
};

module.exports = { mailTo };
