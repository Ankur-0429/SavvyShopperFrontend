import * as React from "react";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/router";
import { withProtected } from "@/hook/Routes";
import { AuthType } from "@/hook/Auth";
import Navbar from "@/components/Navbar";
import Link from "next/link";

function ItemDetails({ auth }: { auth: AuthType }) {
  const router = useRouter();
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
        

      </div>
    </div>
  );
}

export default withProtected(ItemDetails);
