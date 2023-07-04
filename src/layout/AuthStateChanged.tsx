import useAuth from "@/hook/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../../firebase/clientApp";


export default function AuthStateChanged({children}: { children: ReactNode }) {
    const authorization = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            authorization?.setUser(user || undefined);
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return null
    }

    return children;
}