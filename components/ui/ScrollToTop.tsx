'use client'

import { useState, useEffect } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/solid'

export default function ScrollToTop() {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const onScroll = () => setShow(window.scrollY > 500)
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	if (!show) return null

	return (
		<button
			type='button'
			onClick={() =>
				window.scrollTo({
					top: 0,
					behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
						? 'auto'
						: 'smooth',
				})
			}
			className='fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/90 text-stone-600 hover:text-stone-950 hover:border-stone-400 hover:bg-white transition-colors duration-200 shadow-md shadow-stone-950/5 cursor-pointer animate-fade-up active:scale-95'
			aria-label='Scroll to top'
		>
			<ArrowUpIcon className='w-4 h-4' />
		</button>
	)
}
