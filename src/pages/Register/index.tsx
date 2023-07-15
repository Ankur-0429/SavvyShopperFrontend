"use client";
import "@fontsource/public-sans";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Divider from "@mui/joy/Divider";
import "../../../styles/googleSignIn.css";
import { AuthType } from "@/hook/Auth";
import { withPublic } from "@/hook/Routes";
import { useEffect, useState } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";
import { Password } from "@/components/Password";
import { Mail } from "@/components/Mail";
import useList from "@/hook/AsyncList";

function App({ auth }: { auth: AuthType }) {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const checkError = () => {
    const err = auth?.error;

    if (err === undefined) return;

    if (err.includes("(auth/invalid-email)")) {
      setEmailErr("Invalid Email");
    }

    if (err.includes("auth/email-already-in-use")) {
      setEmailErr("Email Already In Use");
    }

    if (err.includes("auth/weak-password")) {
      setPasswordErr("Password should be at least 8 characters");
    }

    if (err.includes("auth/network-request-failed")) {
      setEmailErr("Network Connection Error. Please Try again later.");
    }

    if (err.includes("auth/too-many-requests")) {
      setEmailErr("Too many requests");
    }
  };

  useEffect(() => {
    checkError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.error]);

  const list = useList();

  return (
    <CssVarsProvider>
      <Sheet
        variant="plain"
        sx={{
          maxWidth: 450,
          mx: "auto",
          my: 4,
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
        <div>
          <Typography level="h2" component="h1" textAlign="center">
            Welcome to SaavyShopper
          </Typography>
          <Typography textColor="gray" level="body1" textAlign="center">
            Get Started - it&apos;s free. No credit card required
          </Typography>
        </div>

        <Typography>
          <Input
            bordered
            fullWidth
            size="lg"
            placeholder="Email"
            value={email}
            color={emailErr !== "" ? "error" : "primary"}
            onChange={(event) => {
              setEmailErr("");
              setEmail(event.target.value);
            }}
            helperText={emailErr}
            helperColor="error"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Spacer y={1.5} />
          <Input.Password
            bordered
            fullWidth
            type="password"
            size="lg"
            placeholder="Password"
            value={password}
            color={passwordErr !== "" ? "error" : "primary"}
            onChange={(event) => {
              setPasswordErr("");
              setPassword(event.target.value);
            }}
            helperText={passwordErr}
            helperColor="error"
            contentLeft={<Password fill="currentColor" />}
          />
        </Typography>

        <Spacer y={0.5} />

        <Divider>or</Divider>

        <button
          className="login-with-google-btn"
          onClick={async () => {
            auth?.loginWithGoogle().then(() => {
              list.reload();
            });
          }}>
          Sign up with Google
        </button>

        <Button
          onClick={async () => {
            if (email == "") {
              setEmailErr("Please enter your email");
              return;
            }
            if (password == "") {
              setPasswordErr("Please enter your password");
              return;
            }
            await auth
              ?.registerWithEmailAndPassword(email, password)
              .then(() => {
                checkError();
              });
            list.reload();
          }}
          style={{ marginTop: 20 }}>
          Continue
        </Button>
        <Typography
          endDecorator={<Link href="/Login">Sign in</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}>
          Already have an account?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}

export default withPublic(App);
