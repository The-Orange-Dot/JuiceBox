import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const MainHeader = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session);

  useEffect(() => {
    if (session?.user) {
      fetch(`api/user/${session.user.name}`, {
        method: "POST",
        body: JSON.stringify(session),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [session]);

  return (
    <div>
      {status === "authenticated" ? (
        <>
          <Button
            variant="contained"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Go to dashboard
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              signOut();
            }}
          >
            Log Out
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            signIn();
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default MainHeader;
