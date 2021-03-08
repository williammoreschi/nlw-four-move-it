import {NextApiRequest,NextApiResponse} from 'next';
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      }),
      Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      })
    ],  
};
export default (req:NextApiRequest,res:NextApiResponse): Promise<void> => NextAuth(req,res,options);