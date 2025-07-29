import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_URL;
export const API_URL=API_BASE;
export const api=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json",
    }
});