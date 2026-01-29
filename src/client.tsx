import axios from "axios";

export const client = axios.create({
    // baseURL: 'https://q8pr7v51-8000.asse.devtunnels.ms/api',
    // baseURL: "http://127.0.0.1:8000/api",
    baseURL: "https://697afa5f0e6ff62c3c5a94ea.mockapi.io/api",
    headers: {
        "Content-Type": "application/json",
    },
});
