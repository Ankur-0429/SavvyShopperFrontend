import { AuthService } from "@/service/AuthService";
import { User, UserCredential, signOut } from "firebase/auth";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { auth } from "../../firebase/clientApp";

export type AuthType = {
    user: User | undefined;
    error: string | undefined;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    setUser: Dispatch<SetStateAction<User | undefined>>;
    loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
    registerWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  } | undefined;

const AuthContext = createContext(
  undefined as AuthType
);

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props: any) {
  const [user, setUser] = useState(undefined as User | undefined);
  const [error, setError] = useState(undefined as string | undefined);

  const loginWithGoogle = async () => {
    const { user, error }: { user?: User; error?: string } =
      await AuthService.loginWithGoogle();
    setUser(user);
    setError(error);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    const { user, error }: { user?: User; error?: string } =
      await AuthService.loginUserFromEmailAndPassword(email, password);
    setUser(user);
    setError(error);
  };

  const registerWithEmailAndPassword = async (email: string, password: string) => {
    const { user, error }: { user?: User; error?: string } =
      await AuthService.registerUserFromEmailAndPassword(email, password);
    setUser(user);
    setError(error);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(undefined);
    setError(undefined);
  };
  const value = { user, error, loginWithGoogle, logout, setUser, loginWithEmailAndPassword, registerWithEmailAndPassword };

  return <AuthContext.Provider value={value} {...props} />;
}
