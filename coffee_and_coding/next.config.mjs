/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "your-mongodb-domain.com",
            // Add other domains where your images are hosted
        ],
        // Or use remotePatterns for more control (Next.js 12.3+)
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // This allows all domains (less secure)
            },
        ],
    },
};

export default nextConfig;
