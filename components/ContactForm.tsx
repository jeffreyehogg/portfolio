'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { sendEmail, type FormState } from '../app/actions/contact-action'
import {
	GoogleReCaptchaProvider,
	useGoogleReCaptcha,
} from 'react-google-recaptcha-v3'
import MessageSent from './MessageSent'
import { XCircleIcon } from '@heroicons/react/24/solid'

const initialState: FormState = { status: 'idle', message: '' }

function SubmitButton() {
	const { pending } = useFormStatus()
	return (
		<button
			type='submit'
			disabled={pending}
			className='mt-2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto disabled:bg-gray-400'
		>
			{pending ? 'Submitting...' : 'Submit'}
		</button>
	)
}

function ContactFormInner() {
	const [state, formAction] = useFormState(sendEmail, initialState)
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
		<div className='md:shadow-lg md:rounded-lg md:p-8 md:m-4 max-w-4xl mx-auto px-4'>
			<form
				ref={formRef}
				action={formAction}
				className='md:m-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8'
			>
				<div>
					<label
						htmlFor='firstName'
						className='block text-sm font-medium text-gray-900'
					>
						First name
					</label>
					<div className='mt-1'>
						<input
							type='text'
							name='firstName'
							id='firstName'
							autoComplete='given-name'
							required
							className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
						/>
					</div>
					{state.errors?.firstName && (
						<p className='text-sm text-red-500 mt-1'>
							{state.errors.firstName[0]}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor='lastName'
						className='block text-sm font-medium text-gray-900'
					>
						Last name
					</label>
					<div className='mt-1'>
						<input
							type='text'
							name='lastName'
							id='lastName'
							autoComplete='family-name'
							required
							className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
						/>
					</div>
					{state.errors?.lastName && (
						<p className='text-sm text-red-500 mt-1'>
							{state.errors.lastName[0]}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-900'
					>
						Email
					</label>
					<div className='mt-1'>
						<input
							id='email'
							name='email'
							type='email'
							autoComplete='email'
							required
							className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
						/>
					</div>
					{state.errors?.email && (
						<p className='text-sm text-red-500 mt-1'>{state.errors.email[0]}</p>
					)}
				</div>
				<div>
					<div className='flex justify-between'>
						<label
							htmlFor='phone'
							className='block text-sm font-medium text-gray-900'
						>
							Phone
						</label>
						<span id='phone-optional' className='text-sm text-gray-500'>
							Optional
						</span>
					</div>
					<div className='mt-1'>
						<input
							type='text'
							name='phone'
							id='phone'
							autoComplete='tel'
							className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
							aria-describedby='phone-optional'
						/>
					</div>
				</div>
				<div className='sm:col-span-2'>
					<label
						htmlFor='subject'
						className='block text-sm font-medium text-gray-900'
					>
						Subject
					</label>
					<div className='mt-1'>
						<input
							type='text'
							name='subject'
							id='subject'
							required
							className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
						/>
					</div>
					{state.errors?.subject && (
						<p className='text-sm text-red-500 mt-1'>
							{state.errors.subject[0]}
						</p>
					)}
				</div>
				<div className='sm:col-span-2'>
					<div className='flex justify-between'>
						<label
							htmlFor='message'
							className='block text-sm font-medium text-gray-900'
						>
							Message
						</label>
						<span id='message-max' className='text-sm text-gray-500'>
							Max. 500 characters
						</span>
					</div>
					<div className='mt-1'>
						<textarea
							id='message'
							name='message'
							rows={4}
							required
							maxLength={500}
							className='py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md'
							aria-describedby='message-max'
						/>
					</div>
					{state.errors?.message && (
						<p className='text-sm text-red-500 mt-1'>
							{state.errors.message[0]}
						</p>
					)}
				</div>

				<input type='hidden' name='recaptchaToken' value={recaptchaToken} />

				<div className='col-span-1 sm:col-span-2'>
					{state.status === 'success' && <MessageSent />}
					{state.status === 'error' && (
						<div className='rounded-md bg-red-50 p-4'>
							<div className='flex'>
								<div className='shrink-0'>
									<XCircleIcon
										className='h-5 w-5 text-red-400'
										aria-hidden='true'
									/>
								</div>
								<div className='ml-3'>
									<p className='text-sm font-medium text-red-800'>
										{state.message}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className='col-span-1 md:col-span-2'>
					<SubmitButton />
				</div>
			</form>
		</div>
	)
}

export default function ContactForm() {
	const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

	if (!recaptchaKey) {
		return <p>reCAPTCHA key not found. Contact form is disabled.</p>
	}

	return (
		<GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
			<ContactFormInner />
		</GoogleReCaptchaProvider>
	)
}
