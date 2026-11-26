import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline'
import { trustedCompaniesData } from '../../lib/data'

export default function Trusted() {
	return (
		<section className='cv-auto py-20 sm:py-24 bg-[#FAFAF8]'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-4'>
					<div>
						<div className='font-mono text-[11px] uppercase tracking-[0.16em] text-gblue-600 mb-2.5'>
							03 / Experience
						</div>
						<h2 className='text-3xl sm:text-4xl font-semibold text-stone-950 tracking-[-0.025em] text-balance'>
							Production{' '}
							<span className='font-serif italic font-normal text-gblue-600'>
								credentials &amp; impact
							</span>
						</h2>
						<p className='mt-2.5 text-base sm:text-lg text-stone-600 max-w-2xl text-pretty'>
							Production environments where I&apos;ve built full-stack applications, REST APIs, and SQL-backed systems.
						</p>
					</div>

					<Link
						href='/about#experience'
						className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200/90 text-sm font-medium text-stone-800 hover:text-gblue-600 hover:border-gblue-200 transition-colors group active:scale-[0.98] shrink-0 shadow-[0_1px_2px_rgba(17,17,16,0.03)]'
					>
						Full career timeline
						<ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>

				{/* 3-Column Enterprise Credentials Grid */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{trustedCompaniesData.map((company) => (
						<Link
							key={company.name}
							href='/about#experience'
							className='group relative flex flex-col justify-between rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-7 shadow-[0_1px_2px_rgba(17,17,16,0.04)] hover:border-stone-300 hover:shadow-[0_10px_28px_-14px_rgba(17,17,16,0.12)] transition-[border-color,box-shadow] duration-200'
						>
							<div>
								{/* Top Row: Company Logo & Tenure */}
								<div className='flex items-center justify-between gap-4 pb-5 mb-5 border-b border-stone-200/80'>
									<div className='h-9 flex items-center'>
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
											<div className='inline-flex items-center gap-2 text-stone-800 font-semibold text-sm'>
												<div className='p-1.5 rounded-lg bg-[#F3F2EE] border border-stone-200 text-teal-800'>
													<CodeBracketSquareIcon className='w-5 h-5' />
												</div>
												<span>Independent / Freelance</span>
											</div>
										)}
									</div>
									<span className='inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-stone-600 bg-[#FAFAF8] border border-stone-200/90 px-2.5 py-1 rounded-full shrink-0'>
										{company.current && (
											<span className='h-1.5 w-1.5 rounded-full bg-emerald-600 motion-safe:animate-pulse' />
										)}
										{company.period}
									</span>
								</div>

								{/* Badge & Role Title */}
								<div className='font-mono text-[11px] uppercase tracking-wider text-gblue-600 mb-2'>
									{company.badge}
								</div>
								<h3 className='text-lg font-semibold text-stone-950 group-hover:text-gblue-600 transition-colors mb-2.5 tracking-tight'>
									{company.role}
									{company.organization && (
										<>
											{' '}
											<span className='text-stone-400 font-normal'>@</span> {company.organization}
										</>
									)}
								</h3>

								{/* Impact Description */}
								<p className='text-sm text-stone-600 leading-relaxed text-pretty'>
									{company.impact}
								</p>
							</div>

							<div className='mt-6 pt-4 border-t border-stone-200/70 flex items-center justify-between text-xs font-medium text-stone-500 group-hover:text-stone-950 transition-colors'>
								<span>View role highlights</span>
								<ArrowRightIcon className='w-3.5 h-3.5 group-hover:translate-x-1 transition-transform' />
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
