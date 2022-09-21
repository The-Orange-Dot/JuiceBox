import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { ConstructionOutlined } from "@mui/icons-material";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const body = req.body;

    // const broadcaster = await fetch(
    //   "GET https://api.twitch.tv/helix/users"
    // );
    // // const broadcaster_id = broadcaster.broadcaster_id;

    // console.log(broadcaster);

    res.status(200).send({ name: "Test" });
  }
}
