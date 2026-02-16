'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const broadcastStats = [
	{ value: '10+', label: 'Years' },
	{ value: '500+', label: 'Broadcasts' },
	{ value: '3', label: 'Championships' },
]

export default function BroadcastTeaser() {
	return (
		<section className='relative py-24 bg-slate-900 overflow-hidden'>
			{/* Subtle diagonal line accent */}
			<div className='absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
					{/* Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className='relative z-10'
					>
						<h2 className='text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-2'>
							Beyond the Code
						</h2>
						<h3 className='text-3xl font-extrabold text-white sm:text-4xl mb-6 text-balance'>
							Live from the Sidelines
						</h3>
						<p className='text-lg text-slate-400 mb-8 leading-relaxed'>
							Before I was optimizing algorithms, I was capturing history. For
							over a decade, I operated cameras and directed technical
							broadcasts for the Super Bowl, World Series, and NBA Finals.
						</p>

						{/* Mini stats row */}
						<div className='flex gap-8 mb-8'>
							{broadcastStats.map((stat) => (
								<div key={stat.label}>
									<div className='text-2xl font-extrabold text-white'>
										{stat.value}
									</div>
									<div className='text-sm text-slate-500'>{stat.label}</div>
								</div>
							))}
						</div>

						<Link
							href='/broadcasting'
							className='inline-flex items-center gap-2 text-white font-semibold group hover:text-indigo-400 transition-colors'
						>
							Explore my broadcast career
							<ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
						</Link>
					</motion.div>

					{/* Image/Visual */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className='relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 group'
					>
						<Image
							src='/images/broadcast/college-football.jpeg'
							alt='Jeff Hogg filming Texas A&M'
							fill
							className='object-cover group-hover:scale-105 transition-transform duration-700'
							sizes='(max-width: 1024px) 100vw, 50vw'
						/>
						<div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent' />

						{/* Overlay tag */}
						<div className='absolute bottom-6 left-6'>
							<span className='text-xs font-mono text-slate-300 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/50'>
								ESPN • Texas A&M Football
							</span>
						</div>
					</motion.div>
				</div>
			</div>

			<div className='absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent' />
		</section>
	)
}
