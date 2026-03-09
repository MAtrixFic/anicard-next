import { cookies } from 'next/headers';
import FetchMG from '@/components/server/fetches/config';

export function WithCookies() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                // Получаем куки
                const cookieStore = await cookies();
                const cookieString = cookieStore.toString();

                // Сохраняем оригинальные методы
                const originalPost = FetchMG.POST;
                const originalGet = FetchMG.GET;
                const originalDelete = FetchMG.DELETE;

                // Переопределяем POST
                FetchMG.POST = async (endpoint: string, params?: any, headers?: any) => {
                    return originalPost(endpoint, params, {
                        ...headers,
                        'Cookie': cookieString
                    });
                };

                // Переопределяем GET
                FetchMG.GET = async (endpoint: string, params?: any, headers?: any) => {
                    return originalGet(endpoint, params, {
                        ...headers,
                        'Cookie': cookieString
                    });
                };

                // Переопределяем DELETE
                FetchMG.DELETE = async (endpoint: string, params?: any, headers?: any) => {
                    return originalDelete(endpoint, params, {
                        ...headers,
                        'Cookie': cookieString
                    });
                };

                // Вызываем оригинальный метод
                const result = await originalMethod.apply(this, args);

                // Восстанавливаем оригинальные методы
                FetchMG.POST = originalPost;
                FetchMG.GET = originalGet;
                FetchMG.DELETE = originalDelete;

                return result;
            } catch (error) {
                console.error('Error in WithCookies:', error);
                return await originalMethod.apply(this, args);
            }
        };

        return descriptor;
    };
}