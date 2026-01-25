'use client'

import { CheckIcon } from '@heroicons/react/24/solid'
import { motion, Variants } from 'framer-motion'
import { servicesData } from '../../lib/data'
import BackgroundBlobs from '../ui/BackgroundBlobs'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

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
		<section className='py-24 bg-gray-50 relative overflow-hidden'>
			{/* Background Blobs */}
			<BackgroundBlobs />

			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<h2 className='text-indigo-600 font-semibold tracking-wide uppercase text-sm'>
						Services
					</h2>
					<p className='mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl'>
						Tailored Solutions for Your Growth
					</p>
					<p className='mt-4 text-xl text-gray-500'>
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
							className={classNames(
								tier.mostPopular
									? 'ring-2 ring-indigo-600 shadow-2xl scale-105 z-10'
									: 'ring-1 ring-gray-200 shadow-sm hover:shadow-xl',
								'relative flex flex-col bg-white rounded-3xl p-8 transition-all duration-300',
							)}
						>
							{tier.mostPopular && (
								<div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/4'>
									<span className='inline-flex items-center px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'>
										Most Popular
									</span>
								</div>
							)}

							<h3 className='text-xl font-bold text-gray-900'>{tier.title}</h3>
							<p className='mt-4 text-gray-500 text-sm leading-relaxed min-h-[60px]'>
								{tier.description}
							</p>

							<ul role='list' className='mt-8 space-y-4 flex-1'>
								{tier.features.map((feature) => (
									<li key={feature} className='flex items-start'>
										<div className='shrink-0'>
											<CheckIcon
												className='h-5 w-5 text-indigo-500'
												aria-hidden='true'
											/>
										</div>
										<p className='ml-3 text-sm text-gray-700'>{feature}</p>
									</li>
								))}
							</ul>

							<div className='mt-8'>
								<a
									href='/contact'
									className={classNames(
										tier.mostPopular
											? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
											: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
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
