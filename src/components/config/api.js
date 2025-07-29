import axios from 'axios';
export const API_URL="https://food-delivery-backend-7m8f.onrender.com"
export const api=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json",
    }
})