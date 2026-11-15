export default function Loading() {
	return (
		<div className='min-h-screen bg-slate-950 pt-32 pb-24'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='animate-pulse space-y-8'>
					<div className='h-10 bg-slate-800 rounded-lg w-80' />
					<div className='h-5 bg-slate-800/60 rounded w-96' />
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12'>
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div
								key={i}
								className='rounded-2xl bg-slate-900/60 border border-slate-800 h-96'
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
