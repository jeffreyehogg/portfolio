import type { Metadata } from 'next'
import Image from 'next/image'
import { broadcastCredits } from '../../lib/data'

export const metadata: Metadata = {
	title: 'Broadcasting Career - Jeff Hogg',
	description:
		'A decade of precision. From the Super Bowl to the NBA Finals, Jeff Hogg delivered excellence in live sports broadcasting.',
}

export default function Broadcasting() {
	return (
		// Force dark theme for this cinematic page
		<div className='min-h-screen bg-slate-950 text-white'>
			{/* Hero Section */}
			<div className='relative py-24 sm:py-32 overflow-hidden'>
				{/* Background Ambience */}
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] -z-10' />

				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
					<h2 className='text-indigo-400 font-semibold tracking-widest uppercase text-sm mb-4'>
						The Other Side of the Lens
					</h2>
					<h1 className='text-4xl font-extrabold tracking-tight sm:text-6xl mb-6'>
						Precision Under Pressure
					</h1>
					<p className='text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed'>
						Before I was architecting software solutions, I was framing history.
						For over 10 years, I operated cameras and directed technical
						broadcasts for the biggest stages in sports.
					</p>
					<p className='mt-4 text-lg text-slate-400 max-w-2xl mx-auto italic'>
						"Whether it's refactoring a codebase or framing a live shot for
						ESPN, the goal is always the same: clarity, reliability, and
						excellence."
					</p>
				</div>
			</div>

			{/* Gallery Grid */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{broadcastCredits.map((credit, idx) => (
						<div
							key={idx}
							className='group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl'
						>
							{/* Image */}
							{credit.image ? (
								<Image
									src={credit.image}
									alt={`${credit.role} at ${credit.event}`}
									fill
									className='object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100'
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								/>
							) : (
								// Fallback if no image is provided yet
								<div className='absolute inset-0 flex items-center justify-center bg-slate-900'>
									<span className='text-slate-700 font-bold text-lg'>
										{credit.event}
									</span>
								</div>
							)}

							{/* Gradient Overlay */}
							<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300' />

							{/* Text Content */}
							<div className='absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
								<div className='flex justify-between items-end mb-1'>
									<h3 className='text-xl font-bold text-white leading-tight'>
										{credit.event}
									</h3>
									<span className='text-xs font-mono text-slate-400 bg-slate-800/50 px-2 py-1 rounded backdrop-blur-md'>
										{credit.year}
									</span>
								</div>
								<p className='text-indigo-400 font-medium text-sm mb-1'>
									{credit.role}
								</p>
								<p className='text-slate-400 text-xs uppercase tracking-wide'>
									{credit.network}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
