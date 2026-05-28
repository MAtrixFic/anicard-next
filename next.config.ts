import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3000',
                '74h98gnp-3000.euw.devtunnels.ms',
                'communally-lovable-pointer.cloudpub.ru',
                'backend.mrcookiss.online',
                'matrixfic.online',
                'anime-heaven.ru',
                'backend.anime-heaven.ru'
            ]
        }
    },
    images: {
        // Укажите домены для remotePatterns
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'anime-heaven.rг',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'backend.anime-heaven.ru',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'matrixfic.online',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'backend.mrcookiss.online',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'communally-lovable-pointer.cloudpub.ru',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '74h98gnp-3000.euw.devtunnels.ms',
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