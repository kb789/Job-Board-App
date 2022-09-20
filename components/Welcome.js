import Image from 'next/image'
import hire from '/public/hire.jpg'
import NavBarSo from 'components/NavBarSo';
import { state, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Welcome() {
  const { data: session } = useSession();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [company, setCompany] = useState("");
  
  if (!session || !session.user) return null;
 
const submitAddedName = async(event)=> {
 
event.preventDefault();
const res = await fetch('/api/updateUser', {
body: JSON.stringify(
 {
   userName: userName
 }),
headers: {
  'Content-Type': 'application/json'
},
method: 'POST'
})
router.push('/jobhome');
}

const submitCompanyName = async(event)=> {
 
  event.preventDefault();
  const res = await fetch('/api/updateUser', {
  body: JSON.stringify(
   {
     companyName: company
   }),
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST'
  })
  router.push('/home');
  }
  

    return (


      
        <div className="pb-8">
  <NavBarSo/>
        

  <h1 className="text-center text-3xl mb-10 font-extrabold tracking-tight text-gray-900 pt-10">
    Welcome to Job Board
        </h1>
  

        <div Name="mt-20 mx-auto text-center max-w-3xl px-10">
            

            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
                <div className="bg-gray-50 rounded-lg px-6 pb-8">
                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-teal-200 text-teal-500 flex-shrink-0">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>

          </div>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3 mt-2">Join To Apply to Job</h2>
            <form className="w-full max-w-sm" onSubmit={submitAddedName}>
  <div className="flex items-center border-b border-teal-500 py-2">
    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Create a username" aria-label="Full name" onChange={(e)=>setUserName(e.target.value)} ></input>
    <button type="submit" className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
      Join
    </button>
    
  </div>
</form>
          </div>
                </div>

                <div className="bg-gray-50 rounded-lg px-6 pb-8">
                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-teal-200 text-teal-500 flex-shrink-0">
                <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="peopleIconTitle" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" fill="none" color="currentColor"> <title id="peopleIconTitle">People</title> <path d="M1 18C1 15.75 4 15.75 5.5 14.25 6.25 13.5 4 13.5 4 9.75 4 7.25025 4.99975 6 7 6 9.00025 6 10 7.25025 10 9.75 10 13.5 7.75 13.5 8.5 14.25 10 15.75 13 15.75 13 18M12.7918114 15.7266684C13.2840551 15.548266 13.6874862 15.3832994 14.0021045 15.2317685 14.552776 14.9665463 15.0840574 14.6659426 15.5 14.25 16.25 13.5 14 13.5 14 9.75 14 7.25025 14.99975 6 17 6 19.00025 6 20 7.25025 20 9.75 20 13.5 17.75 13.5 18.5 14.25 20 15.75 23 15.75 23 18"/> <path strokeLinecap="round" d="M12,16 C12.3662741,15.8763472 12.6302112,15.7852366 12.7918114,15.7266684"/> </svg>

          </div>
          <div className="flex-grow">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-3 mt-2">Join to Post a Job</h2>
            <form className="w-full max-w-sm" onSubmit={submitCompanyName}>
  <div className="flex items-center border-b border-teal-500 py-2">
    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Enter Company Name" aria-label="Full name" onChange={(e)=>setCompany(e.target.value)}></input>
    <button type="submit" className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
      Join
    </button>
    
  </div>
</form>
          </div>
                </div>
                	
            </div>
        </div>

       
</div>
    

    )
}