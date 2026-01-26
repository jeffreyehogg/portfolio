'use client'

import { useEffect, useRef, useState, useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { sendEmail, type FormState } from '../../app/actions/contact-action'
import {
	GoogleReCaptchaProvider,
	useGoogleReCaptcha,
} from 'react-google-recaptcha-v3'
import { motion, AnimatePresence } from 'framer-motion'
import MessageSent from '../ui/MessageSent'
import { XCircleIcon } from '@heroicons/react/24/solid'

const initialState: FormState = { status: 'idle', message: '' }

function SubmitButton() {
	const { pending } = useFormStatus()
	return (
		<button
			type='submit'
			disabled={pending}
			className='w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-full shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 hover:shadow-indigo-500/25'
		>
			{pending ? (
				<span className='flex items-center'>
					<svg
						className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						></path>
					</svg>
					Sending...
				</span>
			) : (
				'Send Message'
			)}
		</button>
	)
}

function ContactFormInner() {
	const [state, formAction] = useActionState(sendEmail, initialState)
	const [recaptchaToken, setRecaptchaToken] = useState<string>('')
	const { executeRecaptcha } = useGoogleReCaptcha()
	const formRef = useRef<HTMLFormElement>(null)

	useEffect(() => {
		if (!executeRecaptcha) {
			return
		}
		const getToken = async () => {
			const token = await executeRecaptcha('contactForm')
			setRecaptchaToken(token)
		}
		getToken()
	}, [executeRecaptcha])

	useEffect(() => {
		if (state.status === 'success') {
			formRef.current?.reset()
		}
	}, [state.status])

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 p-8 sm:p-10'
		>
			<form
				ref={formRef}
				action={formAction}
				className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'
			>
				<div>
					<label
						htmlFor='firstName'
						className='block text-sm font-semibold text-slate-200'
					>
						First name
					</label>
					<div className='mt-2'>
						<input
							type='text'
							name='firstName'
							id='firstName'
							autoComplete='given-name'
							required
							className='block w-full rounded-lg border-0 px-4 py-3 text-slate-100 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-slate-950/50 focus:bg-slate-950 transition-colors'
						/>
					</div>
					{state.errors?.firstName && (
						<p className='text-sm text-red-400 mt-1'>
							{state.errors.firstName[0]}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor='lastName'
						className='block text-sm font-semibold text-slate-200'
					>
						Last name
					</label>
					<div className='mt-2'>
						<input
							type='text'
							name='lastName'
							id='lastName'
							autoComplete='family-name'
							required
							className='block w-full rounded-lg border-0 px-4 py-3 text-slate-100 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-slate-950/50 focus:bg-slate-950 transition-colors'
						/>
					</div>
					{state.errors?.lastName && (
						<p className='text-sm text-red-400 mt-1'>
							{state.errors.lastName[0]}
						</p>
					)}
				</div>

				<div className='sm:col-span-2'>
					<label
						htmlFor='email'
						className='block text-sm font-semibold text-slate-200'
					>
						Email
					</label>
					<div className='mt-2'>
						<input
							id='email'
							name='email'
							type='email'
							autoComplete='email'
							required
							className='block w-full rounded-lg border-0 px-4 py-3 text-slate-100 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-slate-950/50 focus:bg-slate-950 transition-colors'
						/>
					</div>
					{state.errors?.email && (
						<p className='text-sm text-red-400 mt-1'>{state.errors.email[0]}</p>
					)}
				</div>

				<div className='sm:col-span-2'>
					<div className='flex justify-between'>
						<label
							htmlFor='phone'
							className='block text-sm font-semibold text-slate-200'
						>
							Phone
						</label>
						<span className='text-sm text-slate-500'>Optional</span>
					</div>
					<div className='mt-2'>
						<input
							type='text'
							name='phone'
							id='phone'
							autoComplete='tel'
							className='block w-full rounded-lg border-0 px-4 py-3 text-slate-100 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-slate-950/50 focus:bg-slate-950 transition-colors'
						/>
					</div>
				</div>

				<div className='sm:col-span-2'>
					<label
						htmlFor='subject'
						className='block text-sm font-semibold text-slate-200'
					>
						Subject
					</label>
					<div className='mt-2'>
						<input
							type='text'
							name='subject'
							id='subject'
							required
							className='block w-full rounded-lg border-0 px-4 py-3 text-slate-100 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-slate-950/50 focus:bg-slate-950 transition-colors'
						/>
					</div>
					{state.errors?.subject && (
						<p className='text-sm text-red-400 mt-1'>
							{state.errors.subject[0]}
						</p>
					)}
				</div>

				<div className='sm:col-span-2'>
					<div className='flex justify-between'>
						<label
							htmlFor='message'
							className='block text-sm font-semibold text-slate-200'
						>
							Message
						</label>
						<span className='text-sm text-slate-500'>Max. 500 characters</span>
					</div>
					<div className='mt-2'>
						<textarea
							id='message'
							name='message'
							rows={4}
							required
							maxLength={500}
							className='block w-full rounded-lg border-0 px-4 py-3 text-slate-100 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-slate-950/50 focus:bg-slate-950 transition-colors resize-none'
						/>
					</div>
					{state.errors?.message && (
						<p className='text-sm text-red-400 mt-1'>
							{state.errors.message[0]}
						</p>
					)}
				</div>

				<input type='hidden' name='recaptchaToken' value={recaptchaToken} />

				<div className='col-span-1 sm:col-span-2'>
					<AnimatePresence>
						{state.status === 'success' && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
							>
								<MessageSent />
							</motion.div>
						)}
						{state.status === 'error' && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								className='rounded-md bg-red-900/20 border border-red-900/50 p-4'
							>
								<div className='flex'>
									<div className='shrink-0'>
										<XCircleIcon
											className='h-5 w-5 text-red-400'
											aria-hidden='true'
										/>
									</div>
									<div className='ml-3'>
										<p className='text-sm font-medium text-red-400'>
											{state.message}
										</p>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				<div className='col-span-1 sm:col-span-2 flex justify-end mt-4'>
					<SubmitButton />
				</div>
			</form>
		</motion.div>
	)
}

export default function ContactForm() {
	const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

	if (!recaptchaKey) {
		return (
			<div className='rounded-md bg-yellow-900/20 border border-yellow-900/50 p-4'>
				<div className='flex'>
					<div className='ml-3'>
						<h3 className='text-sm font-medium text-yellow-500'>
							Configuration Missing
						</h3>
						<div className='mt-2 text-sm text-yellow-600'>
							<p>
								reCAPTCHA key not found. Contact form is currently disabled.
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
			<ContactFormInner />
		</GoogleReCaptchaProvider>
	)
}
