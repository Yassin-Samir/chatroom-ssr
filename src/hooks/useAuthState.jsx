import { useEffect } from "react";
import { useRouter } from "next/router";

export function useAuthStateHook(user, callback) {
  const { isReady, push } = useRouter();
  useEffect(() => {
    if (!isReady) return;
    callback(user, push);
  }, [user, isReady]);
}
