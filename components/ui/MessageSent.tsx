import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

export default function MessageSent() {
	return (
		<div className='rounded-xl bg-emerald-50 border border-emerald-200 p-4'>
			<div className='flex'>
				<div className='shrink-0'>
					<CheckCircleIcon
						className='h-5 w-5 text-emerald-700'
						aria-hidden='true'
					/>
				</div>
				<div className='ml-3'>
					<p className='text-sm font-medium text-emerald-900'>
						Message sent successfully!
					</p>
				</div>
				<div className='ml-auto pl-3'>
					<div className='-mx-1.5 -my-1.5'>
						<button
							type='button'
							className='inline-flex rounded-full p-1.5 text-emerald-700 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 transition-colors'
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
