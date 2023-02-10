import { useContext, useCallback, useRef } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../pages/_app";

function SignIn() {
  const { auth } = useContext(AuthContext);
  const signInRef = useRef();
  const handleLogin = useCallback((provider) => {
    return () => {
      try {
        signInWithPopup(auth, provider);
      } catch (error) {
        console.log("signin error", error);
        alert("failed to sign in");
      }
    };
  }, []);
  return (
    <button
      className="sign-in"
      id="google"
      ref={signInRef}
      onClick={handleLogin(new GoogleAuthProvider())}
    >
      Sign with google
    </button>
  );
}

export default SignIn;
