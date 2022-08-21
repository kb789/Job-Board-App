import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
 
   if (req.method !== 'POST' && req.method !== 'DELETE') {
      return res.status(501).end()
    }
   
  const session = await getSession( {req});
  console.log(session.userid)

    if (req.method === 'POST') {
      await prisma.application.create({
        data: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          address: req.body.address,
          phone: req.body.phone,
          email: req.body.email,
          resumeurl: req.body.resumeurl,
         
          user: {
            connect: { id: session.userid },
          },
          job: {
            connect: { id: req.body.jobid },
          },

        },
      })
      res.end()
      return
    }
}