import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import TwitterProvider from "next-auth/providers/twitter";
import EmailProvider from 'next-auth/providers/email'
const nodemailer = require("nodemailer");
import { createTransport } from "nodemailer"

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
  }),
  TwitterProvider({
    clientId: process.env.TWITTER_ID,
    clientSecret: process.env.TWITTER_SECRET,
    version: "2.0", // opt-in to Twitter OAuth 2.0
  }),
  EmailProvider({
    server: {
       host: process.env.EMAIL_SERVER_HOST,
       port: process.env.EMAIL_SERVER_PORT,
       auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        type: 'OAuth2',
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
       },
    },
    from: process.env.EMAIL_FROM,
    
 }),
  ],
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  debug: true,
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.userid = user.id;
      session.company = user.companyName;
      session.userName = user.userName;
      return session
    },
   
  }
})

