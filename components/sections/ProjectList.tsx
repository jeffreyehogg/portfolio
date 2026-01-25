'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { projectsData } from '../../lib/data'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import BackgroundBlobs from '../ui/BackgroundBlobs'

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
}

const itemVariants: Variants = {
	hidden: { y: 30, opacity: 0 },
	visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } },
}

export default function ProjectList() {
	return (
		<section className='relative py-24 bg-gray-50'>
			{/* Background Blobs */}
			<BackgroundBlobs />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<h2 className='text-indigo-600 font-semibold tracking-wide uppercase text-sm'>
						My Work
					</h2>
					<h3 className='mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl'>
						Featured Projects
					</h3>
					<p className='mt-4 text-xl text-gray-500'>
						A selection of enterprise work and personal applications.
					</p>
				</div>

				<motion.div
					className='grid gap-10 lg:grid-cols-3'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.1 }}
				>
					{projectsData.map((project) => (
						<motion.div
							key={project.title}
							variants={itemVariants}
							className='group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100'
						>
							{/* Image Section with Overlay */}
							<div className='relative h-64 overflow-hidden'>
								<div className='absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors duration-300 z-10' />
								<Image
									className='object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110'
									src={project.imageUrl}
									alt={project.title}
									fill
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								/>
							</div>

							{/* Content Section */}
							<div className='flex-1 p-8 flex flex-col'>
								<div className='flex-1'>
									<div className='flex justify-between items-start'>
										<h4 className='text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors'>
											{project.title}
										</h4>
										<a
											href={project.href}
											target='_blank'
											rel='noopener noreferrer'
											className='text-gray-400 hover:text-indigo-600 transition-colors'
										>
											<ArrowTopRightOnSquareIcon className='h-6 w-6' />
										</a>
									</div>

									<p className='mt-4 text-base text-gray-500 leading-relaxed'>
										{project.description}
									</p>

									<div className='mt-6 flex flex-wrap gap-2'>
										{project.tags.map((tag) => (
											<span
												key={tag}
												className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100'
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
