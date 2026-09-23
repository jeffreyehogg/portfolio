import Image from 'next/image'
function Avatar() {
	return (
		<Image
			className='rounded-full object-cover h-full w-full'
			loading='eager'
			width={40}
			height={40}
			src='/images/headshots/me.jpg'
			alt='Headshot of Jeff Hogg'
		/>
	)
}

export default Avatar
