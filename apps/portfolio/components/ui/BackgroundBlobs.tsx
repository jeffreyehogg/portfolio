export default function BackgroundBlobs() {
	return (
		<div
			className='absolute inset-0 pointer-events-none overflow-hidden'
			style={{
				background:
					'radial-gradient(500px 400px at 25% 15%, rgba(79, 70, 229, 0.25), transparent 70%), radial-gradient(500px 400px at 75% 20%, rgba(147, 51, 234, 0.22), transparent 70%), radial-gradient(500px 400px at 50% 85%, rgba(37, 99, 235, 0.2), transparent 70%)',
			}}
			aria-hidden='true'
		/>
	)
}
