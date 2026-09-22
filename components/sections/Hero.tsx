'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
	ChevronDownIcon,
	CommandLineIcon,
	BriefcaseIcon,
	ServerStackIcon,
	CircleStackIcon,
	CpuChipIcon,
} from '@heroicons/react/24/outline'
import { profileData } from '../../lib/data'

const metrics = [
	{ label: 'Technical Leadership', value: '10+ Years', icon: BriefcaseIcon },
	{ label: 'Automated CI/CD', value: 'Self-Hosted Runners', icon: ServerStackIcon },
	{ label: 'Database Tuning', value: 'Distributed SQL', icon: CircleStackIcon },
	{ label: 'Engineering Velocity', value: 'Agentic Workflows', icon: CpuChipIcon },
]

export default function Hero() {
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
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
				>
					{/* Status Badge */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
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
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					className='mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
				>
					<Link
						href='/portfolio'
						className='group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-[0_0_25px_rgba(79,70,229,0.35)] hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] hover:-translate-y-0.5'
					>
						<CommandLineIcon className='w-5 h-5' />
						Explore Systems & Projects
					</Link>
					<Link
						href='/about'
						className='group inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold rounded-xl text-slate-200 border border-slate-800 bg-slate-900/80 hover:bg-slate-800/90 hover:text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5'
					>
						<BriefcaseIcon className='w-5 h-5 text-indigo-400' />
						Career Timeline & Background
					</Link>
				</motion.div>

				{/* Metrics Grid */}
				<motion.div
					className='mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.7 }}
				>
					{metrics.map((item) => (
						<div
							key={item.label}
							className='p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm text-center'
						>
							<div className='flex items-center justify-center gap-1.5 text-white font-bold text-base sm:text-lg'>
								<item.icon className='w-4 h-4 text-indigo-400' />
								{item.value}
							</div>
							<div className='text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider'>
								{item.label}
							</div>
						</div>
					))}
				</motion.div>
			</div>

			{/* Subtle Bottom Arrow */}
			<motion.div
				className='absolute bottom-6 left-1/2 -translate-x-1/2 z-10'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
			>
				<motion.div
					animate={{ y: [0, 6, 0] }}
					transition={{ repeat: Infinity, duration: 2.2 }}
				>
					<ChevronDownIcon className='w-5 h-5 text-slate-500' />
				</motion.div>
			</motion.div>
		</div>
	)
}
