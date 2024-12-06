import axios from "axios/index";

export const baseURL = process.env.EXPO_PUBLIC_API_URL;
const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Accept': 'application/json',
    }
});

export default axiosInstance