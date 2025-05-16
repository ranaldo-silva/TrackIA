// services/assistenteVozApi.ts
import axios from 'axios';

const baseURL = "https://java-apis-production.up.railway.app";

const assistenteVozApi = axios.create({
  baseURL: baseURL,
});

export default assistenteVozApi;