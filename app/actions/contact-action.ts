'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
	firstName: z.string().min(1, { message: 'First name is required.' }),
	lastName: z.string().min(1, { message: 'Last name is required.' }),
	email: z.string().email({ message: 'Invalid email address.' }),
	phone: z.string().optional(),
	subject: z.string().min(1, { message: 'Subject is required.' }),
	message: z.string().min(1, { message: 'Message is required.' }),
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
	prevState: FormState,
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

	const recaptchaSecret = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY
	const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`

	try {
		const recaptchaRes = await fetch(recaptchaUrl, { method: 'POST' })
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

	try {
		await resend.emails.send({
			from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain
			to: 'YOUR_EMAIL@gmail.com', // Your personal email
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
