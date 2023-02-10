import { createContext, useMemo } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import SignOut from "../components/signOut";
import "../styles/globals.css";

export const AuthContext = createContext({ auth: null });

export default function App({ Component, pageProps }) {
  const app = useMemo(
    () =>
      initializeApp({
        apiKey: "AIzaSyBv3Clx3Z8YCBxtqe89efAbsBlhtAjeavg",
        authDomain: "messaging-app-98837.firebaseapp.com",
        projectId: "messaging-app-98837",
        storageBucket: "messaging-app-98837.appspot.com",
        messagingSenderId: "194519848762",
        appId: "1:194519848762:web:85971f3ae04d821f1e6203",
        measurementId: "G-P2ZES8CKF5",
      }),
    []
  );
  const auth = useMemo(() => getAuth(app), []);
  return (
    <AuthContext.Provider value={{ auth }}>
      <div className="app">
        <header>
          <h1>⚛️🔥💬</h1>
          {auth.currentUser && <SignOut />}
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </AuthContext.Provider>
  );
}
