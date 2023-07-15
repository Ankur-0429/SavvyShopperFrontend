import axios from 'axios';
import { auth } from '../../firebase/clientApp';

const fetchClient = (() => {
    const getAuthToken = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            console.log(token);
            return token;
        } catch(err) {
            console.log("getAuthToken", err);
        };
    };

    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        timeout: 10000
    });

    instance.interceptors.request.use(async (config) => {
        config.headers.Authorization = await getAuthToken();
        return config;
    });

    return instance;
})();

export default fetchClient;