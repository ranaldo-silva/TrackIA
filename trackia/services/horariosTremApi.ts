// services/horariosTremApi.ts
import axios from 'axios';

const baseURL = "https://java-apis-production.up.railway.app";

const horariosTremApi = axios.create({
  baseURL: baseURL,
});

export default horariosTremApi;