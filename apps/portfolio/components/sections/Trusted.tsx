import Image from 'next/image'
import { trustedCompaniesData } from '../../lib/data'

export default function Trusted() {
	// Duplicate logos for seamless CSS infinite scroll
	const logos = [
		...trustedCompaniesData,
		...trustedCompaniesData,
		...trustedCompaniesData,
		...trustedCompaniesData,
	]

	return (
		<section className='cv-auto py-16 sm:py-20 bg-slate-950 relative overflow-hidden'>
			{/* Subtle top/bottom divider lines */}
			<div className='absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='max-w-2xl mx-auto text-center mb-12 sm:mb-14'>
					<h2 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
						Companies I&apos;ve worked with
					</h2>
					<p className='mt-2.5 text-base text-slate-400'>
						Production environments where I&apos;ve delivered scalable software and automated infrastructure.
					</p>
				</div>

				{/* Marquee Container — Pure CSS hardware-accelerated animation with reduced-motion fallback */}
				<div className='relative'>
					{/* Fade edges */}
					<div className='absolute left-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none' />
					<div className='absolute right-0 top-0 bottom-0 w-20 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none' />

					<div className='overflow-hidden'>
						<div className='flex items-center gap-16 w-max animate-marquee motion-reduce:animate-none motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center'>
							{logos.map((company, index) => (
								<div
									key={`${company.name}-${index}`}
									className={`flex-shrink-0 flex justify-center items-center opacity-60 hover:opacity-100 transition-opacity duration-200 ${
										index >= trustedCompaniesData.length ? 'motion-reduce:hidden' : ''
									}`}
								>
									<Image
										width={company.width}
										height={company.height}
										src={company.imageUrl}
										alt={company.name}
										loading='lazy'
										className='h-10 sm:h-11 w-auto object-contain'
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className='absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent' />
		</section>
	)
}
