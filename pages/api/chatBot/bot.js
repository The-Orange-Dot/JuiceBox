import tmi from "tmi.js";
import express from "express";

export default async function handler(req, res) {
  const app = express();

  const username =
    req.method === "POST" ? req.body.username : req.query.username;
  const token =
    req.method === "POST" ? req.body.token.accessToken : req.query.token;

  const opts = {
    identity: {
      username: username.toLowerCase(),
      password: `oauth:${token}`,
    },
    channels: [username.toLowerCase()],
  };
  let client = tmi.client(opts);

  if (req.method === "POST") {
    // Connect to Twitch:
    client.connect();
    client.on("connected", onConnectedHandler);
    function onConnectedHandler(addr, port) {
      console.log(`* Connected to ${addr}:${port}`);
    }

    res.status(200).send({ msg: "Success" });
  } else if (req.method === "GET") {
    client.connect({ connection: { reconnect: true } });
    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);

    const onMessageHandler = (target, context, msg, self) => {
      if (self) return;

      if (msg) {
        const data = `data: ${JSON.stringify({
          msg: msg,
          target: target,
          context: context,
        })}\n\n`;
        res.write(data);
        console.log(data);
      }
    };

    client.on("message", onMessageHandler);
  } else if (req.method === "DELETE") {
    client.close().then(() => {
      console.log("Socket connection closed");
    });

    res.status(200).send({ msg: "Connection Closed" });
  } else {
    res.status(501).send({ msg: "Could not connect to account" });
  }
}
