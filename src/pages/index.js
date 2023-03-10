import { useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../components/signIn";
import { useAuthStateHook } from "../hooks/useAuthState";
import { AuthContext } from "./_app";

export default function Home() {
  const { auth } = useContext(AuthContext);
  const [user] = useAuthState(auth);
  useAuthStateHook(user, (user, push) => (user ? push("/chatroom") : null));
  return (
    <>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login Page Of The Chatroom" />
        <meta
          name="google-site-verification"
          content="kPO1Td6JI9ujjZbmjCurrhlFS8VgUKO4dn8QO_v2QMU"
        />
      </Head>
      <SignIn />
    </>
  );
}
