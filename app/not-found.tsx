import Link from 'next/link'

export default function NotFound() {
	return (
		<main className='grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 bg-[#FAFAF8]'>
			<div className='py-36'>
				<div className='text-center'>
					<p className='font-mono text-xs uppercase tracking-[0.16em] text-indigo-600'>
						404 / Not found
					</p>
					<h1 className='mt-3 text-4xl font-semibold text-stone-950 tracking-[-0.03em] sm:text-5xl'>
						This page doesn&apos;t{' '}
						<span className='font-serif italic font-normal text-indigo-600'>
							exist.
						</span>
					</h1>
					<p className='mt-3 text-base text-stone-600'>
						How did you even get here? Let&apos;s get you back on track.
					</p>
					<div className='mt-7'>
						<Link
							href='/'
							className='inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-950 hover:bg-indigo-600 text-white text-sm font-medium transition-colors'
						>
							Go back home <span aria-hidden='true'>&rarr;</span>
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}
