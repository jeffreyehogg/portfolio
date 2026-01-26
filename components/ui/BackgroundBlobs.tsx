export default function BackgroundBlobs() {
	return (
		<div className='absolute inset-0 pointer-events-none overflow-hidden'>
			<div className='absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob' />
			<div className='absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000' />
			<div className='absolute -bottom-32 left-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-4000' />
		</div>
	)
}
