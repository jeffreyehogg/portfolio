'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { trustedCompaniesData } from '../lib/data'

const Trusted = () => {
	return (
		<motion.div
			className='bg-white pt-12 sm:pt-16'
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.6 }}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>
						Trusted by some of the most innovative companies in the world.
					</h2>
					<p className='mt-3 text-xl text-gray-500 sm:mt-4'>
						Here are a few that I've worked with:
					</p>
				</div>
			</div>
			<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-4'>
					{trustedCompaniesData.map((company) => (
						<div
							key={company.name}
							className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1 transition-transform duration-300 ease-in-out hover:scale-105'
						>
							<Image
								width={company.width}
								height={company.height}
								src={company.imageUrl}
								alt={company.name}
							/>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	)
}

export default Trusted
