import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
	ArrowTopRightOnSquareIcon,
	CodeBracketIcon,
	HeartIcon,
	ShieldCheckIcon,
	SparklesIcon,
	StarIcon,
} from '@heroicons/react/24/outline'
import { donationProviders, freeAppsData, githubUrl } from '../../lib/data'

export const metadata: Metadata = {
	title: 'Support Free Apps',
	description:
		'Support independent, 100% free iOS apps—Aura, Tend, and AlgoQuest—built with zero ads, zero subscriptions, and zero tracking.',
	alternates: { canonical: '/donate' },
	openGraph: {
		title: 'Support Free iOS Apps — Jeff Hogg',
		description:
			'Aura, Tend, and AlgoQuest are 100% free with no ads or subscriptions. Optional tips help cover Apple Developer fees and ongoing updates.',
		url: 'https://www.jeffhogg.com/donate',
	},
}

const tipTiers = [
	{
		amount: '$3',
		label: 'Coffee',
		note: 'Covers a morning espresso during bug-fix sprints.',
	},
	{
		amount: '$5',
		label: 'App Supporter',
		note: 'Helps keep hosting and domain renewals running smoothly.',
	},
	{
		amount: '$15',
		label: 'Feature Fuel',
		note: 'Supports annual Apple Developer Program fees and new releases.',
	},
] as const

const faqs = [
	{
		question: 'Do donations unlock extra features?',
		answer:
			'No. Aura, Tend, and AlgoQuest are 100% free with every feature unlocked for everyone—no paywalls, no subscriptions, and no ads.',
	},
	{
		question: 'What do tips go toward?',
		answer:
			'Contributions help cover the annual Apple Developer Program membership, web hosting and domain costs, and time spent maintaining and improving each app.',
	},
	{
		question: 'Are donations tax-deductible?',
		answer:
			'No. Contributions are voluntary personal tips to an independent software developer, not charitable donations.',
	},
] as const

export default function DonatePage() {
	const activeProviders = donationProviders.filter(
		(provider): provider is typeof provider & { url: string } => Boolean(provider.url)
	)
	const primaryUrl = activeProviders[0]?.url

	return (
		<div className='w-full min-h-screen bg-[#FAFAF8] pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-4xl mx-auto'>
				{/* Header */}
				<header className='mb-12 animate-fade-up'>
					<div className='font-mono text-[11px] uppercase tracking-[0.16em] text-teal-800 mb-2.5'>
						Indie iOS Apps • 100% Free
					</div>
					<h1 className='text-3xl font-semibold text-stone-950 sm:text-5xl tracking-[-0.03em] text-balance'>
						Support{' '}
						<span className='font-serif italic font-normal text-teal-800'>
							free, ad-free
						</span>{' '}
						apps.
					</h1>
					<p className='mt-4 text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed text-pretty'>
						Every app I publish on the App Store is completely free—with no accounts, no ads, and no tracking. If one of them has been helpful to you, a voluntary tip helps cover Apple Developer fees and keeps new updates coming.
					</p>
				</header>

				{/* Tip Jar / Payment Providers */}
				<section
					aria-labelledby='ways-to-donate-heading'
					className='rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-[0_1px_2px_rgba(17,17,16,0.04)] mb-10'
				>
					<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-stone-200/80'>
						<div>
							<h2
								id='ways-to-donate-heading'
								className='text-xl sm:text-2xl font-semibold text-stone-950 tracking-tight'
							>
								Send a Voluntary Tip
							</h2>
							<p className='text-sm text-stone-600 mt-1'>
								{activeProviders.length > 0
									? 'Choose whichever payment platform is easiest for you.'
									: 'Direct tip links are being configured—check back soon or leave a review below.'}
							</p>
						</div>
						<div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-medium shrink-0 self-start sm:self-center'>
							<HeartIcon className='w-3.5 h-3.5 text-teal-700' />
							<span>Optional &amp; Appreciated</span>
						</div>
					</div>

					{/* Suggested Amounts */}
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6'>
						{tipTiers.map((tier) => {
							const cardContent = (
								<>
									<div className='flex items-baseline justify-between gap-2'>
										<span className='text-2xl font-semibold text-stone-950 tracking-tight'>
											{tier.amount}
										</span>
										<span className='font-mono text-[11px] uppercase tracking-[0.12em] text-teal-800'>
											{tier.label}
										</span>
									</div>
									<p className='mt-2 text-xs text-stone-600 leading-relaxed'>
										{tier.note}
									</p>
								</>
							)

							if (primaryUrl) {
								return (
									<a
										key={tier.label}
										href={primaryUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='group rounded-xl bg-[#FAFAF8] border border-stone-200/90 hover:border-teal-700/50 hover:bg-white p-4 transition-all'
									>
										{cardContent}
									</a>
								)
							}

							return (
								<div
									key={tier.label}
									className='rounded-xl bg-[#FAFAF8] border border-stone-200/90 p-4'
								>
									{cardContent}
								</div>
							)
						})}
					</div>

					{/* Configured External Payment Links */}
					{activeProviders.length > 0 ? (
						<div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5'>
							{activeProviders.map((provider) => (
								<a
									key={provider.id}
									href={provider.url}
									target='_blank'
									rel='noopener noreferrer'
									className='group flex items-start justify-between gap-4 rounded-xl bg-white border border-stone-200/90 hover:border-stone-950 p-4 transition-colors'
								>
									<div>
										<div className='flex items-center gap-2'>
											<span className='text-sm font-semibold text-stone-950'>
												{provider.name}
											</span>
											<span className='px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-medium'>
												{provider.badge}
											</span>
										</div>
										<p className='mt-1 text-xs text-stone-600 leading-relaxed'>
											{provider.description}
										</p>
									</div>
									<ArrowTopRightOnSquareIcon className='w-4 h-4 text-stone-400 group-hover:text-stone-950 shrink-0 mt-0.5 transition-colors' />
								</a>
							))}
						</div>
					) : (
						<div className='mt-6 rounded-xl bg-[#FAFAF8] border border-dashed border-stone-300 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
							<div>
								<p className='text-sm font-medium text-stone-900'>
									Tip links coming soon
								</p>
								<p className='text-xs text-stone-600 mt-1 leading-relaxed'>
									External tip links (Buy Me a Coffee, Ko-fi, Stripe, PayPal, or GitHub Sponsors) have not been connected yet. In the meantime, feedback or an App Store review means just as much.
								</p>
							</div>
							<Link
								href='/contact'
								className='inline-flex items-center justify-center px-4 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs font-medium transition-colors shrink-0'
							>
								Send Feedback
							</Link>
						</div>
					)}
				</section>

				{/* Free Apps Supported */}
				<section aria-labelledby='apps-heading' className='mb-10'>
					<div className='mb-5'>
						<h2
							id='apps-heading'
							className='text-xl sm:text-2xl font-semibold text-stone-950 tracking-tight'
						>
							Free Apps Your Support Keeps Running
						</h2>
						<p className='text-sm text-stone-600 mt-1'>
							Built natively with SwiftUI, SwiftData, and privacy-first on-device storage.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
						{freeAppsData.map((app) => (
							<div
								key={app.name}
								className='flex flex-col justify-between rounded-2xl bg-white border border-stone-200/90 p-5 shadow-[0_1px_2px_rgba(17,17,16,0.04)]'
							>
								<div>
									<div className='flex items-center gap-3 mb-3.5'>
										{app.iconUrl ? (
											<Image
												src={app.iconUrl}
												alt={`${app.name} app icon`}
												width={44}
												height={44}
												className='rounded-xl border border-stone-200/80 shrink-0'
											/>
										) : (
											<div className='w-11 h-11 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-800 shrink-0'>
												<CodeBracketIcon className='w-5 h-5' />
											</div>
										)}
										<div>
											<h3 className='text-base font-semibold text-stone-950 leading-tight'>
												{app.name}
											</h3>
											<p className='text-xs text-stone-500 mt-0.5'>
												{app.tagline}
											</p>
										</div>
									</div>

									<span
										className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-medium mb-3 ${app.accentClass}`}
									>
										{app.badge}
									</span>

									<p className='text-sm text-stone-600 leading-relaxed'>
										{app.description}
									</p>
								</div>

								<div className='mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2 text-xs font-medium'>
									<Link
										href={app.href}
										className='text-teal-800 hover:text-teal-950 transition-colors'
									>
										Learn more →
									</Link>
									{app.appStoreUrl && (
										<a
											href={app.appStoreUrl}
											target='_blank'
											rel='noopener noreferrer'
											className='text-stone-600 hover:text-stone-950 transition-colors'
										>
											App Store ↗
										</a>
									)}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Other Free Ways to Support */}
				<section
					aria-labelledby='other-ways-heading'
					className='rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-[0_1px_2px_rgba(17,17,16,0.04)] mb-10'
				>
					<h2
						id='other-ways-heading'
						className='text-lg font-semibold text-stone-950 mb-4'
					>
						Free Ways to Help
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm'>
						<div className='flex items-start gap-3'>
							<StarIcon className='w-5 h-5 text-teal-800 shrink-0 mt-0.5' />
							<div>
								<div className='font-medium text-stone-950'>Leave a Review</div>
								<p className='text-xs text-stone-600 mt-1 leading-relaxed'>
									App Store ratings help other people discover ad-free indie apps.
								</p>
							</div>
						</div>
						<div className='flex items-start gap-3'>
							<SparklesIcon className='w-5 h-5 text-teal-800 shrink-0 mt-0.5' />
							<div>
								<div className='font-medium text-stone-950'>Share an App</div>
								<p className='text-xs text-stone-600 mt-1 leading-relaxed'>
									Recommend Aura, Tend, or AlgoQuest to a friend, parent, or classmate.
								</p>
							</div>
						</div>
						<div className='flex items-start gap-3'>
							<ShieldCheckIcon className='w-5 h-5 text-teal-800 shrink-0 mt-0.5' />
							<div>
								<div className='font-medium text-stone-950'>Report Bugs</div>
								<p className='text-xs text-stone-600 mt-1 leading-relaxed'>
									Send feedback via{' '}
									<Link href='/contact' className='text-teal-800 underline underline-offset-2'>
										Contact
									</Link>{' '}
									or{' '}
									<a
										href={githubUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='text-teal-800 underline underline-offset-2'
									>
										GitHub
									</a>
									.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section
					aria-labelledby='donate-faq-heading'
					className='rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-[0_1px_2px_rgba(17,17,16,0.04)]'
				>
					<h2
						id='donate-faq-heading'
						className='text-lg font-semibold text-stone-950 mb-4'
					>
						Frequently Asked Questions
					</h2>
					<div className='divide-y divide-stone-100'>
						{faqs.map((item) => (
							<div key={item.question} className='py-4 first:pt-1 last:pb-1'>
								<h3 className='text-sm font-semibold text-stone-950'>
									{item.question}
								</h3>
								<p className='mt-1 text-sm text-stone-600 leading-relaxed'>
									{item.answer}
								</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	)
}
