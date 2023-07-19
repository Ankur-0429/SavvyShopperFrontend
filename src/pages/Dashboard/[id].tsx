import * as React from "react";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/router";
import { withProtected } from "@/hook/Routes";
import { AuthType } from "@/hook/Auth";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Linechart from "@/components/LineChart";
import fetchClient from "@/service/FetchClient";
import { ItemType } from "@/components/ItemTable";

function ItemDetails({ auth }: { auth: AuthType }) {
  const router = useRouter();
  const [itemData, setItemData] = React.useState(null as null | ItemType);

  React.useEffect(() => {
    fetchClient.get<ItemType>('/findSingleItemOfUser', {
      params: {
        itemid: router.query.id,
      },
    }).then((response) => {
      setItemData(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [router.query.id])

  return (
    <div>
      <Navbar />
      <div className="max-w-[1240px] mx-auto mt-5">
        <div className="flex items-center text-gray-500">
          <Link href="/Dashboard" className="no-underline hover:underline">
            <Typography>Dashboard</Typography>
          </Link>
          <span className="mx-2">{">"}</span>
          <Typography>Item Details</Typography>
        </div>

        {itemData &&
          <Linechart start_date={itemData.start_date} prices={itemData.price_data} />
        }
        

      </div>
    </div>
  );
}

export default withProtected(ItemDetails);
