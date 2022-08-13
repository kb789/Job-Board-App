import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBarLo from 'components/NavBarLo';
import Loading from 'components/Loading';
import Welcome from 'components/Welcome';
import prisma from 'lib/prisma'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getJobs } from './api/jobs';



export default function Home({ }) {
 
    const { data: session, status } = useSession();
    const router = useRouter();
  
    if (status === 'loading') {
      return <Loading/>
    }
    
    if (session && session.company=== 'unknown' && session.userName === 'unknown') {
     
      return <Welcome/>
     
    }
    
    if (session && session.company==="unknown" && session.userName!=="unknown") {
      router.push('/jobhome')
     
    }

    if (session && session.company!=="unknown" && session.userName==="unknown") {
      console.log(session);
      router.push('/home');
     
    }

   
    
    return (
      <div>
    <NavBarLo/>
      <div className='mt-10'>
        
        <div className='text-center p-4 border m-4'>
          <h2 className='mb-10'>Join the conversation!</h2>
          <a
            className='border px-8 py-2 mt-5 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover-darker'
            href='/api/auth/signin'
          >
            login
          </a>
        </div>
        </div>
      </div>
    )
    
  
}

export async function getServerSideProps() {
  
  let init_jobs = await getJobs(prisma);
  let jobs = JSON.parse(JSON.stringify(init_jobs));
  console.log(jobs);
    return {
      props: { 
        jobs
    }, 
  }
  }
