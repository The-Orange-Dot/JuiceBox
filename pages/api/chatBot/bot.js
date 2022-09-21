const tmi = require("tmi.js");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const username = req.body.token.name;
    const token = req.body.token.accessToken;
    const message = "Test";

    // Define configuration options
    const opts = {
      identity: {
        username: username.toLowerCase(),
        password: `oauth:${token}`,
      },
      channels: [username.toLowerCase()],
    };

    // Create a client with our options
    const client = new tmi.client(opts);

    // Connect to Twitch:
    client.connect();
    client.on("connected", onConnectedHandler);
    function onConnectedHandler(addr, port) {
      console.log(`* Connected to ${addr}:${port}`);
    }

    // Called every time a message comes in
    client.on("message", onMessageHandler);

    function onMessageHandler(target, context, msg, self) {
      if (self) {
        // Ignore messages from the bot
        return;
      }

      // Remove whitespace from chat message
      const commandName = msg.trim();

      // If the command is known, let's execute it
      if (commandName === "!test") {
        client.say(target, `Test Successful`);
        console.log(`* Test Successful`);
      } else {
        console.log(`* Test Failed`);
      }
    }

    if (message === "test") {
      client.say(target, `Test Successful`);
      console.log(`* Test Successful`);
    }
    res.status(200).send({ msg: "Success" });
  } else {
    res.status(501).send({ msg: "Could not connect to account" });
  }
}
