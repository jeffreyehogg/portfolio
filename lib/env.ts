import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		RESEND_API_KEY: z.string().min(1).optional(),
		RESEND_EMAIL_TO: z.string().email().optional(),
		RECAPTCHA_SECRET_KEY: z.string().min(1).optional(),
	},
	client: {
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1).optional(),
		NEXT_PUBLIC_BUYMEACOFFEE_URL: z.string().url().optional(),
		NEXT_PUBLIC_KOFI_URL: z.string().url().optional(),
		NEXT_PUBLIC_STRIPE_DONATE_URL: z.string().url().optional(),
		NEXT_PUBLIC_PAYPAL_DONATE_URL: z.string().url().optional(),
		NEXT_PUBLIC_GITHUB_SPONSORS_URL: z.string().url().optional(),
	},
	runtimeEnv: {
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		RESEND_EMAIL_TO: process.env.RESEND_EMAIL_TO,
		RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
		NEXT_PUBLIC_BUYMEACOFFEE_URL: process.env.NEXT_PUBLIC_BUYMEACOFFEE_URL,
		NEXT_PUBLIC_KOFI_URL: process.env.NEXT_PUBLIC_KOFI_URL,
		NEXT_PUBLIC_STRIPE_DONATE_URL: process.env.NEXT_PUBLIC_STRIPE_DONATE_URL,
		NEXT_PUBLIC_PAYPAL_DONATE_URL: process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL,
		NEXT_PUBLIC_GITHUB_SPONSORS_URL: process.env.NEXT_PUBLIC_GITHUB_SPONSORS_URL,
	},
	emptyStringAsUndefined: true,
})
