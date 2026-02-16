'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
	ChevronDownIcon,
	CodeBracketIcon,
	VideoCameraIcon,
} from '@heroicons/react/24/outline'

const stats = [
	{ label: 'Years Engineering', value: '4+' },
	{ label: 'Years Broadcasting', value: '10+' },
	{ label: 'Projects Shipped', value: '20+' },
]

export default function Hero() {
	return (
		<div className='relative h-screen flex items-center justify-center overflow-hidden bg-slate-950'>
			{/* Background Video */}
			<video
				autoPlay
				loop
				muted
				playsInline
				poster='/images/space-poster.webp'
				className='absolute inset-0 w-full h-full object-cover z-0 opacity-30'
				src='https://uew8wzjetllsk5wf.public.blob.vercel-storage.com/space.mp4'
			/>

			{/* Grid Overlay */}
			<div className='absolute inset-0 bg-grid z-[1]' />

			{/* Gradient Overlay */}
			<div
				className='absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950 z-[2]'
				aria-hidden='true'
			/>

			{/* Radial glow behind text */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/8 rounded-full blur-[120px] z-[2]' />

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
						className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm'
					>
						<span className='relative flex h-2 w-2'>
							<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
							<span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500' />
						</span>
						Available for new opportunities
					</motion.div>

					<h1 className='text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 text-white text-balance'>
						<span className='block mb-2'>Engineering Excellence.</span>
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x'>
							Broadcast Precision.
						</span>
					</h1>

					<p className='mt-6 text-xl text-slate-300 sm:max-w-2xl mx-auto leading-relaxed font-light'>
						I deliver reliability on the biggest stages. From architecting
						scalable{' '}
						<span className='font-semibold text-indigo-300'>
							Software Solutions
						</span>{' '}
						to live television{' '}
						<span className='font-semibold text-purple-300'>
							Sports Broadcasts.
						</span>
					</p>
				</motion.div>

				{/* Buttons */}
				<motion.div
					className='mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.8 }}
				>
					<Link
						href='/portfolio'
						className='group inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-1'
					>
						<CodeBracketIcon className='w-5 h-5' />
						View Software Work
					</Link>
					<Link
						href='/broadcasting'
						className='group inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-full text-white border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1'
					>
						<VideoCameraIcon className='w-5 h-5' />
						View Broadcast Career
					</Link>
				</motion.div>

				{/* Stats Row */}
				<motion.div
					className='mt-16 flex justify-center gap-12 sm:gap-16'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
				>
					{stats.map((stat) => (
						<div key={stat.label} className='text-center'>
							<div className='text-3xl font-extrabold text-white'>
								{stat.value}
							</div>
							<div className='text-sm text-slate-500 mt-1'>{stat.label}</div>
						</div>
					))}
				</motion.div>
			</div>

			{/* Scroll indicator */}
			<motion.div
				className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2 }}
			>
				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{ repeat: Infinity, duration: 2 }}
				>
					<ChevronDownIcon className='w-6 h-6 text-slate-500' />
				</motion.div>
			</motion.div>
		</div>
	)
}
