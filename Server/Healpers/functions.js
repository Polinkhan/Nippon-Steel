const ObjectToArray = (obj) => {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
};

const genarateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
};

module.exports = { ObjectToArray, genarateOTP };
