// services/locaisProximosApi.ts
import axios from 'axios';

const baseURL = "https://java-apis-production.up.railway.app";

const locaisProximosApi = axios.create({
  baseURL: baseURL,
});

export default locaisProximosApi;