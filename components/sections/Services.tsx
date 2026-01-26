'use client'

import { CheckIcon } from '@heroicons/react/24/solid'
import { motion, Variants } from 'framer-motion'
import { servicesData } from '../../lib/data'
import BackgroundBlobs from '../ui/BackgroundBlobs'
import { cn } from '../../lib/utils'

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
}

const itemVariants: Variants = {
	hidden: { y: 40, opacity: 0 },
	visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } },
}

export default function Services() {
	return (
		<section className='py-24 bg-slate-950 relative overflow-hidden'>
			<div className='absolute inset-0 pointer-events-none opacity-20'>
				<BackgroundBlobs />
			</div>

			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<h2 className='text-indigo-400 font-semibold tracking-wide uppercase text-sm'>
						Services
					</h2>
					<p className='mt-2 text-3xl font-extrabold text-white sm:text-4xl'>
						Tailored Solutions for Your Growth
					</p>
					<p className='mt-4 text-xl text-slate-400'>
						Choose a website package that fits your business needs perfectly.
					</p>
				</div>

				<motion.div
					className='grid gap-8 lg:grid-cols-3 lg:gap-10'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.1 }}
				>
					{servicesData.map((tier) => (
						<motion.div
							key={tier.title}
							variants={itemVariants}
							className={cn(
								tier.mostPopular
									? 'ring-2 ring-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10 bg-slate-900'
									: 'ring-1 ring-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 bg-slate-900/50',
								'relative flex flex-col rounded-3xl p-8 transition-all duration-300 backdrop-blur-sm',
							)}
						>
							{tier.mostPopular && (
								<div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/4'>
									<span className='inline-flex items-center px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'>
										Most Popular
									</span>
								</div>
							)}

							<h3 className='text-xl font-bold text-white'>{tier.title}</h3>
							<p className='mt-4 text-slate-400 text-sm leading-relaxed min-h-[60px]'>
								{tier.description}
							</p>

							<ul role='list' className='mt-8 space-y-4 flex-1'>
								{tier.features.map((feature) => (
									<li key={feature} className='flex items-start'>
										<div className='shrink-0'>
											<CheckIcon
												className='h-5 w-5 text-indigo-400'
												aria-hidden='true'
											/>
										</div>
										<p className='ml-3 text-sm text-slate-300'>{feature}</p>
									</li>
								))}
							</ul>

							<div className='mt-8'>
								<a
									href='/contact'
									className={cn(
										tier.mostPopular
											? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/20'
											: 'bg-slate-800 text-white hover:bg-slate-700',
										'block w-full py-3 px-6 rounded-xl text-center font-semibold transition-all duration-200 hover:-translate-y-0.5',
									)}
								>
									{tier.cta}
								</a>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
