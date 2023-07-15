import ItemTable, { ItemType } from "@/components/ItemTable";
import Navbar from "@/components/Navbar";
import { AuthType } from "@/hook/Auth";
import { withProtected } from "@/hook/Routes";
import Model from "@/components/Model";
import { useEffect, useState } from "react";
import fetchClient from "@/service/FetchClient";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useScreenSize from "@/hook/useScreenSize";
function App({ auth }: { auth: AuthType }) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { width } = useScreenSize();

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
