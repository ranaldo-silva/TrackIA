// services/mapaSaidasApi.ts
import axios from 'axios';

const baseURL = "https://java-apis-production.up.railway.app";

const mapaSaidasApi = axios.create({
  baseURL: baseURL,
});

export default mapaSaidasApi;