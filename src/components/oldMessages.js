import ChatMessage from "./message";

export default function OldMessages({ messages }) {
  return (
    messages && messages?.map((i, ind) => <ChatMessage {...i} key={ind + 1} />)
  );
}
