'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { trustedCompaniesData } from '../../lib/data'

export default function Trusted() {
	// Double the logos for seamless infinite scroll
	const logos = [...trustedCompaniesData, ...trustedCompaniesData]

	return (
		<section className='py-20 bg-slate-950 sm:py-24 relative overflow-hidden'>
			{/* Subtle top/bottom divider lines */}
			<div className='absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='max-w-2xl mx-auto text-center mb-16'
				>
					<h2 className='text-3xl font-extrabold text-white sm:text-4xl'>
						Trusted by Innovators
					</h2>
					<p className='mt-4 text-lg text-slate-400'>
						Collaborating with forward-thinking companies to build the future.
					</p>
				</motion.div>

				{/* Marquee Container */}
				<div className='relative'>
					{/* Fade edges */}
					<div className='absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none' />
					<div className='absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none' />

					<div className='overflow-hidden'>
						<motion.div
							className='flex items-center gap-16'
							animate={{ x: ['0%', '-50%'] }}
							transition={{
								x: {
									repeat: Infinity,
									repeatType: 'loop',
									duration: 20,
									ease: 'linear',
								},
							}}
						>
							{logos.map((company, index) => (
								<div
									key={`${company.name}-${index}`}
									className='flex-shrink-0 flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-300'
								>
									<Image
										width={company.width}
										height={company.height}
										src={company.imageUrl}
										alt={company.name}
										className='h-12 w-auto object-contain'
									/>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</div>

			<div className='absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent' />
		</section>
	)
}
