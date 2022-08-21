import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NewJob from 'components/NewJob';
import NavBar from 'components/NavBar';
import Loading from 'components/Loading';

export default function Home() {
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
    console.log(session);
    return (
        <>
       <NavBar/>
           <NewJob/>
        </>
             
      );
    }