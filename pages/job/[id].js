import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getJob } from '../api/getJob'
import prisma from 'lib/prisma'
import Link from 'next/link'
import Loading from 'components/Loading';
import { signIn } from "next-auth/react";

export default function Job({ job }) {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const router = useRouter();
  
    if (loading) {
        return (
         <Loading/>
        );
    
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
        <div className='text-center p-4 m-4'>
          <h2 className='mb-10 text-4xl font-bold'>{job.title}</h2>
        </div>
  
        <div className='mb-4 mt-20'>
          <div className='pl-16 pr-16 -mt-6'>
            <p className='text-base font-normal mt-3'>{job.description}</p>
            <div className='mt-4'>
              <h4 className='inline'>Posted by {job.user.companyName}</h4>
              <div className='inline'>
                <div className='ml-3 -mt-6 inline'>
                  
                </div>
              </div>
            </div>
          
          </div>
        
        </div>
      {session ? <p className="text-center">Apply</p> :  
      <a  onClick={() => signIn({ callbackUrl: '/api/auth/signin' })} class="inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-center">SIGN IN TO APPLY</a>
    } 
      </div>
    )
  }
  
  
  export async function getServerSideProps(context) {
    let job = await getJob(context.params.id, prisma)
    job = JSON.parse(JSON.stringify(job))
  
    return {
      props: {
        job,
      },
    }
  }