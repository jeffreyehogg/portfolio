import Link from 'next/link'

export default function Hero() {
	return (
		<div className='relative shadow-xl sm:overflow-hidden'>
			<video
				autoPlay
				loop
				muted
				playsInline
				className='absolute inset-0 w-full h-full object-cover z-0'
			>
				<source src='/videos/space.mp4' type='video/mp4' />
				Your browser does not support the video tag.
			</video>

			<div
				className='absolute inset-0 bg-black bg-opacity-60 mix-blend-multiply z-10'
				aria-hidden='true'
			/>

			<div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 z-20'>
				<h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
					<span className='block text-white'>Hi, I'm Jeff</span>
					<span className='block text-indigo-200'>Software Developer</span>
				</h1>
				<p className='mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl'>
					Check out my portfolio and web development services below.
				</p>
				<div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'>
					<div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5'>
						<Link
							href='/portfolio'
							className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-700 hover:bg-opacity-70 sm:px-8 transition-transform duration-200 hover:scale-105'
						>
							Portfolio
						</Link>
						<Link
							href='/about'
							className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8 transition-transform duration-200 hover:scale-105'
						>
							About
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}