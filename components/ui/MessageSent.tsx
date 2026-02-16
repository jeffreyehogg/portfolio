import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

export default function MessageSent() {
	return (
		<div className='rounded-lg bg-emerald-900/20 border border-emerald-900/50 p-4'>
			<div className='flex'>
				<div className='shrink-0'>
					<CheckCircleIcon
						className='h-5 w-5 text-emerald-400'
						aria-hidden='true'
					/>
				</div>
				<div className='ml-3'>
					<p className='text-sm font-medium text-emerald-300'>
						Message sent successfully!
					</p>
				</div>
				<div className='ml-auto pl-3'>
					<div className='-mx-1.5 -my-1.5'>
						<button
							type='button'
							className='inline-flex rounded-full p-1.5 text-emerald-400 hover:bg-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 transition-colors'
						>
							<span className='sr-only'>Dismiss</span>
							<XMarkIcon className='h-5 w-5' aria-hidden='true' />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
