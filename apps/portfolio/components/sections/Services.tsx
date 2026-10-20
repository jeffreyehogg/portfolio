import { CheckIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { servicesData } from '../../lib/data'
import { cn } from '../../lib/utils'

export default function Services() {
	return (
		<section className='cv-auto py-20 sm:py-24 bg-slate-950 relative overflow-hidden'>
			{/* Subtle gradient background */}
			<div className='absolute inset-0 bg-gradient-radial from-indigo-950/20 via-transparent to-transparent pointer-events-none' />

			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center max-w-3xl mx-auto mb-14 sm:mb-16'>
					<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3'>
						Engineering services
					</div>
					<h2 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance'>
						Enterprise engineering & modernization
					</h2>
					<p className='mt-3 text-base sm:text-lg text-slate-400'>
						Custom infrastructure modernization, API architecture, and full-stack application development for enterprise teams.
					</p>
				</div>

				<div className='grid gap-6 lg:grid-cols-3 lg:gap-8 items-stretch'>
					{servicesData.map((tier) => (
						<div
							key={tier.title}
							className={cn(
								'group relative flex flex-col rounded-2xl p-7 sm:p-8 transition-colors duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]',
								tier.mostPopular
									? 'border border-indigo-500/40 bg-slate-900/85 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/30'
									: 'border border-white/[0.08] bg-slate-900/70 hover:border-white/[0.14] hover:bg-slate-900/90'
							)}
						>
							{tier.mostPopular && (
								<div className='absolute -top-3 right-6'>
									<span className='inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-indigo-600 text-white shadow-sm border border-indigo-400/30'>
										Recommended
									</span>
								</div>
							)}

							<h3 className='text-xl font-bold text-white mb-2'>{tier.title}</h3>
							<p className='text-slate-400 text-sm leading-relaxed min-h-[50px] font-light'>
								{tier.description}
							</p>

							<ul role='list' className='mt-6 space-y-3.5 flex-1 border-t border-white/[0.06] pt-6'>
								{tier.features.map((feature) => (
									<li key={feature} className='flex items-start'>
										<div className='shrink-0 mt-0.5'>
											<CheckIcon
												className='h-4 w-4 text-indigo-400'
												aria-hidden='true'
											/>
										</div>
										<p className='ml-3 text-sm text-slate-300'>{feature}</p>
									</li>
								))}
							</ul>

							<div className='mt-8 pt-4'>
								<Link
									href={`/contact?service=${encodeURIComponent(tier.title)}`}
									className={cn(
										'block w-full py-2.5 px-5 rounded-xl text-center text-sm font-semibold transition-colors duration-200 active:scale-[0.98]',
										tier.mostPopular
											? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-900/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]'
											: 'bg-slate-800/80 text-white hover:bg-slate-700/90 border border-white/[0.06]'
									)}
								>
									{tier.cta}
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
