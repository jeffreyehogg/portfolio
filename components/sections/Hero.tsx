import Link from 'next/link'
import {
	ArrowRightIcon,
	ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import { profileData } from '../../lib/data'

const metrics = [
	{ label: 'Software engineering', value: '5+ Years' },
	{ label: 'Frontend & full-stack', value: 'Angular, React & Next.js' },
	{ label: 'Native iOS apps', value: 'Swift & SwiftUI' },
	{ label: 'APIs & databases', value: 'TypeScript, Python & SQL' },
]

export default function Hero() {
	return (
		<section className='relative bg-[#FAFAF8] pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden border-b border-stone-200/80'>
			{/* Subtle masked architectural paper grid */}
			<div
				className='absolute inset-0 bg-grid opacity-70 pointer-events-none'
				style={{
					maskImage: 'radial-gradient(ellipse 80% 70% at 30% 35%, #000 20%, transparent 100%)',
					WebkitMaskImage:
						'radial-gradient(ellipse 80% 70% at 30% 35%, #000 20%, transparent 100%)',
				}}
				aria-hidden='true'
			/>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl animate-fade-up'>
					{/* Live Current Role Mono Status */}
					<Link
						href='/about#experience'
						className='inline-flex items-center gap-2.5 text-xs font-mono text-stone-600 hover:text-stone-950 transition-colors mb-7 group px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200/90 shadow-[0_1px_2px_rgba(17,17,16,0.03)]'
					>
						<span className='relative flex h-2 w-2 shrink-0'>
							<span className='motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75' />
							<span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-600' />
						</span>
						<span className='font-medium text-stone-800 group-hover:text-gblue-700 transition-colors'>
							Software Engineer @ TWFG Insurance
						</span>
						<span className='text-stone-300 hidden sm:inline'>/</span>
						<span className='text-stone-500 hidden sm:inline'>The Woodlands, TX</span>
					</Link>

					{/* Editorial Display Heading */}
					<h1 className='text-4xl sm:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.035em] leading-[1.06] text-stone-950 text-balance'>
						Software Engineer building{' '}
						<span className='font-serif italic font-normal text-gblue-600 tracking-[-0.01em]'>
							web &amp; native iOS apps.
						</span>
					</h1>

					<p className='mt-6 text-base sm:text-xl text-stone-600 max-w-2xl leading-relaxed font-normal text-pretty'>
						{profileData.headline}
					</p>

					{/* Action Buttons */}
					<div className='mt-9 flex flex-wrap gap-3.5 items-center'>
						<Link
							href='/portfolio'
							className='group inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-medium rounded-full text-white bg-stone-950 hover:bg-gblue-600 active:scale-[0.98] transition-colors duration-200 shadow-sm'
						>
							Explore projects
							<ArrowRightIcon className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
						</Link>
						<a
							href='/Jeff_Hogg_Resume.pdf'
							target='_blank'
							rel='noopener noreferrer'
							className='group inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base font-medium rounded-full text-stone-700 border border-stone-300/90 bg-white hover:bg-stone-100 hover:border-stone-400 hover:text-stone-950 active:scale-[0.98] transition-colors duration-200'
						>
							<ArrowDownTrayIcon className='w-4 h-4 text-stone-500 group-hover:text-gblue-600 transition-colors' />
							Resume PDF
						</a>
					</div>
				</div>

				{/* Hairline-Divided Editorial Metadata Strip */}
				<div className='mt-16 sm:mt-20 pt-8 border-t border-stone-200/90 grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8 animate-fade-up animation-delay-100'>
					{metrics.map((item, idx) => (
						<div
							key={item.label}
							className={
								idx > 0
									? 'lg:border-l lg:border-stone-200/90 lg:pl-8'
									: undefined
							}
						>
							<div className='font-mono text-[11px] uppercase tracking-[0.12em] text-stone-500 mb-1.5'>
								{item.label}
							</div>
							<div className='text-stone-950 font-semibold text-base sm:text-lg tracking-tight'>
								{item.value}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
