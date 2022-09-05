import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NewJob from 'components/NewJob';
import NavBar from 'components/NavBar';
import Loading from 'components/Loading';
import { getJobs } from './api/jobs';
import { getApplications } from './api/applications';
import Link from 'next/link';

import prisma from 'lib/prisma';

export default function JobHome( {jobs, applications, noApps, hasApps, appUsers}) {
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
      <div class="mx-auto text-center max-w-3xl px-10">
      
      <h1 class="text-center text-3xl mb-10 font-extrabold tracking-tight text-gray-900 pt-10">
     Welcome, {session.userName}
          </h1>
        

<h2 class="text-center text-2xl mb-10 font-bold tracking-tight text-gray-900 pt-10">
     Jobs You Can Apply For:
          </h2>
        	<>
  
      {jobs.map((job)=> {
    return (
      (noApps.includes(job.id) ||  appUsers[job.id].includes(session.userid)===false) && (job.published) &&  (
        <div class="mb-10 px-6 pt-2 pb-4 bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col">
        <p class="mb-3 text-gray-400 text-sm">{job.location}</p>
  
        <h3 class="mb-2 text-2xl font-semibold text-gray-900">{job.title}</h3>
       
        <Link href={`/job/${job.id}`}>
        <p class="mt-4 text-teal-500 hover:text-teal-900">APPLY NOW</p>
        </Link>
        </div>
      )
    )
    })}
</>
   


<h2 class="text-center text-2xl mb-10 font-bold tracking-tight text-gray-900 pt-10">
     Job's you've applied for:
          </h2>
        
      {applications.map((app)=> {
      return (
      app.userId === session.userid &&   
    (	<div class="mb-10 px-6 pt-2 pb-4 bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col">
  
  
        
        <p class="mb-3 text-gray-400 text-sm">{app.job.location}</p>
       
        <h3 class="mb-1 text-2xl font-semibold text-gray-900">{app.job.title}</h3>
  
        
       
        <Link href={app.resumeurl}>
        <p class="mt-2 text-teal-500 hover:text-teal-900">VIEW YOUR APPLICATION</p>
        </Link>
       
  </div>)
      )})}
      </div>
        </div>
             
      );

}

export async function getServerSideProps() {
 
  
  let init_jobs = await getJobs(prisma);
  let jobs = JSON.parse(JSON.stringify(init_jobs));

  let init_applications = await getApplications(prisma);

  let applications = JSON.parse(JSON.stringify(init_applications));
  let jobIds=[];
  let appIds=[];
  let noApps=[]
  let hasApps=[];
  let appUsers={};
  jobs.forEach((job)=> {
  jobIds.push(job.id);
  })
  applications.forEach((app)=>{
  appIds.push(app.jobId);
  })
  
  

   jobIds.forEach((jobId)=>{
    if (!appIds.includes(jobId)){
    noApps.push(jobId);
    } else{
      hasApps.push(jobId);
    }

   })
    
   applications.forEach((app)=>{
    if (hasApps.includes(app.jobId)){
      if (Object.hasOwn(appUsers, app.jobId)) {
       appUsers[app.jobId].push(app.userId)
      } else {
        appUsers[app.jobId]=[app.userId]
      }
    }
   })

  
    return {
      props: { 
        jobs,
        applications,
        noApps,
        hasApps,
        appUsers,
    }, 
  }
  }