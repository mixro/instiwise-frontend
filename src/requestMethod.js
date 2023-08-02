import axios from "axios"

const BASE_URL = "https://instiwise-backend.cyclic.app/api";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});