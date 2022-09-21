import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar";
import { Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { openMenu } from "../../redux/reducers/menuSlice";
import { signOut } from "next-auth/react";
import MobileControls from "../../pages/mobileControls";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
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
        <iframe
          src={`https://www.twitch.tv/embed/the_orange_dot/chat?parent=localhost&theme=dark`}
          height="650"
          width="100%"
        />
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
