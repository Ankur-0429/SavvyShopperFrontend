"use client";
import "@fontsource/public-sans";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Divider from "@mui/joy/Divider";
import '../../styles/googleSignIn.css'

export default function App() {
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
            Welcome back
          </Typography>
          <Typography textColor="gray" level="body1" textAlign="center">We&apos;ll check if you have an email</Typography>
        </div>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="johndoe@email.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" placeholder="password" />
        </FormControl>

        <Divider>
          or
        </Divider>

        <button className="login-with-google-btn" onClick={()=>{}}>
          Sign in with Google
        </button>

        <Button onClick={function (){}} style={{marginTop: 20}} variant="solid">
          Continue
        </Button>
        <Typography
          endDecorator={<Link href="/Register">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}>
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}
