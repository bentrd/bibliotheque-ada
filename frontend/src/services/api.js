import axios from 'axios';

// Détecte automatiquement le bon port backend
const backendPort = import.meta.env.VITE_BACKEND_PORT || 5500;
const baseURL = `http://${window.location.hostname}:${backendPort}/api`;

const API = axios.create({
  baseURL,
});

// Ajouter automatiquement le token JWT aux requêtes
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;