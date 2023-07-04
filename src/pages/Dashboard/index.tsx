import Navbar from "@/components/Navbar";
import { AuthType } from "@/hook/Auth";
import { withProtected } from "@/hook/Routes"

function App({auth}: {auth: AuthType}) {
    return (
        <div>
            <Navbar />
        </div>
    )
}

export default withProtected(App);