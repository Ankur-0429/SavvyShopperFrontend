"use client";
import "@fontsource/public-sans";
import * as React from "react";
import "../../styles/googleSignIn.css";
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import HeroSection from "../../public/HeroSection.json";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "@mui/joy/Link";
import Button from "@mui/joy/Button";

export default function App() {
  return (
    <div>
      <Navbar />
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
              <Link href="/Login" p={3} textColor="common.black">
                Login
              </Link>
            </span>
          </h1>
        </div>
        <div className="w-1/2 hidden lg:flex sm:w-1/4">
          <Lottie loop={1} autoPlay={false} animationData={HeroSection} />
        </div>
      </div>
    </div>
  );
}
