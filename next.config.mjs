/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '**',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    // images: {
    //     domains: ['192.168.1.3', 'editorbackend.autoclinic.site', '192.168.1.9']
    // },
};

export default nextConfig;
