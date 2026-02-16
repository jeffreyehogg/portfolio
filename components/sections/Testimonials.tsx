'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { testimonialsData } from '../../lib/data'

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
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
		<section className='relative py-24 bg-slate-950 overflow-hidden'>
			{/* Subtle gradient */}
			<div className='absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent' />

			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center max-w-3xl mx-auto mb-16'
				>
					<h2 className='text-indigo-400 font-semibold tracking-wide uppercase text-sm'>
						Testimonials
					</h2>
					<h3 className='mt-2 text-3xl font-extrabold text-white sm:text-4xl'>
						Trusted by Industry Leaders
					</h3>
					<p className='mt-4 text-xl text-slate-400'>
						Don&apos;t just take my word for it. Here&apos;s what others (might)
						have to say.
					</p>
				</motion.div>

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
							className='relative flex flex-col bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-500/30 group'
						>
							{/* Large decorative quote mark */}
							<span className='absolute top-4 right-6 text-6xl text-indigo-500/10 font-serif leading-none select-none group-hover:text-indigo-500/20 transition-colors'>
								&ldquo;
							</span>

							{/* 5-Star Rating */}
							<div className='flex gap-0.5 mb-6'>
								{[...Array(5)].map((_, i) => (
									<StarIcon key={i} className='h-4 w-4 text-amber-500' />
								))}
							</div>

							<blockquote className='flex-1'>
								<p className='text-lg leading-relaxed text-slate-300'>
									&ldquo;{testimony.testimonial}&rdquo;
								</p>
							</blockquote>

							<div className='mt-8 pt-6 border-t border-slate-800 flex items-center'>
								<div className='shrink-0'>
									<Image
										className='h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500/20'
										src={testimony.image}
										alt={testimony.name}
										width={48}
										height={48}
									/>
								</div>
								<div className='ml-4'>
									<div className='text-base font-bold text-white'>
										{testimony.name}
									</div>
									<div className='text-sm font-medium text-indigo-400'>
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
