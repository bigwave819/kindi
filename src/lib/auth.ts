import { betterAuth } from "better-auth";
import { db } from "./db"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin } from "better-auth/plugins/admin";
import { nextCookies } from "better-auth/next-js";

const adminRole = "admin";
const userRole = "user";

export const auth = betterAuth({
    appName: "Kindi Coffee Shop",
    baseURL: process.env.BASE_URL || 'http://localhost:3000', // Added fallback
    secret: process.env.BETTER_AUTH_SECRET!,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
    },
    session: {
        expiresIn: 604800, // 7 days
        updateAge: 86400, // 1 day
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5
        },
        disableSessionRefresh: true,
    },
    useSecureCookies: process.env.NODE_ENV === 'production',
    defaultCookieAttributes: {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production'
    },
    database: drizzleAdapter(db, {
        provider: 'pg'
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            prompt: "select_account", // ✅ Correct placement
            mapProfileToUser: (profile) => {
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: userRole,
                };
            },
        },
    },
    plugins: [
        admin({
            adminRoles: [adminRole],
            defaultRole: userRole,
        }),
        nextCookies(),
    ],
});