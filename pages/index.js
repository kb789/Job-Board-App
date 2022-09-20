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
import hiring from '/public/hiring.png'
import Link from 'next/link'

export default function Home({ jobs }) {
 
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
     
      router.push('/home');
     
    }

    
    
    return (
     
      <div>
    <NavBarLo/>
    <div className="mx-auto text-center max-w-3xl px-10">
      
    <Image alt="hiring" src={hiring}
    
    width={320} height={180}/>
    
    {jobs.map((job)=> {
    return ( 
      (job.published) &&
		<div className="mb-10 px-6 pt-2 pb-4 bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col">
      <p className="mb-3 text-gray-400 text-sm">{job.location}</p>
  
      <h3 className="mb-2 text-2xl font-semibold text-gray-900">{job.title}</h3>
     
      <Link href={`/job/${job.id}`}>
      <p className="mt-4 text-teal-500 hover:text-teal-900">APPLY NOW</p>
      </Link>
</div>
    
    )})}
		</div>
      </div>
    )
    
  
}

export async function getServerSideProps() {
  
  let init_jobs = await getJobs(prisma);
  let jobs = JSON.parse(JSON.stringify(init_jobs));
  
    return {
      props: { 
        jobs
    }, 
  }
  }
