import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getJob } from '../api/getJob';
import { getAppsByJobId } from '../api/getAppsByJobId';

import prisma from 'lib/prisma'
import Link from 'next/link'
import Loading from 'components/Loading';

import { signIn } from "next-auth/react";
import Welcome from 'components/Welcome';


export default function Job({ job, app_users, app_users_ids }) {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const router = useRouter();
	  
  
    if (loading) {
        return (
         <Loading/>
        );
    
      }

      if (session && session.company=== 'unknown' && session.userName === 'unknown') {
     
        return <Welcome/>
       
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
        {job.title}
		</h1>
    <div className="mt-10 mx-auto text-left max-w-3xl px-10">
    <div className="mb-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
        
            <p className='text-xl font-semibold text-gray-900 mb-8'>{job.description}</p>
           
              <h4 className='inline text-center'>Posted by {job.user.companyName}</h4>
             
            {session && session.company === "unknown" ?
            !app_users.includes(session.userid) ?  <Link href={`/apply/${job.id}`}>
      <p className="mt-4 text-center text-teal-500 hover:text-teal-900">APPLY NOW</p>
      </Link> : 
     <Link href={`/application/${app_users_ids[session.userid] }`}>
     <p className="mt-4 text-center text-teal-500 hover:text-teal-900">VIEW YOUR APPLICATION</p>
     </Link>
      :
      ( session && session.company !== "unknown" ? 
      <div className="mt-10 text-center mx-auto">
      { job.published &&  <a
            href='#'
            className='flex items-center w-12  mt-1 text-base font-medium leading-6 text-gray-500 rounded-full hover:bg-color-accent-hover hover:color-accent-hover'
            onClick={async () => {
              const res = await fetch('/api/editJob', {
                body: JSON.stringify({
                  id: job.id,
                  status: false 
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              })

              if (res.status === 401) {
                alert('Unauthorized')
              }
              if (res.status === 200) {
                router.push('/')
              }
            }}
          >
            Make inactive
          </a> }
      { !job.published && <a
            href='#'
            className='flex items-center w-12 mt-1 text-base font-medium leading-6 text-gray-500 rounded-full hover:bg-color-accent-hover hover:color-accent-hover'
            onClick={async () => {
              const res = await fetch('/api/editJob', {
                body: JSON.stringify({
                  id: job.id,
                  status: true
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'POST',
              })

              if (res.status === 401) {
                alert('Unauthorized')
              }
              if (res.status === 200) {
                router.push('/')
              }
            }}
          >
            Make active
          </a> }
      </div>
      : <div>
         <a  onClick={() => signIn({ callbackUrl: '/api/auth/signin' })} class="inline-block text-teal-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 text-center">SIGN IN TO APPLY</a>
      </div>)
      } 
    </div>
    </div>
           </div>     
    )
  }

  
  export async function getServerSideProps(context) {
    let job = await getJob(context.params.id, prisma);
    job = JSON.parse(JSON.stringify(job));
    let applications = await getJob(job.id, prisma);
    applications = JSON.parse(JSON.stringify(applications));
    let app_users=[];
    let app_users_ids={}
    applications.applications.forEach((app)=>{
     
      app_users.push(app.userId);
      app_users_ids[app.userId]=app.id
    })

    return {
      props: {
        job,
        app_users,
        app_users_ids,
      },
    }
  }