import type { Metadata } from 'next'
import ContactForm from '../../components/ContactForm'

export const metadata: Metadata = {
	title: 'Contact - Jeff Hogg',
	description: 'Get in touch with Jeff Hogg for software development projects.',
}

export default function Contact() {
	return (
		<div className='min-h-screen bg-gray-50 relative overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8'>
			{/* Background Blobs */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob' />
				<div className='absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000' />
				<div className='absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000' />
			</div>

			<div className='max-w-3xl mx-auto relative z-10'>
				<div className='text-center mb-12'>
					<h2 className='text-indigo-600 font-semibold tracking-wide uppercase text-sm'>
						Contact
					</h2>
					<h1 className='mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl'>
						Let&apos;s Build Something Amazing
					</h1>
					<p className='mt-4 text-xl text-gray-500 max-w-2xl mx-auto'>
						Have a project in mind or want to discuss the latest in tech?
						I&apos;m currently available for new opportunities.
					</p>
				</div>

				<ContactForm />
			</div>
		</div>
	)
}
