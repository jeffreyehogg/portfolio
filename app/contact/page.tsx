import type { Metadata } from 'next'
import ContactForm from '../../components/ContactForm'

export const metadata: Metadata = {
	title: 'Contact - Jeff Hogg',
	description: 'Get in touch with Jeff Hogg for software development projects.',
}

export default function Contact() {
	return (
		<div className='min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto'>
				<div className='text-center mb-12'>
					<h1 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>
						Get in Touch
					</h1>
					<p className='mt-4 text-xl text-gray-500'>
						Have a project in mind or want to discuss the latest in tech? I'm
						currently available for new opportunities.
					</p>
				</div>

				<ContactForm />
			</div>
		</div>
	)
}
