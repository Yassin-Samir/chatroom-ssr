import { useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { AuthContext } from "../pages/_app";

function SignOut() {
  const { auth } = useContext(AuthContext);
  const { push } = useRouter();
  const HandleSignOut = useCallback(() => {
    try {
      signOut(auth).finally(() => push("/"));
    } catch (error) {
      console.log("signOut error", error);
      alert("failed to sign out");
    }
  }, [auth]);
  return <button onClick={HandleSignOut}>SignOut</button>;
}

export default SignOut;
