import prisma from 'lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).end()
  }


  if (req.method === 'POST') {
		const id = req.body.id
        
        const session = await getSession({ req })
const userid = session.userid;
    const job = await prisma.job.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })

    if (job.user.id !== userid) {
      res.status(401).end()
      return
    }

    try {
    const updateJob = await prisma.job.update({
        where: {
          id: id,
        },
        data: {
          published: req.body.status,
        },
      })
    } catch (e) {
     console.log(e);
    }
    } 
    res.end()
  return;
}