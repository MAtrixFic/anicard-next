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
            // добавьте другие домены по мере необходимости
        ],

        // Или используйте более гибкий подход с remotePatterns (рекомендуется):
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
                pathname: '/**', // если нужны все пути
            },
        ],
    },
};

export default nextConfig;
