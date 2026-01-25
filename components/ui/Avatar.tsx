import Image from 'next/image'
import headshot from '../public/images/headshots/me.jpg'

function Avatar() {
	return (
		<Image
			className='rounded-full object-cover h-full w-full'
			loading='eager'
			width={40}
			height={40}
			src={headshot}
			alt='Headshot of Jeff Hogg'
		/>
	)
}

export default Avatar
