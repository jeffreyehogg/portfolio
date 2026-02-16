'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpIcon } from '@heroicons/react/24/solid'

export default function ScrollToTop() {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const onScroll = () => setShow(window.scrollY > 500)
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<AnimatePresence>
			{show && (
				<motion.button
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className='fixed bottom-8 right-8 z-50 p-3 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-700/80 transition-colors shadow-xl cursor-pointer'
					aria-label='Scroll to top'
				>
					<ArrowUpIcon className='w-5 h-5' />
				</motion.button>
			)}
		</AnimatePresence>
	)
}
