/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ['192.168.1.4']
    },
};

export default nextConfig;
