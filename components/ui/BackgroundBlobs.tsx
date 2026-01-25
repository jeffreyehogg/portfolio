export default function BackgroundBlobs() {
	return (
		<div className='absolute inset-0 pointer-events-none overflow-hidden'>
			<div className='absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob' />
			<div className='absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000' />
			<div className='absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000' />
		</div>
	)
}
