/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "kitmakesthings.co.uk",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
