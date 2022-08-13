import { getSession } from 'next-auth/react';
import prisma from 'lib/prisma';
export default async function handler(req, res) {


    if (req.method !== 'POST') {
        return res.status(501).end()
      }
      if (req.method === 'POST') {   


const session = await getSession({ req })
const id = session.userid;
console.log(req.userName);

if (req.body.userName) {

const updateUserName = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      userName: req.body.userName,
    },
  })
} else {

  const updateCompany = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      companyName: req.body.companyName,
    },
  })



}

  res.end()
  return;
  }
  
};

