import {
	ServerStackIcon,
	CommandLineIcon,
	CircleStackIcon,
	CpuChipIcon,
	ArrowRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { engineeringPillars } from '../../lib/data'

const iconMap = {
	'devops-cicd': ServerStackIcon,
	'api-middleware': CommandLineIcon,
	'database-systems': CircleStackIcon,
	'agentic-engineering': CpuChipIcon,
}

export default function EngineeringPillars() {
	return (
		<section className='cv-auto relative py-20 sm:py-24 bg-slate-950 overflow-hidden'>
			{/* GPU-free ambient lighting */}
			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					background:
						'radial-gradient(450px 350px at 25% 50%, rgba(79, 70, 229, 0.09), transparent 70%), radial-gradient(450px 350px at 75% 50%, rgba(147, 51, 234, 0.08), transparent 70%)',
				}}
				aria-hidden='true'
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='text-center max-w-3xl mx-auto mb-14 sm:mb-16'>
					<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3.5'>
						Core technical focus
					</div>
					<h2 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'>
						Architecting resilient systems & modern automation
					</h2>
					<p className='mt-3.5 text-base sm:text-lg text-slate-400 leading-relaxed'>
						Full-stack engineering at LGI Homes across web applications,
						distributed database administration, and automated CI/CD DevOps.
					</p>
				</div>

				{/* 4-Pillar Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6'>
					{engineeringPillars.map((pillar) => {
						const Icon = iconMap[pillar.id as keyof typeof iconMap] || ServerStackIcon

						return (
							<div
								key={pillar.id}
								className='group relative rounded-2xl bg-slate-900/65 border border-white/[0.08] p-6 sm:p-7 hover:border-white/[0.16] hover:bg-slate-900/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:shadow-xl hover:shadow-black/30 transition-all duration-200 flex flex-col justify-between'
							>
								{/* Subtle hover gradient glow */}
								<div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

								<div>
									{/* Clean Card Top Row */}
									<div className='flex items-center justify-between mb-5'>
										<div className='p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200'>
											<Icon className='w-5 h-5' />
										</div>
										<span className='text-xs font-medium text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20'>
											{pillar.badge}
										</span>
									</div>

									<h3 className='text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-indigo-200 transition-colors'>
										{pillar.title}
									</h3>

									<p className='text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light text-pretty'>
										{pillar.description}
									</p>
								</div>

								<div>
									{pillar.stats && (
										<div className='text-xs text-emerald-400 font-medium mb-4 flex items-center gap-2'>
											<span className='h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse' />
											{pillar.stats}
										</div>
									)}
									<div className='flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]'>
										{pillar.technologies.map((tech) => (
											<span
												key={tech}
												className='text-xs text-slate-300 bg-slate-800/50 px-2.5 py-1 rounded-lg border border-white/[0.06] group-hover:border-white/[0.1] transition-colors'
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

				{/* CTA to Portfolio */}
				<div className='mt-12 text-center'>
					<Link
						href='/portfolio'
						className='inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group active:scale-[0.98]'
					>
						Explore real-world applications & data systems
						<ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>
			</div>
		</section>
	)
}
