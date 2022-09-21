import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "openid moderator:read:chat_settings moderator:manage:chat_settings moderator:manage:announcements channel:read:subscriptions user:read:email moderation:read chat:read chat:edit",
        },
      },
    }),

    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      const promise = await fetch("https://id.twitch.tv/oauth2/validate", {
        headers: { Authorization: `OAuth ${token.accessToken}` },
      });
      const oauth = await promise.json();
      return token;
    },
    async session({ session, token, user }: any) {
      session.userToken = token.accessToken;

      await fetch(`${process.env.NEXTAUTH_URL}/api/chatBot/bot`, {
        method: "POST",
        body: JSON.stringify({
          token: token,
        }),
        headers: { "Content-Type": "application/json" },
      });
      return session;
    },
  },
};
export default NextAuth(authOptions);
