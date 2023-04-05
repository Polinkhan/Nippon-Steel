var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abusayedpolin@gmail.com",
    pass: "oshuyzoukapejwlr",
  },
});

const mailTo = async (email, OTP) => {
  var mailOptions = {
    from: "abusayedpolin@gmail.com",
    to: email,
    subject: "Use the code to sign in",
    text: `Your code - ${OTP}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) reject(error);
      else resolve("A code has been sent to your mail");
    });
  });
};

module.exports = { mailTo };
