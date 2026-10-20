import Image from 'next/image'

function Avatar() {
	return (
		<Image
			className='rounded-full object-cover h-full w-full'
			width={32}
			height={32}
			sizes='32px'
			src='/images/headshots/me.jpg'
			alt='Headshot of Jeff Hogg'
		/>
	)
}

export default Avatar
