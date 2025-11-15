import { useState, useEffect } from "react"

const usePortal = () => {
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setPortalContainer(document.body);
    }, []);

    return portalContainer;
}

export default usePortal