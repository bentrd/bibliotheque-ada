// Configuration Axios pour les requêtes HTTP
// Permet de centraliser les appels API vers le backend avec un port dynamique et l'ajout automatique du token JWT dans les en-têtes
import axios from 'axios';

// Détection automatique du port backend
// Si un port est défini dans les variables d'environnement, il est utilisé, sinon le port par défaut 5500 est utilisé
const backendPort = import.meta.env.VITE_BACKEND_PORT || 5500;
const baseURL = `http://${window.location.hostname}:${backendPort}/api`;

// Création d'une instance Axios avec l'URL de base définie dynamiquement selon le port du backend
const API = axios.create({
  baseURL,
});

// Ajout d'un interceptor qui modifie chaque requête avant qu'elle ne soit envoyée
// Cet interceptor permet d'ajouter automatiquement le token JWT dans les en-têtes des requêtes pour l'authentification
API.interceptors.request.use((config) => {
  // Extraction du token JWT depuis le localStorage
  // Si un token est trouvé, il est ajouté aux en-têtes de la requête sous la forme 'Authorization: Bearer token'
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Exportation de l'instance Axios configurée pour qu'elle soit utilisée dans d'autres parties de l'application
export default API;