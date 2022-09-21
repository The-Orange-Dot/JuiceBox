import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { username, token, command, message } = req.body;

    const get_header = {
      headers: <HeadersInit>{
        Authorization: `Bearer ${token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
      },
    };

    const header = {
      headers: <HeadersInit>{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
      },
    };

    const user_promise = await fetch(
      `https://api.twitch.tv/helix/users?login=${username}`,
      get_header
    );
    const user_id = await user_promise.json();

    if (command === "init") {
      const chat_settings_promise = await fetch(
        `https://api.twitch.tv/helix/chat/settings?broadcaster_id=${user_id.data[0].id}`,
        get_header
      );
      const chat_settings = await chat_settings_promise.json();
      console.log(chat_settings.data[0]);
      res.status(200).send({ msg: chat_settings.data[0] });
    }

    if (command === "announcement") {
      await fetch(
        `https://api.twitch.tv/helix/chat/announcements?broadcaster_id=${user_id.data[0].id}&moderator_id=${user_id.data[0].id}`,
        {
          method: "POST",
          body: JSON.stringify({ message: message }),
          headers: <HeadersInit>{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Client-Id": process.env.TWITCH_CLIENT_ID,
          },
        }
      );
      console.log("Announcement sent");
      res.status(200).send({ msg: "Announcement sent" });
    }

    if (
      command === "follower_mode" ||
      command === "subscriber_mode" ||
      command === "emote_mode" ||
      command === "unique_chat_mode"
    ) {
      await fetch(
        `https://api.twitch.tv/helix/chat/settings?broadcaster_id=${user_id.data[0].id}&moderator_id=${user_id.data[0].id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ [command]: message }),
          ...header,
        }
      );
      console.log(`${command} set to ${message}`);
      res.status(200).send({ msg: `${command} set to ${message}` });
    }
  } else {
    res.status(501).send({ msg: "Could not find request method" });
  }
}
