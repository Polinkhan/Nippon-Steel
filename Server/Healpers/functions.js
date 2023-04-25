const ObjectToArray = (obj) => {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
};

const genarateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
};

const filterData = (data) => {
  const ids = data.map((item) => item.name.split("_")[0]);
  return ids.sort();
};

module.exports = { ObjectToArray, genarateOTP, filterData };
