import * as React from "react";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/router";
import { withProtected } from "@/hook/Routes";
import { AuthType } from "@/hook/Auth";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Linechart from "@/components/LineChart";
import fetchClient from "@/service/FetchClient";
import { ItemType } from "@/components/ItemTable";
import { StyledBadge } from "@/components/ItemTable/StyledBadge";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const calculateTimeAgo = (isoString: string) => {
  const currentDate = new Date();
  const pastDate = new Date(isoString);

  const timeDifference = currentDate.getTime() - pastDate.getTime();

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysAgo = Math.floor(timeDifference / millisecondsPerDay);

  const monthsAgo =
    currentDate.getMonth() -
    pastDate.getMonth() +
    12 * (currentDate.getFullYear() - pastDate.getFullYear());

  const yearsAgo = currentDate.getFullYear() - pastDate.getFullYear();

  return {
    daysAgo,
    monthsAgo,
    yearsAgo,
  };
};

function ItemDetails({ auth }: { auth: AuthType }) {
  const router = useRouter();
  const [itemData, setItemData] = React.useState(null as null | ItemType);
  const [timeAgoText, setTimeAgoText] = React.useState(null as null | string);

  React.useEffect(() => {
    fetchClient
      .get<ItemType>("/findSingleItemOfUser", {
        params: {
          itemid: router.query.id,
        },
      })
      .then((response) => {
        setItemData(response.data);
        const s = calculateTimeAgo(response.data.start_date);

        const timeAgoText = [
          s.yearsAgo && `${s.yearsAgo} ${s.yearsAgo === 1 ? "year" : "years"}`,
          s.monthsAgo &&
            `${s.monthsAgo} ${s.monthsAgo === 1 ? "month" : "months"}`,
          s.daysAgo && `${s.daysAgo} ${s.daysAgo === 1 ? "day" : "days"}`,
        ]
          .filter(Boolean)
          .join(", ");
        setTimeAgoText(timeAgoText);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.query.id]);

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

        {itemData ? (
          <Typography>
            <div className="flex flex-row justify-between">
              <div>
                <div className="flex flex-row items-center">
                  <h2>
                    <Typography>
                      {(itemData.nickname || itemData.item_name).length > 40
                        ? (itemData.nickname || itemData.item_name).slice(
                            0,
                            40
                          ) + "..."
                        : itemData.nickname || itemData.item_name}
                    </Typography>
                  </h2>
                  <a
                    href={itemData.url}
                    target="_blank"
                    className="mt-2"
                    rel="noopener noreferrer">
                    <LaunchRoundedIcon color="primary" className="ml-2" />
                  </a>
                </div>
                <div className="text-gray-600">{timeAgoText + " ago"}</div>
              </div>

              <StyledBadge type={itemData.status}>
                {itemData.status}
              </StyledBadge>
            </div>
            <Linechart
              start_date={itemData.start_date}
              prices={itemData.price_data}
              title={itemData.item_name}
            />
          </Typography>
        ) : (
          <div>
            <div className="flex flex-row justify-between mt-5">
              <div>
                <div className="flex flex-row items-center">
                  <Skeleton width={120} height={60} />
                  <Skeleton width={50} height={60} className="ml-2" />
                </div>
                <Skeleton width={120} height={40} className="my-5" />
              </div>

              <Skeleton width={120} height={60} />
            </div>
            <Skeleton height={400} />
          </div>
        )}
      </div>
    </div>
  );
}

export default withProtected(ItemDetails);
