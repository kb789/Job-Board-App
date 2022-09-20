import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NewJob from 'components/NewJob';
import NavBar from 'components/NavBar';
import Loading from 'components/Loading';
import { getJobs } from './api/jobs';
import { getApplications } from './api/applications';

import prisma from 'lib/prisma';
import Link from 'next/link';


export default function Home({ jobs, applications }) {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const router = useRouter();
  
    
    if (loading) {
      return (
       <Loading/>
      );
  
    }
    if (!session) {
      router.push('/');
    }
    
    return (
     
      <div>
    <NavBar/>
    <div className="mx-auto text-center max-w-3xl px-10">
    
    <h1 className="text-center text-3xl mb-10 font-extrabold tracking-tight text-gray-900 pt-10">
   Welcome, {session.company}
        </h1>
        <h2 className="text-center text-2xl mb-10 font-bold tracking-tight text-gray-900 pt-10">
          Jobs You Have Posted
        </h2>
    
    {jobs.map((job)=> {
    return (
    job.userId === session.userid &&   
	(	<div className="mb-10 px-6 pt-2 pb-4 bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col">


    
      <p className="mb-3 text-gray-400 text-sm">{job.location}</p>
     
      <h3 className="mb-3 text-2xl font-semibold text-gray-900">{job.title}</h3>
      {job.published ? 
      <div className="text-yellow-400 mb-5"><span className="text-black">Status:</span> ACTIVE</div>
       : <div className="text-gray-400 mb-5"><span className="text-black">Status:</span> INACTIVE</div> }
      
      <Link href={`/job/${job.id}`}>
      <p className="underline mt-1 text-teal-500 hover:text-teal-900">Edit job</p>
      </Link>
      <p className="mt-6 text-gray-600 text-md">APPLICANTS:</p>
  
      {applications.map((app)=> {
    return (
      job.id === app.jobId &&   (
   
      
     
      <Link href={`/application/${app.id}`}><p className="mt-2 text-teal-500 hover:text-teal-900">{app.lastname}, {app.firstname}</p></Link>
      )
    )})}
</div>)
    )})}


    
		</div>
      </div>
    )

}

export async function getServerSideProps() {
 
  
  let init_jobs = await getJobs(prisma);
  let jobs = JSON.parse(JSON.stringify(init_jobs));

  let init_applications = await getApplications(prisma);

  let applications = JSON.parse(JSON.stringify(init_applications));
 
    return {
      props: { 
        jobs,
        applications,
    }, 
  }
  }