import { useState, useContext, useCallback } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { usePromise } from "../hooks/usePromise";
import { AuthContext } from "../pages/_app";
function MessageForm({ messagesRef, spanRef }) {
  const [Message, setMessage] = useState("");
  const { auth } = useContext(AuthContext);
  const sendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      const [data, error] = await usePromise(
        addDoc(messagesRef, {
          text: Message,
          uid: auth.currentUser.uid,
          createdAt: serverTimestamp(),
          photoURL: auth.currentUser.photoURL,
        })
      ).finally(() => {
        setMessage("");
        spanRef.current.scrollIntoView({ behaviour: "smooth" });
      });
      if (error) {
        alert("failed to send your message please try again");
        console.log(error,'send message');
        return;
      }
      console.log(data, "data");
    },
    [Message]
  );
  const handleInputChange = useCallback(
    ({ target: { value } }) => setMessage(value),
    []
  );
  return (
    <form onSubmit={sendMessage}>
      <input
        type={"text"}
        value={Message}
        placeholder={"Write a message"}
        onChange={handleInputChange}
      />
      <button disabled={!Message} type={"submit"}>
        send
      </button>
    </form>
  );
}

export default MessageForm;
