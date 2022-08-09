import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBarLo from 'components/NavBarLo';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { getJobs } from './api/jobs.js';

export default function Home({ jobs }) {
 
    const { data: session, status } = useSession();
    const router = useRouter();
  
    if (status === 'loading') {
      return null;
    }
  
    if (session) {
      router.push('/home');
    }
    console.log(jobs);
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


