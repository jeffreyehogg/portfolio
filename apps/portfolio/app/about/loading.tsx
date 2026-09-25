export default function Loading() {
	return (
		<div className='min-h-screen bg-slate-950 pt-32 sm:pt-40 pb-24'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-16 animate-pulse'>
					{/* Left Column Skeleton */}
					<div className='lg:col-span-5 space-y-8'>
						<div className='w-64 h-64 rounded-2xl bg-slate-800/80 mx-auto lg:mx-0' />
						<div className='space-y-4'>
							<div className='h-4 bg-slate-800/60 rounded w-32' />
							<div className='h-10 bg-slate-800 rounded-lg w-3/4' />
							<div className='space-y-2.5 pt-2'>
								<div className='h-4 bg-slate-800/60 rounded w-full' />
								<div className='h-4 bg-slate-800/60 rounded w-5/6' />
								<div className='h-4 bg-slate-800/60 rounded w-4/5' />
							</div>
							<div className='space-y-2.5 pt-4'>
								<div className='h-4 bg-slate-800/60 rounded w-full' />
								<div className='h-4 bg-slate-800/60 rounded w-11/12' />
								<div className='h-4 bg-slate-800/60 rounded w-3/4' />
							</div>
						</div>
					</div>

					{/* Right Column Skeleton */}
					<div className='lg:col-span-7 space-y-12'>
						<div className='rounded-2xl bg-slate-900/60 border border-slate-800 p-8 space-y-6'>
							<div className='h-6 bg-slate-800 rounded w-48' />
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
								{[1, 2, 3, 4].map((i) => (
									<div key={i} className='space-y-2'>
										<div className='h-4 bg-slate-800/80 rounded w-28' />
										<div className='h-12 bg-slate-800/40 rounded' />
									</div>
								))}
							</div>
						</div>

						<div className='space-y-6'>
							<div className='h-6 bg-slate-800 rounded w-40' />
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className='rounded-xl bg-slate-900/40 border border-slate-800/80 p-6 space-y-3'
								>
									<div className='h-5 bg-slate-800 rounded w-1/3' />
									<div className='h-4 bg-slate-800/60 rounded w-1/4' />
									<div className='h-16 bg-slate-800/30 rounded mt-2' />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
