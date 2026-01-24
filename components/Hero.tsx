'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
	return (
		<div className='relative h-screen flex items-center justify-center overflow-hidden'>
			{/* Background Video */}
			<video
				autoPlay
				loop
				muted
				playsInline
				poster='/images/space-poster.webp'
				className='absolute inset-0 w-full h-full object-cover z-0'
				src='https://uew8wzjetllsk5wf.public.blob.vercel-storage.com/space.mp4'
			/>

			<div
				className='absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10'
				aria-hidden='true'
			/>

			{/* Main Content */}
			<div className='relative z-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
				>
					<h1 className='text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6'>
						<span className='block text-white mb-2'>Hi, I&apos;m Jeff.</span>

						{/* Gradient Text Effect */}
						<span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 animate-gradient-x'>
							Software Engineer
						</span>
					</h1>

					<p className='mt-6 text-xl text-gray-200 sm:max-w-2xl mx-auto leading-relaxed font-light'>
						Building enterprise-grade solutions and stunning web experiences.
						Specializing in{' '}
						<span className='font-semibold text-indigo-200'>Angular</span>,{' '}
						<span className='font-semibold text-indigo-200'>React</span>, and{' '}
						<span className='font-semibold text-indigo-200'>Next.js</span>.
					</p>
				</motion.div>

				{/* Buttons with Staggered Animation */}
				<motion.div
					className='mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.8 }}
				>
					<Link
						href='/portfolio'
						className='px-8 py-4 text-base font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] hover:-translate-y-1'
					>
						View My Work
					</Link>
					<Link
						href='/about'
						className='px-8 py-4 text-base font-bold rounded-full text-white border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1'
					>
						About Me
					</Link>
				</motion.div>
			</div>

			{/* Floating Scroll Indicator */}
			<motion.div
				className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/50'
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
			>
				<svg
					className='w-6 h-6'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 14l-7 7m0 0l-7-7m7 7V3'
					/>
				</svg>
			</motion.div>
		</div>
	)
}
