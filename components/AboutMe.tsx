'use client'

import Image from 'next/image'
import ContactForm from '../components/ContactForm'
import Socials from './Socials'
import Experience from './Experience'
import { skillsData } from '../lib/data'

export default function AboutMe() {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24'>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
				{/* Left Column: Bio & Image */}
				<div className='lg:col-span-4 space-y-8'>
					<div className='relative w-48 h-48 mx-auto lg:mx-0'>
						<Image
							className='rounded-2xl shadow-xl object-cover'
							fill
							src='/images/headshots/me.jpg'
							alt='Jeff Hogg headshot'
						/>
						{/* Decorative blob behind image */}
						<div className='absolute -z-10 -top-4 -right-4 w-full h-full bg-indigo-100 rounded-2xl' />
					</div>

					<div>
						<h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-4'>
							About Me
						</h2>
						<p className='text-lg text-gray-500 leading-relaxed'>
							I'm a software developer with a passion for building clean,
							enterprise-level applications. Whether it's complex Angular
							dashboards or modern Next.js sites, I focus on performance and
							user experience.
						</p>
						<div className='mt-6'>
							<Socials />
						</div>
					</div>
				</div>

				{/* Right Column: Experience, Skills, Form */}
				<div className='lg:col-span-8 space-y-16'>
					{/* Experience Section */}
					<Experience />

					{/* Skills Section */}
					<div>
						<h3 className='text-2xl font-bold text-gray-900 mb-6'>
							Technical Skills
						</h3>
						<div className='grid gap-6 sm:grid-cols-2'>
							{skillsData.map((skill) => (
								<div
									key={skill.category}
									className='bg-gray-50 p-6 rounded-xl border border-gray-100'
								>
									<h4 className='font-semibold text-gray-900 mb-2'>
										{skill.category}
									</h4>
									<p className='text-gray-600 leading-relaxed'>{skill.list}</p>
								</div>
							))}
						</div>
					</div>

					{/* Contact Section */}
					<div id='contact-form'>
						<h3 className='text-2xl font-bold text-gray-900 mb-6'>
							Get in Touch
						</h3>
						<p className='text-gray-500 mb-8'>
							Have a project in mind or want to discuss the latest in tech? Send
							me a message below.
						</p>
						<ContactForm />
					</div>
				</div>
			</div>
		</div>
	)
}
