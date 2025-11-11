'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
}

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
}

const Testimonials = () => {
	const testimonies = [
		{
			name: 'Elon Musk',
			company: 'Space X',
			testimonial:
				'Jeff is a great guy, I would hire him in a heartbeat if he would return my calls.',
			image: '/images/headshots/elonmusk.jpeg',
		},
		{
			name: 'Tim Cook',
			company: 'Apple',
			testimonial: "Wow, he is amazing! I'm surprised he's not my boss yet!",
			image: '/images/headshots/timcook.png',
		},
		{
			name: 'Chuck Robbins',
			company: 'Cisco',
			testimonial:
				"Jeff is probably the best developer I have ever met. He's definitely my best hire.",
			image: '/images/headshots/chuckrobbins.jpeg',
		},
	]

	return (
		<div>
			<section className='py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24'>
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='relative'>
						<h2 className='text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10'>
							What people might be saying...
						</h2>
						<p className='mt-3 text-xl text-gray-500 sm:mt-4'>(Probably) </p>

						{/* --- Updated this motion.div --- */}
						<motion.div
							className='mt-8 grid grid-cols-1 md:grid-cols-3  gap-8 items-stretch'
							variants={containerVariants}
							initial='hidden'
							whileInView='visible' // Changed animate to whileInView
							viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% is visible
						>
							{testimonies.map((testimony) => (
								<motion.div
									key={testimony.name}
									variants={itemVariants}
									className='flex flex-col bg-white rounded-lg shadow-lg overflow-hidden p-8 transition-shadow duration-300 hover:shadow-xl'
								>
									<blockquote className='flex flex-col flex-grow'>
										<div className='flex-grow'>
											<p className='italic text-xl leading-8 text-gray-700'>
												&ldquo;{testimony.testimonial}&rdquo;
											</p>
										</div>
										<footer className='mt-8'>
											<div className='flex items-center'>
												<div className='shrink-0 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer'>
													<Image
														className='mx-auto rounded-full'
														src={testimony.image}
														alt={testimony.name}
														width={64}
														height={64}
													/>
												</div>
												<div className='ml-4'>
													<div className='text-base font-medium text-gray-900'>
														{testimony.name}
													</div>
													<div className='text-base font-medium text-gray-500'>
														CEO, {testimony.company}
													</div>
												</div>
											</div>
										</footer>
									</blockquote>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Testimonials
