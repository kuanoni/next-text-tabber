/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		additionalData: `@import "src/styles/main.scss";`,
	},
};

module.exports = nextConfig;
