import ItemTable from "@/components/ItemTable";
import Navbar from "@/components/Navbar";
import { AuthType } from "@/hook/Auth";
import { withProtected } from "@/hook/Routes"
import Model from "@/components/Model";

function App({auth}: {auth: AuthType}) {
    return (
        <div>
            <Navbar />
            <div className="max-w-[1240px] mx-auto">
                <Model />
                <ItemTable />
            </div>
        </div>
    )
}

export default withProtected(App);