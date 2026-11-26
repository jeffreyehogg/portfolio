import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Jeff Hogg | Software Engineer & Systems Architect'
export const size = {
	width: 1200,
	height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					background: '#FAFAF8',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '56px 64px',
					fontFamily: 'system-ui, -apple-system, sans-serif',
					position: 'relative',
					border: '1px solid #E7E5E4',
				}}
			>
				{/* Subtle top teal editorial accent bar */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: '5px',
						background: '#0F766E',
					}}
				/>

				{/* Left Column */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '560px',
						gap: '22px',
					}}
				>
					{/* Monogram + Domain Header */}
					<div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
						<div
							style={{
								width: '44px',
								height: '44px',
								borderRadius: '11px',
								background: '#111110',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#FAFAF8',
								fontSize: '20px',
								fontWeight: 700,
								letterSpacing: '-0.04em',
							}}
						>
							JH
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px' }}>
							<span style={{ color: '#111110', fontFamily: 'monospace', fontWeight: 600 }}>
								jeffhogg.com
							</span>
							<span style={{ color: '#D6D3D1' }}>/</span>
							<span style={{ color: '#0F766E', fontFamily: 'monospace', fontSize: '15px' }}>
								PORTFOLIO
							</span>
						</div>
					</div>

					{/* Display Title */}
					<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
						<h1
							style={{
								fontSize: '72px',
								fontWeight: 700,
								color: '#111110',
								margin: 0,
								letterSpacing: '-0.035em',
								lineHeight: 1.0,
							}}
						>
							Jeff Hogg
						</h1>
						<div
							style={{
								fontSize: '34px',
								fontWeight: 500,
								color: '#0F766E',
								letterSpacing: '-0.02em',
								lineHeight: 1.15,
							}}
						>
							Software Engineer
						</div>
						<p
							style={{
								fontSize: '20px',
								color: '#57534E',
								margin: '6px 0 0 0',
								lineHeight: 1.45,
							}}
						>
							Full-stack web apps (TypeScript, Angular, React, Next.js), native Swift iOS apps, APIs, and SQL.
						</p>
					</div>

					{/* Stack Tags */}
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
						{['TypeScript', 'Angular', 'React', 'Next.js', 'Swift 6', 'SQL'].map((tech) => (
							<div
								key={tech}
								style={{
									padding: '6px 14px',
									borderRadius: '8px',
									background: '#FFFFFF',
									border: '1px solid #E7E5E4',
									color: '#44403C',
									fontSize: '15px',
									fontFamily: 'monospace',
								}}
							>
								{tech}
							</div>
						))}
					</div>
				</div>

				{/* Right Column: Clean Editorial Cards */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '470px',
						gap: '14px',
					}}
				>
					{/* Current Role Card */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							background: '#FFFFFF',
							border: '1px solid #E7E5E4',
							borderRadius: '16px',
							padding: '22px 24px',
							gap: '8px',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
							<span
								style={{
									fontSize: '12px',
									fontFamily: 'monospace',
									color: '#0F766E',
									letterSpacing: '0.1em',
								}}
							>
								CURRENT ROLE
							</span>
							<div
								style={{
									width: '9px',
									height: '9px',
									borderRadius: '50%',
									background: '#059669',
								}}
							/>
						</div>
						<span style={{ fontSize: '22px', fontWeight: 700, color: '#111110' }}>
							Software Engineer @ TWFG Insurance
						</span>
						<span style={{ fontSize: '14px', color: '#78716C', fontFamily: 'monospace' }}>
							Previously: LGI Homes • Cisco
						</span>
					</div>

					{/* Featured Work Card */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							background: '#F3F2EE',
							border: '1px solid #E7E5E4',
							borderRadius: '16px',
							padding: '22px 24px',
							gap: '14px',
						}}
					>
						<span
							style={{
								fontSize: '12px',
								fontFamily: 'monospace',
								color: '#57534E',
								letterSpacing: '0.1em',
							}}
						>
							SELECTED SYSTEMS
						</span>

						{[
							{ title: 'Aura — Audiobooks & Podcasts', meta: 'iOS App Store • Swift 6 / SwiftUI' },
							{ title: 'AlgoQuest', meta: '138KB Rust WASM • 6 Languages' },
							{ title: 'AutoDBA', meta: 'Zero-DB SQL Optimizer & MCP Server' },
						].map((item) => (
							<div
								key={item.title}
								style={{
									display: 'flex',
									flexDirection: 'column',
									background: '#FFFFFF',
									border: '1px solid #E7E5E4',
									borderRadius: '10px',
									padding: '12px 16px',
									gap: '3px',
								}}
							>
								<span style={{ fontSize: '16px', fontWeight: 600, color: '#111110' }}>
									{item.title}
								</span>
								<span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#0F766E' }}>
									{item.meta}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		),
		{
			...size,
		}
	)
}
