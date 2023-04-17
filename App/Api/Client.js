import axios from "axios";

const authUrl = "https://backendv2.nippontechnology.com/api/v1/auth";
// const authUrl = "http://10.10.10.13:5000/api/v1/auth";
const dbUrl = "https://backendv2.nippontechnology.com/api/v1/db";
// const dbUrl = "http://10.10.10.13:5000/api/v1/db";

const authClient = axios.create({
  baseURL: authUrl,
  timeout: 20000,
});
const dbClient = axios.create({
  baseURL: dbUrl,
  timeout: 30000,
});

export { authClient, dbClient };
