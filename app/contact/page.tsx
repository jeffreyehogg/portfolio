import type { Metadata } from 'next'
import ContactForm from '../../components/forms/ContactForm'
import BackgroundBlobs from '../../components/ui/BackgroundBlobs'

export const metadata: Metadata = {
	title: 'Contact - Jeff Hogg',
	description: 'Get in touch with Jeff Hogg for software development projects.',
}

export default function Contact() {
	return (
		<div className='min-h-screen bg-slate-950 relative overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8'>
			{/* Background Blobs with reduced opacity for dark theme */}
			<div className='absolute inset-0 pointer-events-none opacity-20'>
				<BackgroundBlobs />
			</div>

			<div className='max-w-3xl mx-auto relative z-10'>
				<div className='text-center mb-12'>
					<h2 className='text-indigo-400 font-semibold tracking-wide uppercase text-sm'>
						Contact
					</h2>
					<h1 className='mt-2 text-3xl font-extrabold text-white sm:text-4xl'>
						Let&apos;s Build Something Amazing
					</h1>
					<p className='mt-4 text-xl text-slate-400 max-w-2xl mx-auto'>
						Have a project in mind or want to discuss the latest in tech? Feel
						free to reach out—I&apos;m always open to new opportunities and
						connections.
					</p>
				</div>

				<ContactForm />
			</div>
		</div>
	)
}
