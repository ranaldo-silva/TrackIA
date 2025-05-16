// services/manutencaoApi.ts
import axios from 'axios';

const baseURL = "https://pyhon-api.onrender.com";

const manutencaoApi = axios.create({
  baseURL: baseURL,
});

export default manutencaoApi;