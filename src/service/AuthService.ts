import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/clientApp';
import 'firebase/auth';

export const AuthService = {
    loginWithGoogle: async() => {
        const provider = new GoogleAuthProvider();

        return signInWithPopup(auth, provider)
            .then((user) => {
                return {
                    user: user,
                    error: undefined,
                };
            })
            .catch ((e) => {
                return {
                    user: undefined,
                    error: e.message as string,
                };
            })
    },

    logout: async() => {
        await signOut(auth);
    }
}