/** @type {import('next').NextConfig} */
module.exports = {
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'uew8wzjetllsk5wf.public.blob.vercel-storage.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				pathname: '/**',
			},
		],
	},
	// Enable React strict mode for better development experience
	reactStrictMode: true,
	// Compress output for smaller bundle sizes
	compress: true,
	async redirects() {
		return [
			{
				source: '/broadcasting',
				destination: '/portfolio',
				permanent: true,
			},
		]
	},
}