export const chatModeHandler = async (
  command: String,
  username: String,
  token: String,
  boolean: boolean,
  fn: Function
) => {
  if (token && username) {
    const res = await fetch("api/streamActions", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        token: token,
        command: command,
        message: boolean,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(`${data.msg} to ${boolean}`);
          fn(boolean);
        });
      }
    });
  }
};
