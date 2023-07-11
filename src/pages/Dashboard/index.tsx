import ItemTable, { ItemType } from "@/components/ItemTable";
import Navbar from "@/components/Navbar";
import { AuthType } from "@/hook/Auth";
import { withProtected } from "@/hook/Routes";
import Model from "@/components/Model";
import { useEffect, useState } from "react";
import fetchClient from "@/service/FetchClient";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function App({ auth }: { auth: AuthType }) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  

  useEffect(() => {
    fetchClient.get("/findAllItemsOfUser")
      .then((response) => {
        setItems(response.data);
        setShowSkeleton(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setShowSkeleton(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-[1240px] mx-auto">
        <div className="flex justify-end mb-5">
          <Model items={items} setItems={setItems} />
        </div>
        {showSkeleton ?
        <Skeleton height={250} borderRadius={10} />
        :
        <ItemTable items={items} />
        }
      </div>
    </div>
  );
}

export default withProtected(App);
