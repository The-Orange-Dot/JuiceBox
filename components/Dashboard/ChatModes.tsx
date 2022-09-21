import React, { useEffect, useState } from "react";
import { closeMenu } from "../../redux/reducers/menuSlice";
import { useDispatch } from "react-redux";
import { Button, Box, Grid, Switch } from "@mui/material";
import styles from "../../styles/MobileControls.module.scss";
import { chatModeHandler } from "../../components/ChatFunctions/chatModes";
import { useSession } from "next-auth/react";

const ChatModes = () => {
  const { data: session } = useSession();

  const [followerMode, setFollowerMode] = useState(false);
  const [subMode, setSubMode] = useState(false);
  const [emoteMode, setEmoteMode] = useState(false);
  const [uniqueOnlyMode, setUniqueOnlyMode] = useState(false);
  const dispatch = useDispatch();

  const buttonsArray = [
    {
      name: "Followers Only Chat",
      command: "follower_mode",
      state: followerMode,
      fn: setFollowerMode,
    },
    {
      name: "Subscribers Only Chat",
      command: "subscriber_mode",
      state: subMode,
      fn: setSubMode,
    },
    {
      name: "Emotes Only Chat",
      command: "emote_mode",
      state: emoteMode,
      fn: setEmoteMode,
    },
    {
      name: "Unique Chat",
      command: "unique_chat_mode",
      state: uniqueOnlyMode,
      fn: setUniqueOnlyMode,
    },
  ];

  const chatModeButtons = buttonsArray.map((button) => {
    return (
      <Button
        className={styles.controls__buttons}
        key={button.command}
        fullWidth
        onClick={() =>
          chatModeHandler(
            button.command,
            session?.user?.name as String,
            session?.userToken as String,
            button.state ? false : true,
            button.fn
          )
        }
      >
        <Box className={styles.controls__buttons__content}>
          {button.name} (Is {button.state ? "on" : "off"})
          <Switch checked={button.state} />
        </Box>
      </Button>
    );
  });

  useEffect(() => {
    dispatch(closeMenu());

    if (session && session.user) {
      fetch("api/streamActions", {
        method: "POST",
        body: JSON.stringify({
          username: session.user.name,
          token: session.userToken,
          command: "init",
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setFollowerMode(data.msg.follower_mode);
          setSubMode(data.msg.subscriber_mode);
          setEmoteMode(data.msg.emote_mode);
          setUniqueOnlyMode(data.msg.unique_chat_mode);
        });
    }
  }, [session]); //eslint-disable-line

  return { chatModeButtons };
};

export default ChatModes;
