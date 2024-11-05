import { createAuthClient } from "better-auth/react"
 const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // the base url of your auth server,

})

export const {signUp,signIn,useSession,signOut} = authClient;
