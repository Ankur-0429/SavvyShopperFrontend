"use client";
import "@fontsource/public-sans";
import * as React from "react";
import "../../styles/googleSignIn.css";
import Lottie from "lottie-react";
import HeroSection from "../../public/HeroSection.json";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "@mui/joy/Link";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";
import { Typography } from "@mui/joy";
import Navbar from "@/components/Navbar";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function App() {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(!hovered);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? <Skeleton height={50} borderRadius={10} /> : <Navbar />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: 50,
        }}>
        <div>
          <h1
            style={{
              fontSize: "4.5rem",
              lineHeight: "85px",
              color: "rgb(51, 51, 51)",
              paddingBottom: "12px",
              textAlign: "left",
            }}>
            <span style={{ fontWeight: "600" }}>
              Get Alerts when Items
              <br />
              Get Cheaper
              <br />
              <Link href="/Register" underline="none">
                <Button
                  className="group"
                  size="lg"
                  style={{ borderRadius: 100, fontWeight: 300 }}
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHover}
                  endDecorator={
                    <div
                      style={{
                        position: "relative",
                        left: hovered ? "5px" : "0",
                        transition: "left 0.3s ease-in-out",
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
              <Link
                href="/Login"
                p={3}
                textColor="text.secondary"
                fontWeight={300}>
                <Typography>Login</Typography>
              </Link>
            </span>
          </h1>
        </div>
        <div className="hidden lg:flex sm:w-1/4">
          <Lottie autoplay={false} animationData={HeroSection} />
        </div>
      </div>
    </div>
  );
}
