import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
   if (req.method !== 'POST' && req.method !== 'DELETE') {
      return res.status(501).end()
    }
   
    const session = await getSession({ req })
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (req.method === 'POST') {
      await prisma.job.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          location: req.body.location,
          salary: req.body.salary,
         
          user: {
            connect: { id: user.id },
          },
        },
      })
      res.end()
      return
    }
}