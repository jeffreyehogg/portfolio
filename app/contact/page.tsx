import type { Metadata } from 'next'
import ContactForm from '../../components/forms/ContactForm'

export const metadata: Metadata = {
	title: 'Contact',
	description:
		'Get in touch with Jeff Hogg for full-stack web engineering, native iOS apps, and API integration.',
	alternates: { canonical: '/contact' },
}

export default function Contact() {
	return (
		<div className='w-full min-h-screen bg-[#FAFAF8] pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto'>
				<div className='mb-10 sm:mb-12 animate-fade-up'>
					<div className='font-mono text-[11px] uppercase tracking-[0.16em] text-indigo-600 mb-2.5'>
						01 / Contact
					</div>
					<h1 className='text-3xl font-semibold text-stone-950 sm:text-5xl tracking-[-0.03em] text-balance'>
						Let&apos;s build{' '}
						<span className='font-serif italic font-normal text-indigo-600'>
							together.
						</span>
					</h1>
					<p className='mt-3.5 text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed text-pretty'>
						Have a web app, native iOS project, or API integration in mind? Send a message below.
					</p>
				</div>

				<ContactForm />
			</div>
		</div>
	)
}
