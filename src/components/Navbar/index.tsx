import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import Logo from "../../../public/SavvyShopper_Logo.png";

const Navbar = () => {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(!hovered);
  };

  return (
    <div>
      <div
        className={`fixed left-0 top-0 w-full ease-in duration-100 z-10 ${
          !top && `bg-white shadow-lg`
        }`}>
        <div className="max-w-[1240px] px-5 mx-auto flex justify-between items-center">
          <Link href="/" underline="none">
            <Image src={Logo} alt="Company Logo" width={50} height={60} />
            <h1 className="font-bold text-2xl">SaavyShopper</h1>
          </Link>
          <ul className="hidden list-none p-0 items-center sm:flex">
            <li className="p-3">
              <Link href="/Login" textColor="text.secondary">
                Login
              </Link>
            </li>

            <li className="p-3">
              <Link href="/Register" underline="none">
                <Button
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHover}
                  style={{ borderRadius: 100 }}
                  endDecorator={
                    <div style={{
                        position: 'relative',
                        left: hovered ? '5px' : '0',
                        transition: 'left 0.3s ease-in-out',
                    }}>
                        <ArrowForwardIcon
                            // @ts-ignore
                            fontSize="md"
                        />
                    </div>
                  }>
                  Get Started
                </Button>
              </Link>
            </li>
          </ul>

          <div className="block sm:hidden z-10">
            <ul className="list-none p-0 items-center">
              <li className="p-3">
                <Link href="/Register">
                  <Button
                    className="group"
                    style={{ borderRadius: 100 }}
                    endDecorator={
                      <ArrowForwardIcon
                        // @ts-ignore
                        fontSize="md"
                        className="transform translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    }>
                    Get Started
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-20" />
    </div>
  );
};

export default Navbar;
