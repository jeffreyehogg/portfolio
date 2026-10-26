'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { env } from '../../lib/env'

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

const contactSchema = z.object({
	firstName: z
		.string()
		.min(1, { message: 'First name is required.' })
		.max(100, { message: 'First name must be 100 characters or less.' }),
	lastName: z
		.string()
		.min(1, { message: 'Last name is required.' })
		.max(100, { message: 'Last name must be 100 characters or less.' }),
	email: z.string().email({ message: 'Invalid email address.' }),
	phone: z.string().optional(),
	subject: z
		.string()
		.min(1, { message: 'Subject is required.' })
		.max(200, { message: 'Subject must be 200 characters or less.' }),
	message: z
		.string()
		.min(1, { message: 'Message is required.' })
		.max(5000, { message: 'Message must be 5000 characters or less.' }),
	recaptchaToken: z
		.string()
		.min(1, { message: 'reCAPTCHA verification failed.' }),
})

export interface FormState {
	status: 'idle' | 'success' | 'error'
	message: string
	errors?: Record<string, string[]>
}

export async function sendEmail(
	_prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const rawFormData = Object.fromEntries(formData)

	const validatedFields = contactSchema.safeParse(rawFormData)

	if (!validatedFields.success) {
		return {
			status: 'error',
			message: 'Validation failed.',
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	const { recaptchaToken, ...emailContent } = validatedFields.data

	const recaptchaSecret = env.RECAPTCHA_SECRET_KEY
	const recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify'

	try {
		const recaptchaRes = await fetch(recaptchaUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				secret: recaptchaSecret || '',
				response: recaptchaToken,
			}),
		})
		const recaptchaData = await recaptchaRes.json()

		if (!recaptchaData.success || recaptchaData.score < 0.5) {
			return {
				status: 'error',
				message: 'reCAPTCHA validation failed. Are you a robot?',
			}
		}
	} catch (error) {
		console.error('reCAPTCHA Error:', error)
		return { status: 'error', message: 'reCAPTCHA service is unavailable.' }
	}

	if (!resend || !env.RESEND_EMAIL_TO) {
		return {
			status: 'error',
			message: 'Email service is not configured.',
		}
	}

	try {
		await resend.emails.send({
			from: 'Portfolio Contact <contact@jeffhogg.com>',
			to: env.RESEND_EMAIL_TO,
			subject: emailContent.subject,
			text: `
        From: ${emailContent.firstName} ${emailContent.lastName}
        Email: ${emailContent.email}
        Phone: ${emailContent.phone || 'Not provided'}

        Message:
        ${emailContent.message}
      `,
		})

		return { status: 'success', message: 'Message sent successfully!' }
	} catch (error) {
		console.error('Email Error:', error)
		return {
			status: 'error',
			message: 'Something went wrong. Please try again.',
		}
	}
}
