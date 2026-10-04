'use client'

import { motion, useReducedMotion } from 'framer-motion'
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
	const shouldReduce = useReducedMotion()

	return (
		<section className='relative py-20 sm:py-24 bg-slate-950 overflow-hidden'>
			{/* Background ambient lighting */}
			<div className='absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none' />
			<div className='absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='text-center max-w-3xl mx-auto mb-14 sm:mb-16'>
					<motion.div
						initial={shouldReduce ? false : { opacity: 0, y: 15 }}
						whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3.5'
					>
						Core technical focus
					</motion.div>
					<motion.h2
						initial={shouldReduce ? false : { opacity: 0, y: 15 }}
						whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'
					>
						Architecting resilient systems & modern automation
					</motion.h2>
					<motion.p
						initial={shouldReduce ? false : { opacity: 0, y: 15 }}
						whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.15 }}
						className='mt-3.5 text-base sm:text-lg text-slate-400 leading-relaxed'
					>
						Full-stack engineering at LGI Homes across web applications,
						distributed database administration, and automated CI/CD DevOps.
					</motion.p>
				</div>

				{/* 4-Pillar Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6'>
					{engineeringPillars.map((pillar, idx) => {
						const Icon = iconMap[pillar.id as keyof typeof iconMap] || ServerStackIcon

						return (
							<motion.div
								key={pillar.id}
								initial={shouldReduce ? false : { opacity: 0, y: 20 }}
								whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: idx * 0.08 }}
								className='group relative rounded-2xl bg-slate-900/60 border border-white/[0.08] p-6 sm:p-7 backdrop-blur-xl hover:border-indigo-500/30 hover:bg-slate-900/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200 flex flex-col justify-between'
							>
								{/* Subtle hover gradient glow */}
								<div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

								<div>
									{/* Clean Card Top Row */}
									<div className='flex items-center justify-between mb-5'>
										<div className='p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200'>
											<Icon className='w-5 h-5' />
										</div>
										<span className='text-xs font-medium text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20'>
											{pillar.badge}
										</span>
									</div>

									<h3 className='text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-indigo-200 transition-colors'>
										{pillar.title}
									</h3>

									<p className='text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light'>
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
							</motion.div>
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
