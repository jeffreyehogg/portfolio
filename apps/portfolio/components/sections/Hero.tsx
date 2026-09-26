'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
	ChevronDownIcon,
	CommandLineIcon,
	BriefcaseIcon,
	ServerStackIcon,
	CircleStackIcon,
	CpuChipIcon,
	ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import { profileData } from '../../lib/data'

const metrics = [
	{ label: 'Technical Experience', value: '10+ Years', icon: BriefcaseIcon },
	{ label: 'CI/CD Automation', value: 'Zero-Downtime', icon: ServerStackIcon },
	{ label: 'Database Administration', value: 'MS SQL & MySQL', icon: CircleStackIcon },
	{ label: 'Production Apps', value: '5+ Shipped', icon: CpuChipIcon },
]

export default function Hero() {
	const shouldReduce = useReducedMotion()

	return (
		<div className='relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20 pb-16'>
			{/* Grid Background Pattern */}
			<div className='absolute inset-0 bg-grid opacity-30 z-[1]' />

			{/* Soft Ambient Radial Glows */}
			<div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] z-[2]' />
			<div className='absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] z-[2]' />

			{/* Subtle linear gradient overlays */}
			<div
				className='absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950 z-[2]'
				aria-hidden='true'
			/>

			{/* Main Content */}
			<div className='relative z-10 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto'>
				<motion.div
					initial={shouldReduce ? false : { opacity: 0, y: 30 }}
					animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
					transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }}
				>
					{/* Status Badge */}
					<motion.div
						initial={shouldReduce ? false : { opacity: 0, scale: 0.9 }}
						animate={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
						transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.15 }}
						className='inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-lg shadow-black/20'
					>
						<span className='relative flex h-2 w-2'>
							<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
							<span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500' />
						</span>
						<span className='text-emerald-400 font-semibold'>{profileData.status}</span>
						<span className='text-slate-600'>•</span>
						<span className='text-slate-400'>{profileData.location}</span>
					</motion.div>

					<h1 className='text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 text-white text-balance'>
						<span className='block text-slate-100 font-light text-2xl sm:text-3xl mb-2'>
							{profileData.name}
						</span>
						<span className='block mb-2'>Full-Stack Developer.</span>
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300'>
							DevOps & System Architecture.
						</span>
					</h1>

					<p className='mt-6 text-lg sm:text-xl text-slate-300 sm:max-w-3xl mx-auto leading-relaxed font-normal text-balance'>
						{profileData.headline}
					</p>

					{/* Architecture & Stack Telemetry */}
					<div className='mt-8 inline-flex flex-col sm:flex-row items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-xl shadow-xl shadow-black/30'>
						<div className='flex items-center gap-1.5'>
							<span className='w-2.5 h-2.5 rounded-full bg-rose-500/80' />
							<span className='w-2.5 h-2.5 rounded-full bg-amber-500/80' />
							<span className='w-2.5 h-2.5 rounded-full bg-emerald-500/80' />
							<span className='text-[11px] font-mono text-slate-400 ml-2'>stack.telemetry</span>
						</div>
						<div className='hidden sm:block h-3.5 w-px bg-slate-800' />
						<div className='flex items-center gap-2.5 text-xs font-mono text-slate-300 flex-wrap justify-center'>
							<span className='flex items-center gap-1.5'>
								<span className='h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse' />
								<span className='text-slate-200'>TypeScript & React</span>
							</span>
							<span className='text-slate-600'>•</span>
							<span className='text-indigo-300'>Node.js Middleware</span>
							<span className='text-slate-600'>•</span>
							<span className='text-cyan-300'>Docker & CI/CD</span>
							<span className='text-slate-600'>•</span>
							<span className='text-amber-300'>MS SQL (MCP Tuning)</span>
						</div>
					</div>
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					className='mt-10 flex flex-wrap gap-3.5 justify-center items-center'
					initial={shouldReduce ? false : { opacity: 0, y: 20 }}
					animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
					transition={{ type: 'spring', bounce: 0.2, duration: 0.6, delay: 0.35 }}
				>
					<Link
						href='/portfolio'
						className='group inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-[0_0_25px_rgba(79,70,229,0.35)] hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] hover:-translate-y-0.5'
					>
						<CommandLineIcon className='w-5 h-5' />
						Explore Projects
					</Link>
					<Link
						href='/about'
						className='group inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold rounded-xl text-slate-200 border border-slate-800 bg-slate-900/80 hover:bg-slate-800/90 hover:text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5'
					>
						<BriefcaseIcon className='w-5 h-5 text-indigo-400' />
						Career Timeline
					</Link>
					<a
						href='/Jeff_Hogg_Resume.pdf'
						target='_blank'
						rel='noopener noreferrer'
						className='group inline-flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-medium rounded-xl text-slate-300 border border-slate-800/80 bg-slate-900/50 hover:bg-slate-800 hover:text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5'
					>
						<ArrowDownTrayIcon className='w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors' />
						Resume PDF
					</a>
				</motion.div>

				{/* Metrics Grid */}
				<motion.div
					className='mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto'
					initial={shouldReduce ? false : { opacity: 0, y: 20 }}
					animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
					transition={{ type: 'spring', bounce: 0.2, duration: 0.7, delay: 0.5 }}
				>
					{metrics.map((item) => (
						<div
							key={item.label}
							className='flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 backdrop-blur-md text-center transition-all duration-300 group cursor-default min-h-[112px]'
						>
							<item.icon className='w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-200' />
							<div className='text-white font-bold text-base sm:text-lg leading-tight group-hover:text-indigo-200 transition-colors'>
								{item.value}
							</div>
							<div className='text-[11px] sm:text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider'>
								{item.label}
							</div>
						</div>
					))}
				</motion.div>
			</div>

			{/* Subtle Bottom Arrow */}
			<motion.div
				className='absolute bottom-6 left-1/2 -translate-x-1/2 z-10'
				initial={shouldReduce ? false : { opacity: 0 }}
				animate={shouldReduce ? undefined : { opacity: 1 }}
				transition={shouldReduce ? undefined : { delay: 1 }}
			>
				<motion.div
					animate={shouldReduce ? undefined : { y: [0, 6, 0] }}
					transition={shouldReduce ? undefined : { repeat: Infinity, duration: 2.2 }}
				>
					<ChevronDownIcon className='w-5 h-5 text-slate-500' />
				</motion.div>
			</motion.div>
		</div>
	)
}
