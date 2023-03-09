import axios from "axios";

// const API_LINK = "http://10.10.10.73:3000";
const API_LINK = "https://backendv2.nippontechnology.com";

const client = axios.create({
  baseURL: API_LINK,
});

export { client };
