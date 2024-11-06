import { createAuthClient } from "better-auth/react";
const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL as string, // the base url of your auth server,
});

export const { signUp, signIn, useSession, signOut } = authClient;
