'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
	const barRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let rafId = 0
		const updateProgress = () => {
			rafId = 0
			if (!barRef.current) return
			const docHeight = document.documentElement.scrollHeight - window.innerHeight
			const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0
			barRef.current.style.transform = `scaleX(${progress})`
		}

		const onScroll = () => {
			if (!rafId) {
				rafId = window.requestAnimationFrame(updateProgress)
			}
		}

		updateProgress()
		window.addEventListener('scroll', onScroll, { passive: true })
		window.addEventListener('resize', onScroll, { passive: true })
		return () => {
			if (rafId) window.cancelAnimationFrame(rafId)
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', onScroll)
		}
	}, [])

	return (
		<div
			ref={barRef}
			aria-hidden='true'
			className='fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 origin-left z-[60] pointer-events-none motion-reduce:hidden will-change-transform'
			style={{ transform: 'scaleX(0)' }}
		/>
	)
}
