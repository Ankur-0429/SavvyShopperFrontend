import { AuthService } from "@/service/AuthService";
import { UserCredential, signOut } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../../firebase/clientApp";

const AuthContext = createContext(undefined as { user: UserCredential | undefined; error: string | undefined; loginWithGoogle: () => Promise<void>; logout: () => Promise<void>; } | undefined);

export default function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props: any) {
    const [user, setUser] = useState(undefined as UserCredential | undefined);
    const [error, setError] = useState(undefined as string | undefined);

    const loginWithGoogle = async () => {
        const {user, error} : {user?: UserCredential, error ?:string} = await AuthService.loginWithGoogle();
        setUser(user);
        setError(error);
    };

    const logout = async() => {
        await signOut(auth);
        setUser(undefined);
        setError(undefined);
    }
    const value = {user, error, loginWithGoogle, logout};

    return <AuthContext.Provider value={value} {...props} />
}