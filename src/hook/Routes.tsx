import { useRouter } from "next/router";
import useAuth, { AuthType } from "./Auth"
import { ReactNode } from "react";

interface ComponentProps {
    auth: AuthType;
}

export function withPublic(Component: React.ComponentType<ComponentProps>) {
    return function withPublic(props:any) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const auth = useAuth();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();
        if (auth?.user) {
            router.replace('/Dashboard');
            return null;
        }
        return <Component auth={auth} {...props} />;
    }
}

export function withProtected(Component: React.ComponentType<ComponentProps>) {
    return function withPublic(props:any) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const auth = useAuth();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();
        if (!auth?.user) {
            router.replace('/Login');
            return null
        }
        return <Component auth={auth} {...props} />;
    }
}