import ItemTable from "@/components/ItemTable";
import Navbar from "@/components/Navbar";
import { AuthType } from "@/hook/Auth";
import { withProtected } from "@/hook/Routes";
import Model from "@/components/Model";
import "react-loading-skeleton/dist/skeleton.css";

function App({ auth }: { auth: AuthType }) {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1240px] mx-auto mt-5">
        <div className="flex justify-end mb-5">
          <Model />
        </div>
        <ItemTable />
      </div>
    </div>
  );
}

export default withProtected(App);
