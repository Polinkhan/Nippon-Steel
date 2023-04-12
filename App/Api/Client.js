import axios from "axios";

const authUrl = "http://10.10.10.13:5000/api/v1/auth";
const dbUrl = "http://10.10.10.13:5000/api/v1/db";

const authClient = axios.create({
  baseURL: authUrl,
});
const dbClient = axios.create({
  baseURL: dbUrl,
});

export { authClient, dbClient };
