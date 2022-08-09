import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image'
import paper from '/public/paper.jpg'

export default function NewJob() {

	const { data: session } = useSession();
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [salary, setSalary] = useState('');
  
	if (!session || !session.user) return null;

	const submitJob = async (event) => {
		console.log("called")
		event.preventDefault();
		
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
		
		router.reload(window.location.pathname);
	  };


    return (
      
      

	
		<div class="container mx-auto">
			<div class="flex justify-center px-6 my-12">
				
				<div class="w-full xl:w-3/4 lg:w-11/12 flex">
			
					<div
						class="w-full h-auto  hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
							<Image src={paper}/></div>
					
					<div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 class="pt-4 text-2xl text-center">Post a job listing!</h3>
						<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={submitJob}>
                        <div class="mb-4">
                            <label class="block mb-2 text-sm font-bold text-gray-700">
										Title
									</label>
									<input
										class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="title"
										type="text"
										placeholder="Job Title"
										onChange={(e)=>setTitle(e.target.value)}
									/>
							</div>
                        <div class="mb-4">
                            <label class="block mb-2 text-sm font-bold text-gray-700">
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
							<div class="mb-4 md:flex md:justify-between">
								<div class="mb-4 md:mr-2 md:mb-0">
									<label class="block mb-2 text-sm font-bold text-gray-700">
										Location
									</label>
									<input
										class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="location"
										type="text"
										placeholder="Job Location"
										onChange={(e) => setLocation(e.target.value)}
									/>
								</div>
								<div class="md:ml-2">
									<label class="block mb-2 text-sm font-bold text-gray-700">
										Salary
									</label>
									<input
										class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="salary"
										type="text"
										placeholder="Starting Salary"
										onChange={(e) => setSalary(e.target.value)}
									/>
								</div>
							</div>
							
							<div class="mb-10">
                            <label class="block mb-2 text-sm font-bold text-gray-700">
										Make active?
									</label>
									<input
										class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="active"
										type="text"
										placeholder="Make Job Description Active?"
									/>
							</div>
							<div class="mb-6 text-center">
								<button
									class="w-full px-4 py-2 font-bold text-white bg-slate-400 rounded-full hover:bg-slate-600 focus:outline-none focus:shadow-outline"
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