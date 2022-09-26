import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import { Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { openMenu } from "../../redux/reducers/menuSlice";
import { signOut } from "next-auth/react";
import MobileControls from "../../pages/mobileControls";
import styles from "./Dashboard.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Dashboard = () => {
  const accessToken = useSelector(
    (state: RootState) => state.credentials.oauth
  );
  const [listening, setListening] = useState(false);
  const [chat, setChat] = useState([]);
  const [openChatControls, setOpenChatControls] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!listening) {
      const events = new EventSource(
        `http://localhost:3000/api/chatBot/bot?username=the_orange_dot&token=${accessToken}`
      );

      console.log(events);

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setChat((chat) => chat.concat(parsedData));
        console.log(event.data);
        console.log(parsedData);
      };
    }

    setListening(true);
  }, [listening, chat, accessToken]);

  useEffect(() => {
    if (session && session.user && status === "authenticated") {
      fetch(`api/user/${session.user.name}`, {
        method: "PATCH",
        body: JSON.stringify(session),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [status]); //eslint-disable-line

  return (
    <div>
      <NavBar />
      <Button
        onClick={() => {
          dispatch(openMenu());
        }}
      >
        Menu
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          signOut();
        }}
      >
        Log Out
      </Button>
      <Box>
        <Typography>Chat</Typography>
        {chat.map((msg) => (
          <Typography key={msg}>{msg}</Typography>
        ))}
      </Box>
      <Box className={styles.controls}>
        <Button
          className={styles.controls__open_button}
          onClick={async () => {
            await setOpenChatControls(!openChatControls);
            window.scroll({
              top: 500,
              behavior: "smooth",
            });
          }}
        >
          Menu
        </Button>
        <Box className={styles.controls__container}>
          {openChatControls ? <MobileControls /> : null}
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
