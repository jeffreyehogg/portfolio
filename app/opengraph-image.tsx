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
					background: 'linear-gradient(135deg, #020617 0%, #090f26 55%, #030712 100%)',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '52px 60px',
					fontFamily: 'system-ui, -apple-system, sans-serif',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Ambient Glows */}
				<div
					style={{
						position: 'absolute',
						top: '-100px',
						left: '-60px',
						width: '620px',
						height: '620px',
						borderRadius: '50%',
						background: 'radial-gradient(circle, rgba(79, 70, 229, 0.24) 0%, rgba(2, 6, 23, 0) 70%)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: '-100px',
						right: '-60px',
						width: '620px',
						height: '620px',
						borderRadius: '50%',
						background: 'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(2, 6, 23, 0) 70%)',
					}}
				/>

				{/* Left Column */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '545px',
						gap: '22px',
					}}
				>
					{/* Identity Pill */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							alignSelf: 'flex-start',
							gap: '10px',
							padding: '8px 18px',
							borderRadius: '9999px',
							background: '#0f172a',
							border: '1px solid rgba(129, 140, 248, 0.4)',
							fontSize: '16px',
							fontWeight: 600,
						}}
					>
						<div
							style={{
								width: '9px',
								height: '9px',
								borderRadius: '50%',
								background: '#10b981',
							}}
						/>
						<span style={{ color: '#f1f5f9', fontFamily: 'monospace' }}>jeffhogg.com</span>
						<span style={{ color: '#475569' }}>•</span>
						<span style={{ color: '#34d399' }}>Portfolio</span>
					</div>

					{/* Headline */}
					<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
						<h1
							style={{
								fontSize: '72px',
								fontWeight: 900,
								color: '#ffffff',
								margin: 0,
								letterSpacing: '-0.035em',
								lineHeight: 1.0,
							}}
						>
							Jeff Hogg
						</h1>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								fontSize: '34px',
								fontWeight: 800,
								color: '#818cf8',
								letterSpacing: '-0.02em',
								lineHeight: 1.18,
							}}
						>
							<span>Software Engineer &</span>
							<span style={{ color: '#38bdf8' }}>Systems Architect</span>
						</div>
						<p
							style={{
								fontSize: '20px',
								color: '#cbd5e1',
								margin: '6px 0 0 0',
								lineHeight: 1.45,
							}}
						>
							Full-stack web & native iOS apps, API middleware, automated CI/CD pipelines, and enterprise database systems.
						</p>
					</div>

					{/* Bottom 3 Pills */}
					<div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
						{['TypeScript & Swift', 'Docker & CI/CD', 'SQL & APIs'].map((tag) => (
							<div
								key={tag}
								style={{
									display: 'flex',
									alignItems: 'center',
									padding: '9px 15px',
									borderRadius: '9999px',
									background: '#0f172a',
									border: '1px solid rgba(129, 140, 248, 0.3)',
									color: '#f1f5f9',
									fontSize: '15px',
									fontWeight: 600,
								}}
							>
								{tag}
							</div>
						))}
					</div>
				</div>

				{/* Right Column: Browser Card Showcase */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '490px',
						borderRadius: '18px',
						background: '#090f26',
						border: '1px solid rgba(148, 163, 184, 0.3)',
						overflow: 'hidden',
						boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7)',
					}}
				>
					{/* Browser Bar */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '12px 16px',
							background: '#0f172a',
							borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
						}}
					>
						<div style={{ display: 'flex', gap: '6px' }}>
							<div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
							<div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
							<div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								fontSize: '12px',
								color: '#94a3b8',
							}}
						>
							<span
								style={{
									background: '#4f46e5',
									color: '#ffffff',
									padding: '3px 10px',
									borderRadius: '9999px',
									fontWeight: 600,
								}}
							>
								Home
							</span>
							<span>Projects</span>
							<span>About</span>
							<span>Contact</span>
						</div>
						<div
							style={{
								fontSize: '11px',
								color: '#94a3b8',
								fontFamily: 'monospace',
								padding: '2px 7px',
								borderRadius: '5px',
								background: '#1e293b',
							}}
						>
							Cmd+K
						</div>
					</div>

					{/* Browser Body */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							padding: '24px 22px',
							background: '#020617',
						}}
					>
						<div style={{ fontSize: '25px', fontWeight: 800, color: '#ffffff' }}>Software Engineer</div>
						<div style={{ fontSize: '22px', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
							DevOps & System Architecture
						</div>
						<div
							style={{
								fontSize: '12px',
								color: '#94a3b8',
								textAlign: 'center',
								marginTop: '8px',
								marginBottom: '16px',
								lineHeight: 1.4,
							}}
						>
							Engineering scalable web and native iOS applications, dedicated API middleware, and automated CI/CD pipelines.
						</div>

						{/* 2x2 Metric Grid */}
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								gap: '10px',
								width: '100%',
							}}
						>
							{[
								{ code: '5+', val: '5+ Years', lbl: 'Software Engineering' },
								{ code: '</>', val: 'TypeScript & Swift', lbl: 'Web & Native iOS' },
								{ code: 'CI', val: 'Docker & CI/CD', lbl: 'Automated Pipelines' },
								{ code: 'DB', val: 'MS SQL & MySQL', lbl: 'Database Systems' },
							].map((item) => (
								<div
									key={item.val}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '10px',
										width: '212px',
										padding: '10px 12px',
										borderRadius: '10px',
										background: '#0f172a',
										border: '1px solid rgba(255, 255, 255, 0.08)',
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											width: '30px',
											height: '30px',
											borderRadius: '8px',
											background: 'rgba(99, 102, 241, 0.18)',
											color: '#818cf8',
											fontSize: '12px',
											fontWeight: 700,
											fontFamily: 'monospace',
										}}
									>
										{item.code}
									</div>
									<div style={{ display: 'flex', flexDirection: 'column' }}>
										<span style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>{item.val}</span>
										<span style={{ fontSize: '10px', color: '#94a3b8' }}>{item.lbl}</span>
									</div>
								</div>
							))}
						</div>

						{/* Current Role Strip */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
								marginTop: '4px',
								padding: '10px 14px',
								borderRadius: '10px',
								background: 'rgba(16, 185, 129, 0.08)',
								border: '1px solid rgba(16, 185, 129, 0.25)',
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<div
									style={{
										width: '8px',
										height: '8px',
										borderRadius: '9999px',
										background: '#10b981',
									}}
								/>
								<span style={{ fontSize: '12px', fontWeight: 600, color: '#ecfdf5' }}>
									Software Engineer @ TWFG Insurance
								</span>
							</div>
							<span style={{ fontSize: '11px', color: '#94a3b8' }}>LGI Homes • Cisco</span>
						</div>
					</div>
				</div>
			</div>
		),
		{
			...size,
		}
	)
}
