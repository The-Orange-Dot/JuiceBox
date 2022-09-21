import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const token = req.body.userToken;
    const username = req.body.user.name;

    if (token) {
      const headers = {
        headers: <HeadersInit>{
          Authorization: `Bearer ${token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID,
        },
      };

      const broadcaster_promise = await fetch(
        `https://api.twitch.tv/helix/users?login=${username}`,
        headers
      );
      const { data } = await broadcaster_promise.json();
      const id = data[0].id;

      const followers_promise = await fetch(
        `https://api.twitch.tv/helix/users/follows?to_id=${id}`,
        headers
      );
      const subs_promise = await fetch(
        `https://api.twitch.tv/helix/subscriptions?broadcaster_id=${id}`,
        headers
      );
      const followers = await followers_promise.json();
      const subs = await subs_promise.json();

      const userData = {
        username: username,
        view_count: data[0].view_count,
        follower_count: followers.total,
        description: data[0].description,
        image: data[0].profile_image_url,
        type: data[0].type,
        created_at: data[0].created_at,
        total_subs: subs.total,
        sub_points: subs.points,
      };

      res.status(200).send({ data: userData });
    }
  } else {
    res.status(501).send({ msg: "Could not connect to api" });
  }
}
