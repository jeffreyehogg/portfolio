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
					background: '#FAFAF8',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '60px 72px',
					fontFamily: 'system-ui, -apple-system, sans-serif',
					position: 'relative',
				}}
			>
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

				{/* Top Header */}
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
						<div
							style={{
								width: '42px',
								height: '42px',
								borderRadius: '10px',
								background: '#111110',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#FAFAF8',
								fontSize: '18px',
								fontWeight: 700,
							}}
						>
							JH
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontFamily: 'monospace' }}>
							<span style={{ color: '#111110', fontWeight: 600 }}>jeffhogg.com</span>
							<span style={{ color: '#A8A29E' }}>/</span>
							<span style={{ color: '#0F766E' }}>portfolio</span>
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '8px 18px',
							borderRadius: '9999px',
							background: '#FFFFFF',
							border: '1px solid #E7E5E4',
							color: '#0F766E',
							fontSize: '16px',
							fontFamily: 'monospace',
						}}
					>
						<span>Production Systems &amp; Apps</span>
					</div>
				</div>

				{/* Center Content */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
					<span
						style={{
							fontSize: '14px',
							fontFamily: 'monospace',
							color: '#0F766E',
							letterSpacing: '0.14em',
						}}
					>
						01 / SELECTED WORK
					</span>
					<h1
						style={{
							fontSize: '68px',
							fontWeight: 700,
							color: '#111110',
							margin: 0,
							letterSpacing: '-0.035em',
							lineHeight: 1.05,
						}}
					>
						Systems &amp; Applications
					</h1>
					<p
						style={{
							fontSize: '26px',
							color: '#57534E',
							margin: '4px 0 0 0',
							lineHeight: 1.4,
							maxWidth: '940px',
						}}
					>
						Production web platforms, native Swift 6 iOS apps, API middleware services, and database utilities.
					</p>
				</div>

				{/* Bottom Highlight Pills */}
				<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
					{[
						'Aura (iOS App Store)',
						'AlgoQuest (Rust WASM)',
						'AutoDBA (MCP Server)',
						'Webex Control Hub (Cisco)',
					].map((proj) => (
						<div
							key={proj}
							style={{
								padding: '8px 16px',
								borderRadius: '10px',
								background: '#FFFFFF',
								border: '1px solid #E7E5E4',
								color: '#44403C',
								fontSize: '16px',
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
