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
			className='fixed bottom-8 right-8 z-50 p-3 rounded-full bg-slate-800/85 backdrop-blur-md border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-700/80 transition-all duration-200 shadow-xl cursor-pointer animate-fade-up'
			aria-label='Scroll to top'
		>
			<ArrowUpIcon className='w-5 h-5' />
		</button>
	)
}
