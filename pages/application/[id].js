import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getApplication } from '../api/getApplication'


import prisma from 'lib/prisma'
import Link from 'next/link'
import Loading from 'components/Loading';

export default function Application({ application }) {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const router = useRouter();
    const query = router.query;

	  
  
    if (loading) {
        return (
         <Loading/>
        );
    
      }

      if (!session) {
        router.push('/');
      }

      if (session.userid !== application.user.id && application.userid !== application.job.userid ) {
        router.push('/');
      }
      
    
    return (
      <div className='flex flex-col w-1/2 mx-auto'>
        <div className='text-center p-4 m-4'>
          <Link href={`/`}>
            <a href='' className='mb-10 text-sm font-bold underline'>
              back
            </a>
          </Link>
        </div>
       
        
        <h1 className="mt-10 text-center text-3xl mb-10 font-extrabold tracking-tight text-gray-900">
        {application.firstname} {application.lastname}
		</h1>
    <div className="mt-10 mx-auto text-left max-w-3xl px-10">
    <div className="mb-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
        
            <p className='text-xl font-semibold text-gray-900 mb-8'>{application.address}</p>
            <p className='text-xl font-semibold text-gray-900 mb-8'>{application.email}</p>
            <p className='text-xl font-semibold text-gray-900 mb-8'>{application.job.title}</p>
            <Link href={application.resumeurl}>
        <p class="mt-2 text-teal-500 hover:text-teal-900">RESUME</p>
        </Link>
          
    </div>
           </div>     
           </div>
    )
  }

  
  export async function getServerSideProps(context) {
    let application = await getApplication(context.params.id, prisma)
    application = JSON.parse(JSON.stringify(application))
   
  
  
    return {
      props: {
        application,
      
      },
    }
  }