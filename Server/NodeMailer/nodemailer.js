var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.nsc.eng@gmail.com",
    pass: "pogarrsecbuwpkpt",
  },
});

const mailTo = async (email, OTP) => {
  var mailOptions = {
    from: "noreply.nsc.eng@gmail.com",
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
