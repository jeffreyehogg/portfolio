import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Jeff Hogg | Systems Architecture & Production Projects'
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
					background: '#020617',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '64px 80px',
					fontFamily: 'system-ui, -apple-system, sans-serif',
					border: '8px solid #1e293b',
					position: 'relative',
				}}
			>
				{/* Ambient Glows */}
				<div
					style={{
						position: 'absolute',
						top: '-80px',
						right: '-80px',
						width: '500px',
						height: '500px',
						borderRadius: '50%',
						background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(2, 6, 23, 0) 70%)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: '-60px',
						left: '-60px',
						width: '400px',
						height: '400px',
						borderRadius: '50%',
						background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(2, 6, 23, 0) 70%)',
					}}
				/>

				{/* Top Status Header */}
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '12px',
							padding: '10px 20px',
							borderRadius: '9999px',
							background: '#0f172a',
							border: '1px solid #334155',
							color: '#818cf8',
							fontSize: '20px',
							fontFamily: 'monospace',
						}}
					>
						<div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginRight: '6px' }}>
							<div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
							<div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
							<div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
						</div>
						<span>jeffhogg.com</span>
						<span style={{ color: '#475569' }}>/</span>
						<span style={{ color: '#94a3b8' }}>portfolio</span>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
							padding: '10px 20px',
							borderRadius: '9999px',
							background: 'rgba(99, 102, 241, 0.15)',
							border: '1px solid rgba(99, 102, 241, 0.35)',
							color: '#c7d2fe',
							fontSize: '18px',
							fontWeight: 600,
						}}
					>
						<span>Production Systems & Architecture</span>
					</div>
				</div>

				{/* Center Content */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
					<h1
						style={{
							fontSize: '70px',
							fontWeight: 900,
							color: '#ffffff',
							margin: 0,
							letterSpacing: '-0.03em',
							lineHeight: 1.05,
						}}
					>
						Selected Engineering Work
					</h1>
					<p
						style={{
							fontSize: '30px',
							fontWeight: 600,
							color: '#a5b4fc',
							margin: 0,
							letterSpacing: '-0.01em',
						}}
					>
						Enterprise Middleware, Full-Stack SaaS & DevOps Pipelines
					</p>
					<p
						style={{
							fontSize: '22px',
							color: '#94a3b8',
							margin: '6px 0 0 0',
							lineHeight: 1.4,
							maxWidth: '960px',
						}}
					>
						Real-world software engineered for high scale, reliable data migration, and zero-downtime continuous deployment.
					</p>
				</div>

				{/* Bottom Highlight Pills */}
				<div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
					{[
						'Legacy Link (Data Migration)',
						'Kingdom Connect (Postgres)',
						'Webex Control Hub (Cisco)',
						'ForexFlow (Streaming Nuxt)',
						'Turborepo 4-App Monorepo',
					].map((proj) => (
						<div
							key={proj}
							style={{
								padding: '8px 18px',
								borderRadius: '10px',
								background: '#1e293b',
								border: '1px solid #334155',
								color: '#cbd5e1',
								fontSize: '18px',
								fontFamily: 'monospace',
							}}
						>
							{proj}
						</div>
					))}
				</div>
			</div>
		),
		{
			...size,
		}
	)
}
