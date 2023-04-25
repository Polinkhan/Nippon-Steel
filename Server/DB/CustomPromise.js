const db = require("./mySQL_init");

const Query = (query, queryParams = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, queryParams, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = { Query };
