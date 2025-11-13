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

			{/* 1. Add top padding (pt-32, sm:pt-40, etc.) to push content below the absolute navbar */}
			<div className='relative px-4 pt-32 pb-16 sm:px-6 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 lg:px-8 z-20'>
				<h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
					<span className='block text-white'>Hi, I'm Jeff</span>
					{/* 2. Fix title to be "Software Engineer" for consistency */}
					<span className='block text-indigo-200'>Software Engineer</span>
				</h1>
				<p className='mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl'>
					Check out my portfolio and web development services below.
				</p>
				<div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'>
					<div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5'>
						<Link
							href='/portfolio'
							// 3. Update button styles (color and rounded-md)
							className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 sm:px-8 transition-transform duration-200 hover:scale-105'
						>
							Portfolio
						</Link>
						<Link
							href='/about'
							// 3. Update button styles (rounded-md)
							className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-gray-50 sm:px-8 transition-transform duration-200 hover:scale-105'
						>
							About
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}