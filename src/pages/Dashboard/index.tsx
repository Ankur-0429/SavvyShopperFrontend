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
  console.log(width);

  useEffect(() => {
    fetchClient
      .get("/findAllItemsOfUser")
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
      <div className="max-w-[1240px] mx-auto mt-5">
        <div className="flex justify-end mb-5">
          <Model items={items} setItems={setItems} />
        </div>
        {showSkeleton ? (
          <div>
            {Array(10)
              .fill(10)
              .map((_, index) => (
                <div key={index} className="flex flex-row w-full mb-5">
                  <Skeleton height={50} circle width={50} />
                  <div>
                    <Skeleton
                      height={50}
                      borderRadius={10}
                      style={{
                        marginLeft: 30,
                        width: width > 1240 ? 1160 : width - 100,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <ItemTable items={items} />
        )}
      </div>
    </div>
  );
}

export default withProtected(App);
