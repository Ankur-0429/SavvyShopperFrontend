import ItemTable from "@/components/ItemTable";
import Navbar from "@/components/Navbar";
import { AuthType } from "@/hook/Auth";
import { withProtected } from "@/hook/Routes"

function App({auth}: {auth: AuthType}) {
    return (
        <div>
            <Navbar />
            <div className="max-w-[1240px] mx-auto">
                <ItemTable />
            </div>
        </div>
    )
}

export default withProtected(App);