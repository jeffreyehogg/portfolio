import {
	CodeBracketSquareIcon,
	DevicePhoneMobileIcon,
	CommandLineIcon,
	CircleStackIcon,
	ArrowRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { engineeringPillars } from '../../lib/data'

const iconMap = {
	'fullstack-web': CodeBracketSquareIcon,
	'native-ios': DevicePhoneMobileIcon,
	'api-middleware': CommandLineIcon,
	'database-systems': CircleStackIcon,
}

export default function EngineeringPillars() {
	return (
		<section className='cv-auto relative py-20 sm:py-24 bg-[#FAFAF8] border-b border-stone-200/80'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-4'>
					<div className='max-w-2xl'>
						<div className='font-mono text-[11px] uppercase tracking-[0.16em] text-indigo-600 mb-2.5'>
							02 / Capabilities
						</div>
						<h2 className='text-3xl sm:text-4xl font-semibold text-stone-950 tracking-[-0.025em] text-balance'>
							Full-stack web, mobile &amp;{' '}
							<span className='font-serif italic font-normal text-indigo-600'>
								API engineering
							</span>
						</h2>
						<p className='mt-3 text-base sm:text-lg text-stone-600 leading-relaxed text-pretty'>
							Building production web applications with TypeScript, Angular, React, and Next.js,
							native Swift iOS apps, REST APIs, and SQL-backed services.
						</p>
					</div>

					<Link
						href='/portfolio'
						className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200/90 text-sm font-medium text-stone-800 hover:text-indigo-600 hover:border-indigo-200 transition-colors group active:scale-[0.98] shrink-0 shadow-[0_1px_2px_rgba(17,17,16,0.03)]'
					>
						Explore projects
						<ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>

				{/* 4-Pillar Editorial Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6'>
					{engineeringPillars.map((pillar, idx) => {
						const Icon = iconMap[pillar.id as keyof typeof iconMap] || CodeBracketSquareIcon

						return (
							<div
								key={pillar.id}
								className='group relative rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-[0_1px_2px_rgba(17,17,16,0.04)] hover:border-stone-300 hover:shadow-[0_10px_28px_-14px_rgba(17,17,16,0.12)] transition-[border-color,box-shadow] duration-200 flex flex-col justify-between'
							>
								<div>
									<div className='flex items-center justify-between mb-5'>
										<div className='flex items-center gap-3'>
											<div className='p-2.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors duration-200'>
												<Icon className='w-5 h-5' />
											</div>
											<span className='font-mono text-xs text-stone-400'>
												0{idx + 1}
											</span>
										</div>
										<span className='font-mono text-[11px] uppercase tracking-wider text-stone-600 bg-[#F3F2EE] px-3 py-1 rounded-full border border-stone-200/80'>
											{pillar.badge}
										</span>
									</div>

									<h3 className='text-lg sm:text-xl font-semibold text-stone-950 mb-2.5 tracking-tight'>
										{pillar.title}
									</h3>

									<p className='text-stone-600 text-sm sm:text-base leading-relaxed mb-6 text-pretty'>
										{pillar.description}
									</p>
								</div>

								<div>
									{pillar.stats && (
										<div className='font-mono text-xs text-indigo-600 font-medium mb-4 flex items-center gap-2'>
											<span className='h-1.5 w-1.5 rounded-full bg-indigo-600' />
											{pillar.stats}
										</div>
									)}
									<div className='flex flex-wrap gap-1.5 pt-4 border-t border-stone-200/80'>
										{pillar.technologies.map((tech) => (
											<span
												key={tech}
												className='text-xs text-stone-600 bg-[#FAFAF8] px-3 py-1 rounded-full border border-stone-200/80'
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
