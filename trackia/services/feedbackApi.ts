// services/feedbackApi.ts
import axios from 'axios';

const baseURL = "https://java-apis-production.up.railway.app";

const feedbackApi = axios.create({
  baseURL: baseURL,
});

export default feedbackApi;