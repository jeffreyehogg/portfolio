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
	},
	runtimeEnv: {
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		RESEND_EMAIL_TO: process.env.RESEND_EMAIL_TO,
		RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
	},
	emptyStringAsUndefined: true,
})
