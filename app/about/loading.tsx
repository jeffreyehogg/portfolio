export default function Loading() {
	return (
		<div className='w-full min-h-screen bg-[#FAFAF8] pt-32 sm:pt-40 pb-24'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-16 animate-pulse'>
					<div className='lg:col-span-5 space-y-8'>
						<div className='w-52 h-52 rounded-2xl bg-stone-200 mx-auto lg:mx-0' />
						<div className='space-y-4'>
							<div className='h-3 bg-stone-200 rounded w-28' />
							<div className='h-10 bg-stone-200 rounded-lg w-3/4' />
							<div className='space-y-2.5 pt-2'>
								<div className='h-4 bg-stone-200/80 rounded w-full' />
								<div className='h-4 bg-stone-200/80 rounded w-5/6' />
								<div className='h-4 bg-stone-200/80 rounded w-4/5' />
							</div>
						</div>
					</div>
					<div className='lg:col-span-7 space-y-8'>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className='rounded-2xl bg-white border border-stone-200 p-6 space-y-3'
							>
								<div className='h-5 bg-stone-200 rounded w-1/3' />
								<div className='h-4 bg-stone-200/70 rounded w-1/4' />
								<div className='h-16 bg-stone-100 rounded mt-2' />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
