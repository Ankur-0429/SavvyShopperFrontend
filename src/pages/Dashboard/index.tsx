import { AuthType } from "@/hook/Auth";
import { withProtected } from "@/hook/Routes"
import { Button } from "@mui/joy";

function App({auth}: {auth: AuthType}) {
    return (
        <div>
            <h1>Welcome {auth?.user?.email}</h1>
            <Button onClick={()=>auth?.logout()}>
                Logout
            </Button>
        </div>
    )
}

export default withProtected(App);