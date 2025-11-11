'use client'

import { CheckIcon } from '@heroicons/react/24/outline'
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const pricing = {
	tiers: [
		{
			title: 'Standard Website',
			description:
				'The essentials for your business. Choose this option if your data does not change very often.',
			features: ['Static data', '2 revisions', 'Satisfaction guaranteed'],
			cta: 'Learn More',
			mostPopular: false,
		},
		{
			title: 'Dynamic Website',
			description:
				'A step-up from the Standard. Choose this option if you have data that changes frequently.',
			features: [
				'Static + Dynamic Data',
				'3 revisions',
				'Website analytics',
				'Satisfaction guaranteed',
			],
			cta: 'Learn More',
			mostPopular: true,
		},
		{
			title: 'Premium Website',
			description:
				'The premium option for your business. Choose this option if you need the ability to manage data and collect payments.',
			features: [
				'Static + Dynamic Data',
				'Database + User Authentication',
				'Unlimited revisions',
				'Advanced analytics',
				'Satisfaction guaranteed',
			],
			cta: 'Learn More',
			mostPopular: false,
		},
	],
}

export default function Services() {
	return (
		<div className='max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 rounded-lg shadow-xl m-20'>
			<h2 className='text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10'>
				Services
			</h2>
			<p className='mt-6 max-w-2xl text-xl text-gray-500'>
				Choose a website option that fits your business needs.
			</p>
			<div className='mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8'>
				{pricing.tiers.map((tier) => (
					<div
						key={tier.title}
						className={classNames(
							tier.mostPopular
								? 'border-2 border-indigo-500 shadow-lg'
								: 'border border-gray-200 shadow-sm',
							'relative p-8 bg-white rounded-2xl flex flex-col transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer'
						)}
					>
						<div className='flex-1 flex flex-col'>
							<h3 className='text-xl font-semibold text-gray-900'>
								{tier.title}
							</h3>
							{tier.mostPopular ? (
								<p className='absolute top-0 py-1.5 px-4 bg-indigo-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2'>
									Most popular
								</p>
							) : null}

							<p className='mt-6 text-gray-500'>{tier.description}</p>

							{/* Feature list */}
							<ul role='list' className='mt-8 space-y-4 flex-grow'>
								{tier.features.map((feature) => (
									<li key={feature} className='flex'>
										<CheckIcon
											className='shrink-0 w-6 h-6 text-indigo-500'
											aria-hidden='true'
										/>
										<span className='ml-3 text-gray-500'>{feature}</span>
									</li>
								))}
							</ul>
						</div>

						<a
							href='/about#contact-form'
							className={classNames(
								tier.mostPopular
									? 'bg-indigo-500 text-white hover:bg-indigo-600'
									: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
								'mt-10 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
							)}
						>
							{tier.cta}
						</a>
					</div>
				))}
			</div>
		</div>
	)
}
