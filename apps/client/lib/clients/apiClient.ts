import axios from 'axios';

const apiServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL ?? 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: apiServerUrl
});
