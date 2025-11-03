import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"


export const authClient = createAuthClient({
    baseURL: process.env.BASE_URL || 'https://kindicoffeeshop.vercel.app',
    plugins: [
        adminClient()
    ]
})

export const { signIn, signOut, signUp, useSession, getSession } = authClient