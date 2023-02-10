import { useMemo } from "react";
import { query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./message";

export default function NewMessages({ messagesRef }) {
  const currentDay = useMemo(() => new Date(), []);
  const [messages] = useCollectionData(
    query(messagesRef, where("createdAt", ">=", currentDay))
  );
  return (
    <>
      {messages && messages.map((i, ind) => <ChatMessage {...i} key={ind} />)}{" "}
    </>
  );
}
