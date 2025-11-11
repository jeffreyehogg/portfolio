// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
	return (
		<main className='grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='py-36'>
				<div className='text-center'>
					<p className='text-sm font-semibold text-indigo-400 uppercase tracking-wide'>
						404 error
					</p>
					<h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
						Wow, you found a page that doesn't exist!
					</h1>
					<p className='mt-2 text-base text-gray-500'>
						How did you even get here? I'm impressed.
					</p>
					<div className='mt-6'>
						<Link
							href='/'
							className='text-base font-medium text-indigo-400 hover:text-indigo-500'
						>
							Go back home<span aria-hidden='true'> &rarr;</span>
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}
