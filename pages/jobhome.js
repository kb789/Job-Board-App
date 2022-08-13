import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NewJob from 'components/NewJob';
import NavBar from 'components/NavBar';
import Loading from 'components/Loading';

export default function JobHome() {
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
        <>
       <NavBar/>
           <div>Individual users jobs go here</div>
        </>
             
      );

}