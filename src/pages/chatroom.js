import { useContext, useMemo, useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuthStateHook } from "../hooks/useAuthState";
import { AuthContext, firestore } from "./_app";
const OldMessages = dynamic(() => import("../components/oldMessages"), {
  loader: () => "Loading...",
});
const NewMessages = dynamic(() => import("../components/newMessages"), {
  loader: () => "Loading...",
});
const MessageForm = dynamic(() => import("../components/form"), {
  loader: () => "Loading...",
});
export default function ChatRoom({ messages }) {
  const { auth } = useContext(AuthContext);
  const spanRef = useRef();
  const [user] = useAuthState(auth);
  const messagesRef = useMemo(() => collection(firestore, "messages"), []);
  useAuthStateHook(user, (user, push) => (!user ? push("/") : null));
  return (
    <>
      <Head>
        <meta name="description" content="A ChatRoom for friends and family" />
        <title>ChatRoom</title>
      </Head>
      <section>
        <OldMessages messages={messages} />
        <NewMessages messagesRef={messagesRef} />
        <span className="scroll" ref={spanRef}></span>
      </section>
      <MessageForm messagesRef={messagesRef} spanRef={spanRef} />
    </>
  );
}

export async function getServerSideProps(context) {
  let messagesArr = [];
  const messagesRef = collection(firestore, "messages");
  (await getDocs(query(messagesRef, limit(70)))).forEach((message) => {
    messagesArr = [...messagesArr, message.data()];
  });

  return {
    props: {
      messages: JSON.parse(JSON.stringify(messagesArr)),
    },
  };
}
