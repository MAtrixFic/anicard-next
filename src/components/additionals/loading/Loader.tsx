import LoadingComponent from "./LoadingComponent";
import EmptyComponent from "./EmptyComponent";
import { ReactNode } from "react";

interface ILoaderProps<T> {
    data?: T[];
    isLoading?: boolean;
    error?: string | null;
    onLoad: (data: T[]) => ReactNode;
    loadingComponent?: ReactNode;
    emptyComponent?: ReactNode;
    errorComponent?: ReactNode;
}

const Loader = <T,>({
    data,
    isLoading = false,
    error = null,
    onLoad,
    loadingComponent = <LoadingComponent />,
    emptyComponent = <EmptyComponent />,
    errorComponent = <div>Error: {error}</div>
}: ILoaderProps<T>) => {
    if (isLoading) {
        return <>{loadingComponent}</>;
    }
    if (error) {
        return <>{errorComponent}</>;
    }
    if (!data) {
        return <>{emptyComponent}</>;
    }

    if (data.length === 0) {
        return <>{emptyComponent}</>;
    }
    return <>{onLoad(data)}</>;
};

export default Loader;