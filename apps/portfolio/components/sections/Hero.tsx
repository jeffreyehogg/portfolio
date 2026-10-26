import Link from 'next/link'
import {
	ChevronDownIcon,
	CommandLineIcon,
	BriefcaseIcon,
	ServerStackIcon,
	CircleStackIcon,
	CodeBracketIcon,
	ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'
import { profileData } from '../../lib/data'

const metrics = [
	{ label: 'Software engineering', value: '5+ Years', icon: BriefcaseIcon },
	{ label: 'Automated infrastructure', value: 'Docker & CI/CD', icon: ServerStackIcon },
	{ label: 'Database administration', value: 'MS SQL & MySQL', icon: CircleStackIcon },
	{ label: 'Backend middleware', value: 'Node.js & TypeScript', icon: CodeBracketIcon },
]

export default function Hero() {
	return (
		<div className='relative min-h-[calc(100svh-3.5rem)] flex items-center justify-center overflow-hidden bg-slate-950 pt-28 pb-14 sm:pb-18'>
			{/* Grid Background Pattern */}
			<div className='absolute inset-0 bg-grid opacity-25 z-[1]' aria-hidden='true' />

			{/* GPU-Friendly Ambient Radial Glows (replaces heavy blur-[140px] offscreen textures on mobile) */}
			<div
				className='absolute inset-0 z-[2] pointer-events-none'
				style={{
					background:
						'radial-gradient(600px 380px at 50% 35%, rgba(79, 70, 229, 0.14), transparent 70%), radial-gradient(400px 320px at 35% 75%, rgba(8, 145, 178, 0.08), transparent 70%)',
				}}
				aria-hidden='true'
			/>

			{/* Subtle linear gradient overlays */}
			<div
				className='absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950 z-[2]'
				aria-hidden='true'
			/>

			{/* Main Content — Server-rendered at opacity:1 for instant mobile FCP/LCP */}
			<div className='relative z-10 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto'>
				<div className='animate-fade-up'>
					{/* Status Badge */}
					<div className='inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] text-slate-300 text-xs sm:text-sm font-medium mb-6'>
						<span className='relative flex h-2 w-2'>
							<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
							<span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500' />
						</span>
						<span className='text-emerald-400 font-semibold'>{profileData.status}</span>
						<span className='text-slate-600'>•</span>
						<span className='text-slate-400'>{profileData.location}</span>
					</div>

					<h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-5 text-white text-balance'>
						<span className='block mb-2 sm:mb-3'>Full-stack developer</span>
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300'>
							DevOps & system architecture
						</span>
					</h1>

					<p className='mt-4 text-base sm:text-lg text-slate-300 sm:max-w-2xl mx-auto leading-relaxed font-light text-pretty'>
						{profileData.headline}
					</p>
				</div>

				{/* Action Buttons */}
				<div className='mt-8 sm:mt-9 flex flex-wrap gap-3.5 justify-center items-center animate-fade-up animation-delay-100'>
					<Link
						href='/portfolio'
						className='group inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-colors duration-200 shadow-[0_0_20px_rgba(79,70,229,0.35)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]'
					>
						<CommandLineIcon className='w-4 h-4' />
						Explore projects
					</Link>
					<a
						href='/Jeff_Hogg_Resume.pdf'
						target='_blank'
						rel='noopener noreferrer'
						className='group inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-xl text-slate-300 border border-white/[0.08] bg-slate-900/70 hover:bg-slate-800/80 hover:text-white active:scale-[0.98] transition-colors duration-200'
					>
						<ArrowDownTrayIcon className='w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors' />
						Resume PDF
					</a>
				</div>

				{/* Metrics Grid */}
				<div className='mt-12 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto animate-fade-up animation-delay-200'>
					{metrics.map((item) => (
						<div
							key={item.label}
							className='flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-slate-900/65 border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:border-white/[0.16] hover:bg-slate-900/90 text-center transition-colors duration-200 group cursor-default'
						>
							<item.icon className='w-5 h-5 text-indigo-400 mb-1.5 group-hover:scale-110 group-hover:text-cyan-300 transition-transform duration-200' />
							<div className='text-white font-semibold text-sm sm:text-base leading-tight group-hover:text-indigo-200 transition-colors'>
								{item.value}
							</div>
							<div className='text-xs text-slate-400 mt-1 font-normal'>
								{item.label}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Subtle Bottom Arrow */}
			<div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-10 motion-safe:animate-bounce' aria-hidden='true'>
				<ChevronDownIcon className='w-4 h-4 text-slate-500' />
			</div>
		</div>
	)
}
