import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Navbar = () => {
  return (
      <div className="fixed left-0 top-0 w-full ease-in duration-300 z-10">
        <div className="max-w-[1240px] px-5 sm:px-0 mx-auto flex justify-between items-center">
          <Link href="/" underline="none">
            <h1 className="font-bold text-2xl">SaavyShopper</h1>
          </Link>

          <ul className="hidden list-none p-0 items-center sm:flex">
            <li className="p-3">
              <Link href="/" textColor="common.black">
                Login
              </Link>
            </li>

            <li className="p-3">
              <Link href="/">
                {/* @ts-ignore */}
                <Button className="group" style={{borderRadius: 100}} endDecorator={<ArrowForwardIcon fontSize="md" className="transform translate-x-0 transition-transform duration-300 group-hover:translate-x-1" />}>Get Started</Button>
              </Link>
            </li>
          </ul>

          <div className="block sm:hidden z-10">
            <ul className="list-none p-0 items-center">
              <li className="p-3">
              <Link href="/">
                {/* @ts-ignore */}
                <Button className="group" style={{borderRadius: 100}} endDecorator={<ArrowForwardIcon fontSize="md" className="transform translate-x-0 transition-transform duration-300 group-hover:translate-x-1" />}>Get Started</Button>
              </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
