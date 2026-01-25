'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { trustedCompaniesData } from '../../lib/data'
import BackgroundBlobs from '../ui/BackgroundBlobs'

const Trusted = () => {
	return (
		<section className='py-20 bg-white sm:py-24'>
			{/* Background Blobs */}
			<BackgroundBlobs />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='max-w-2xl mx-auto text-center mb-16'>
					<h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>
						Trusted by Innovators
					</h2>
					<p className='mt-4 text-lg text-gray-500'>
						Collaborating with forward-thinking companies to build the future.
					</p>
				</div>

				<motion.div
					className='grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12 items-center'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.2 }}
					variants={{
						visible: {
							transition: { staggerChildren: 0.1 },
						},
					}}
				>
					{trustedCompaniesData.map((company) => (
						<motion.div
							key={company.name}
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: { opacity: 1, y: 0 },
							}}
							className='col-span-1 flex justify-center transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer'
						>
							<Image
								width={company.width}
								height={company.height}
								src={company.imageUrl}
								alt={company.name}
								className='h-12 w-auto object-contain'
							/>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}

export default Trusted
