// better-auth-cli.config.ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    database: {
        type: "postgresql",
        url: process.env.DATABASE_URL!
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});