import axios from "axios";

// const authUrl = "http://10.10.10.13:5000/api/v1/auth";
// const dbUrl = "http://10.10.10.13:5000/api/v1/db";

// const authUrl = "https://backendv2.nippontechnology.com/api/v1/auth";
// const dbUrl = "https://backendv2.nippontechnology.com/api/v1/db";

const authUrl = "https://backend.ofsnse.com/api/v1/auth";
const dbUrl = "https://backend.ofsnse.com/api/v1/db";

const authClient = axios.create({
  baseURL: authUrl,
  timeout: 15000,
});
const dbClient = axios.create({
  baseURL: dbUrl,
  timeout: 30000,
});

export { authClient, dbClient };
