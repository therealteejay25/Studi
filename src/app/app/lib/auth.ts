import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "./db"; // your mongodb client
// import { username } from "better-auth/plugins";
 
export const auth = betterAuth({

    adapter: mongodbAdapter(client.db()),

    user: {
        modelName: 'users',
        fields: {
            id: 'id',
            name: 'name',
            username: 'userName',
            email: 'email',
            emailVerified: 'emailVerified',
            image: 'userAvatar',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
    session: {
        modelName: 'sessions',
        fields: {
            id: 'id',
            userId: 'user_id',
            token: 'token',
            expiresAt: 'expiresAt',
            ipAddress: 'ipAddress',
            userAgent: 'userAgent',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    },
    account: {
        modelName: 'accounts',
        fields: {
            id: 'id',
            userId: 'userId',
            accountId: 'accountId',
            providerId: 'providerId',
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            refreshTokenExpiresAt: 'refreshTokenExpiresAt',
            accessTokenExpiresAt: 'accessTokenExpiresAt',
            scope: 'scope',
            idToken: 'idToken',
            password: 'password',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        }
    },
    verification: {
        modelName: 'verifications',
        fields: {
            id: 'id',
            identifier: 'identifier',
            value: 'value',
            expiresAt: 'expiresAt',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        } 
    },
    socialProviders: {
        google: {
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'google client id', //declare my google client id...
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY || 'google secret key', // declare my google secret key...
            mapProfileToUser: (profile) => {
                return {
                    firstName: 'profile.given_name',
                    lastName: 'profile.family_name',
                    image: 'profile.avatar_url',
                };
            },
        },
    }
});