export default function Loading() {
	return (
		<div className='w-full min-h-screen bg-[#FAFAF8] pt-32 pb-24'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='animate-pulse space-y-8'>
					<div className='h-10 bg-stone-200 rounded-lg w-80' />
					<div className='h-5 bg-stone-200/70 rounded w-96' />
					<div className='rounded-2xl bg-white border border-stone-200 h-80 mt-10' />
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className='rounded-2xl bg-white border border-stone-200 h-96'
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
