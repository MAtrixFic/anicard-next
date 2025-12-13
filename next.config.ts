import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3000',
                'hdp6zjjk-3000.euw.devtunnels.ms',
                '*'
            ]
        }
    },
    images: {
        domains: [
            'obviously-vocal-seagull.cloudpub.ru',
            'https://hdp6zjjk-3000.euw.devtunnels.ms/'
        ],

        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'obviously-vocal-seagull.cloudpub.ru',
                port: '',
                pathname: '/static/images/**',
            },
            {
                protocol: 'https',
                hostname: 'obviously-vocal-seagull.cloudpub.ru',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'hdp6zjjk-3000.euw.devtunnels.ms/',
                port: '',
                pathname: '/**'
            },
        ],
    },
};

export default nextConfig;
