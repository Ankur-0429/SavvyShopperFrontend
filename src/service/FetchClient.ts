import axios from 'axios';
import firebase from 'firebase/app';
import { auth } from '../../firebase/clientApp';

const fetchClient = (() => {
    const getAuthToken = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            return token;
        } catch(err) {
            console.log("getAuthToken", err);
        };
    };

    const instance = axios.create({
        baseURL: 'http://100.64.20.52:7789'
    });

    instance.interceptors.request.use(async (config) => {
        config.headers.Authorization = await getAuthToken();
        return config;
    });

    return instance;
})();

export default fetchClient;