import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline'
import { trustedCompaniesData } from '../../lib/data'

export default function Trusted() {
	return (
		<section className='cv-auto py-20 sm:py-24 bg-slate-950 relative overflow-hidden'>
			{/* Subtle top/bottom divider lines */}
			<div className='absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-4'>
					<div>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3'>
							Production experience
						</div>
						<h2 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance'>
							Enterprise credentials & impact
						</h2>
						<p className='mt-2.5 text-base sm:text-lg text-slate-400 max-w-2xl text-pretty'>
							Production environments where I&apos;ve architected full-stack applications, automated CI/CD pipelines, and administered distributed databases.
						</p>
					</div>

					<Link
						href='/about#experience'
						className='inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group active:scale-[0.98]'
					>
						Full career timeline
						<ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>

				{/* 3-Column Enterprise Credentials Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{trustedCompaniesData.map((company, idx) => (
						<Link
							key={company.name}
							href='/about#experience'
							className='group relative flex flex-col justify-between rounded-2xl bg-slate-900/65 border border-white/[0.08] p-6 sm:p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:border-white/[0.16] hover:bg-slate-900/90 transition-all duration-200'
						>
							<div>
								{/* Top Row: Company Logo / Identity & Tenure */}
								<div className='flex items-center justify-between gap-4 pb-5 mb-5 border-b border-white/[0.06]'>
									<div className='h-9 flex items-center opacity-85 group-hover:opacity-100 transition-opacity'>
										{company.organization && company.imageUrl ? (
											<Image
												width={company.width ?? 140}
												height={company.height ?? 60}
												src={company.imageUrl}
												alt={company.name}
												loading='lazy'
												className='h-8 sm:h-9 w-auto object-contain'
											/>
										) : (
											<div className='inline-flex items-center gap-2 text-slate-200 font-semibold text-sm'>
												<div className='p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'>
													<CodeBracketSquareIcon className='w-5 h-5' />
												</div>
												<span>Independent / Freelance</span>
											</div>
										)}
									</div>
									<span className='inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-950/70 border border-white/[0.07] px-2.5 py-1 rounded-full shrink-0'>
										{idx === 0 && (
											<span className='h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse' />
										)}
										{company.period}
									</span>
								</div>

								{/* Badge & Role Title */}
								<div className='text-xs font-medium text-indigo-400 mb-1.5'>
									{company.badge}
								</div>
								<h3 className='text-lg font-bold text-white group-hover:text-indigo-200 transition-colors mb-2.5'>
									{company.role}
									{company.organization && (
										<>
											{' '}
											<span className='text-slate-500 font-normal'>@</span> {company.organization}
										</>
									)}
								</h3>

								{/* Impact Description */}
								<p className='text-sm text-slate-400 leading-relaxed font-light text-pretty'>
									{company.impact}
								</p>
							</div>

							<div className='mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-indigo-300 transition-colors'>
								<span>View role highlights</span>
								<ArrowRightIcon className='w-3.5 h-3.5 group-hover:translate-x-1 transition-transform' />
							</div>
						</Link>
					))}
				</div>
			</div>

			<div className='absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent' />
		</section>
	)
}
