import { useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useAuthStateHook } from "../hooks/useAuthState";
import { AuthContext } from "./_app";

const SignIn = dynamic(() => import("../components/signIn"), {
  loader: () => "Loading...",
});

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
