import axios from 'axios';
/** Default config for axios instance */
const API_ENDPOINT = 'http://127.0.0.1:8000/api/';
let config = {
    baseURL: `${API_ENDPOINT}`
};

/** Creating the instance for axios */
const httpClient = axios.create(config);

const authInterceptor = config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
};


httpClient.interceptors.request.use(authInterceptor);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
    response => {
        /** TODO: Add any response interceptors */
        return response;
    },
    error => {
        /** TODO: Do something with response error */
        return Promise.reject(error);
    }
);

export default httpClient;