'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { testimonialsData } from '../lib/data'

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
}

const itemVariants: Variants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { type: 'spring', stiffness: 50 },
	},
}

export default function Testimonials() {
	return (
		<section className='relative py-24 bg-white overflow-hidden'>
			{/* Background Blobs */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob' />
				<div className='absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000' />
				<div className='absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000' />
			</div>

			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<h2 className='text-indigo-600 font-semibold tracking-wide uppercase text-sm'>
						Testimonials
					</h2>
					<h3 className='mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl'>
						Trusted by Industry Leaders
					</h3>
					<p className='mt-4 text-xl text-gray-500'>
						Don&apos;t just take my word for it. Here&apos;s what others (might)
						have to say.
					</p>
				</div>

				<motion.div
					className='grid gap-8 lg:grid-cols-3'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.2 }}
				>
					{testimonialsData.map((testimony) => (
						<motion.div
							key={testimony.name}
							variants={itemVariants}
							className='relative flex flex-col bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1'
						>
							{/* 5-Star Rating */}
							<div className='flex gap-1 mb-6'>
								{[...Array(5)].map((_, i) => (
									<StarIcon key={i} className='h-5 w-5 text-yellow-400' />
								))}
							</div>

							<blockquote className='flex-1'>
								<p className='text-lg leading-relaxed text-gray-700 font-medium'>
									&ldquo;{testimony.testimonial}&rdquo;
								</p>
							</blockquote>

							<div className='mt-8 pt-8 border-t border-gray-100 flex items-center'>
								<div className='shrink-0'>
									<Image
										className='h-12 w-12 rounded-full object-cover ring-2 ring-indigo-50'
										src={testimony.image}
										alt={testimony.name}
										width={48}
										height={48}
									/>
								</div>
								<div className='ml-4'>
									<div className='text-base font-bold text-gray-900'>
										{testimony.name}
									</div>
									<div className='text-sm font-medium text-indigo-600'>
										{testimony.company}
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
