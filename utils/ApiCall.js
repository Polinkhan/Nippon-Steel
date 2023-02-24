

import axios from "axios";
import { api } from "./StaticData";

const fetcher = axios.create({
  baseURL: api,
});

export { fetcher };
