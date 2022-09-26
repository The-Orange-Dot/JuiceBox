import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  addOauth,
  addRefreshToken,
  addCode,
} from "../../redux/reducers/credentialsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MainHeader = () => {
  const accessToken = useSelector(
    (state: RootState) => state.credentials.oauth
  );
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      fetch(`api/user/${session.user.name}`, {
        method: "POST",
        body: JSON.stringify(session),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(addOauth(session.userToken));
          dispatch(addRefreshToken(session.refreshToken));
        });
    }
  }, [session]); //eslint-disable-line

  const signInHandler = async () => {
    const res = await signIn();

    console.log(`Login Response: ${res}`);
  };

  const signOutHandler = async () => {
    fetch(
      `http://localhost:3000/api/chatBot/bot?username=the_orange_dot&token=${accessToken}`,
      { method: "DELETE" }
    );

    signOut();
  };

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
              signOutHandler();
            }}
          >
            Log Out
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            signInHandler();
          }}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default MainHeader;
