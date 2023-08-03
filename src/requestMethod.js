import axios from "axios"

const BASE_URL = "https://instiwise-backend.onrender.com/api";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
