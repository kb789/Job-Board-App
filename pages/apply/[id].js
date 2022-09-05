import { getJob } from '../api/getJob';
import prisma from 'lib/prisma';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Loading from 'components/Loading';

export default function Apply({job}) {
  const router = useRouter();
    const [pdf, setPdf] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const uploadPhoto = async (event) => {
      event.preventDefault();
      setLoading(true);
      const file = pdf;
      const filename = Date.now().toString()+encodeURIComponent(file.name);
     
      const res = await fetch(`/api/upload-url?file=${filename}`);
      const { url, fields } = await res.json();
      
      let imageurl=url+filename;
      
     
      const formData = new FormData();
  
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const upload = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      if (upload.ok) {
        const res = await fetch('/api/addApplication', {
          body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          address: address,
          phone: phone,
          email: email,
          resumeurl: imageurl,
          jobid: job.id,

          }),
          headers: {
          'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        //setLoading(false);
        router.push("/");
      } else {
        console.error('Upload failed.');
      }
     
    };

    
    if (loading) {
      return (
       <Loading/>
      );
  
    }
  
    return (
      <>
      <div className="flex justify-center items-center  w-full bg-slate-200">
        <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Apply to {job.title} </h1>
        <div className='text-center p-4 m-4'>
            <Link href={`/job/${job.id}`}>
              <a href='' className='mb-10 text-sm font-bold underline'>
                back
              </a>
            </Link>
          </div>
        <form onSubmit={uploadPhoto}>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="first_name">First Name</label>
                <input className="border py-2 px-3 text-grey-800" type="text" name="first_name" id="first_name" onChange={(e) => setFirstname(e.target.value)}></input>
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="last_name">Last Name</label>
                <input className="border py-2 px-3 text-grey-800" type="text" name="last_name" id="last_name" onChange={(e) => setLastname(e.target.value)}></input>
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="address">Address</label>
                <textarea className="border py-2 px-3 text-grey-800" rows={4} cols={30} name="address" id="address" onChange={(e) => setAddress(e.target.value)}></textarea>
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="email">Phone</label>
                <input className="border py-2 px-3 text-grey-800" type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)}></input>
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="email">Email</label>
                <input className="border py-2 px-3 text-grey-800" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            
            <p className="my-2 font-bold text-lg text-gray-900">Upload your resume and cover letter as a .pdf or .doc</p>
        <input
         onChange={(e) => setPdf(e.target.files[0])}
          type="file"
          accept="application/pdf, application/msword"
        />
          
            <button className="mt-4 block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Submit Application</button>
        </form>
       
    </div>
</div>


      
      </>
      
    );
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