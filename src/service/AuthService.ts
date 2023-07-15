import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import "firebase/auth";
import fetchClient from "./FetchClient";

export const AuthService = {
  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
      .then((user) => {
        const isNewUser = getAdditionalUserInfo(user)?.isNewUser;
        if (isNewUser) {
          fetchClient('/sendWelcomeEmailToUser');
        }

        return {
          user: user.user,
          error: undefined,
        };
      })
      .catch((e) => {
        return {
          user: undefined,
          error: e.message as string,
        };
      });
  },

  logout: async () => {
    await signOut(auth);
  },

  registerUserFromEmailAndPassword: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        fetchClient('/sendWelcomeEmailToUser');
        return {
          user: userCredential.user,
          error: undefined,
        };
      })
      .catch((e) => {
        return {
          user: undefined,
          error: e.message as string,
        };
      });
  },

  loginUserFromEmailAndPassword: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return {
          user: userCredential.user,
          error: undefined,
        };
      })
      .catch((e) => {
        return {
          user: undefined,
          error: e.message as string,
        };
      });
  },
};
