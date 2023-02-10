import { Suspense, useContext } from "react";
import Image from "next/image";
import { AuthContext } from "../pages/_app";
function ChatMessage({ text, uid, photoURL }) {
  const { auth } = useContext(AuthContext);
  return (
    <div
      className={`message ${
        uid === auth.currentUser?.uid ? "sent" : "received"
      }`}
    >
      <Suspense fallback={<div className="spinner small"></div>}>
        <Image
          src={photoURL}
          width={100}
          height={100}
          alt="USER IMAGE"
          referrerPolicy="no-referrer"
        />
      </Suspense>
      <p>{text}</p>
    </div>
  );
}
export default ChatMessage;
