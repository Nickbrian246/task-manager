import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUserSessionStatus() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const { data } = useSession();
  useEffect(() => {
    !!data?.user ? setIsSessionActive(true) : setIsSessionActive(false);
  }, [data?.user]);

  return isSessionActive;
}
