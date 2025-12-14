import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3000',
                'hdp6zjjk-3000.euw.devtunnels.ms',
                'obviously-vocal-seagull.cloudpub.ru'
            ]
        }
    },
    images: {
        // Укажите домены для remotePatterns
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'obviously-vocal-seagull.cloudpub.ru',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'hdp6zjjk-3000.euw.devtunnels.ms',
                port: '',
                pathname: '/**',
            },
            // Добавьте localhost для dev режима
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '3000',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;