'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

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
				className='absolute inset-0 w-full h-full object-cover z-0 opacity-40'
				src='https://uew8wzjetllsk5wf.public.blob.vercel-storage.com/space.mp4'
			/>

			<div
				className='absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950 z-10'
				aria-hidden='true'
			/>

			{/* Main Content */}
			<div className='relative z-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
				>
					<h1 className='text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 text-white'>
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
						</span>{' '}
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
						className='px-8 py-4 text-base font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-1'
					>
						View Software Work
					</Link>
					<Link
						href='/broadcasting'
						className='px-8 py-4 text-base font-bold rounded-full text-white border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1'
					>
						View Broadcast Career
					</Link>
				</motion.div>
			</div>
		</div>
	)
}
