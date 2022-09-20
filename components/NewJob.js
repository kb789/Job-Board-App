import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from 'components/Loading';

import Image from 'next/image'
import paper from '/public/paper.jpg'

export default function NewJob() {

	const { data: session } = useSession();
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [salary, setSalary] = useState('');
	const [loading, setLoading] = useState(false)
  
	if (!session || !session.user) return null;

	const submitJob = async (event) => {
		
		event.preventDefault();
		setLoading(true);
		const res = await fetch('/api/addJob', {
		  body: JSON.stringify({
			title: title,
			description: description,
			location: location,
			salary: salary
		  }),
		  headers: {
			'Content-Type': 'application/json',
		  },
		  method: 'POST',
		});
		
		router.push('/');
	  };
     
	  if (loading) {
		return (
		 <Loading/>
		);
	
	  }
	
 
    return (
      
      

	
		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">
				
				<div className="w-full xl:w-3/4 lg:w-11/12 flex">
			
					<div
						className="w-full h-auto  hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
							<Image src={paper}/></div>
					
					<div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 className="pt-4 text-2xl text-center">Post a job listing!</h3>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={submitJob}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
										Title
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="title"
										type="text"
										placeholder="Job Title"
										onChange={(e)=>setTitle(e.target.value)}
									/>
							</div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700">
										Description
									</label>
									<textarea
            className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary '
            rows={2}
            cols={50}
            placeholder="Job Description"
            name='description'
            onChange={(e) => setDescription(e.target.value)}
          />
							</div>
							<div className="mb-10 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-bold text-gray-700">
										Location
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="location"
										type="text"
										placeholder="Job Location"
										onChange={(e) => setLocation(e.target.value)}
									/>
								</div>
								<div className="md:ml-2">
									<label className="block mb-2 text-sm font-bold text-gray-700">
										Salary
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="salary"
										type="text"
										placeholder="Starting Salary"
										onChange={(e) => setSalary(e.target.value)}
									/>
								</div>
							</div>
							
							
							<div className="mb-6 mt-10 pt-10 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-slate-400 rounded-full hover:bg-slate-600 focus:outline-none focus:shadow-outline"
									type="submit"
								>
									Post Job
								</button>
							</div>
							
						</form>
					</div>
				</div>
			</div>
		</div>
	
    )}