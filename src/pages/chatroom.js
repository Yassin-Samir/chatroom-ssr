import { useContext, useMemo, useRef } from "react";
import Head from "next/head";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuthStateHook } from "../hooks/useAuthState";
import { AuthContext, firestore } from "./_app";
import OldMessages from "../components/oldMessages";
import NewMessages from "../components/newMessages";
import MessageForm from "../components/form";
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
