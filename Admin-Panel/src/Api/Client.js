import axios from "axios";

const authUrl = "http://localhost:5000/api/v1/admin/auth";
const dbUrl = "http://localhost:5000/api/v1/admin/db";

const authClient = axios.create({
  baseURL: authUrl,
});
const dbClient = axios.create({
  baseURL: dbUrl,
});

export { authClient, dbClient };
