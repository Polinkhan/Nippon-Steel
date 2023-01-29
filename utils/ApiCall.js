// const fetchDataFromApi = async (data, apiLink, callback) => {
//   try {
//     const response = await fetch(apiLink, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     const json = await response.text();
//     callback(json);
//   } catch (error) {}
// };

const defaultHeader = {};

const fetcher = {
  post: (api, body = {}, headers) => {
    return new Promise(async (resolve, reject) => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 3000);
      const res = await fetch(api, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const parse_res = await res.json();
      if (parse_res.error) reject(parse_res.error);
      resolve(parse_res);
    });
  },
  get: (api, headers) => {
    return new Promise(async (resolve, reject) => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);

      await fetch(api, {
        method: "GET",
        headers: headers ? headers : "",
        signal: controller.signal,
      })
        .then(async (res) => {
          const parse_res = await res.json();
          if (parse_res.error) reject(parse_res.error);
          resolve(parse_res);
        })
        .catch((err) => {
          reject({ status: 500, message: "Server Not Responding" });
        });
    });
  },
};

export { fetcher };
