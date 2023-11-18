import { PropsWithChildren, useEffect, useState } from "react";

const PASSWORD = "UOOOHHHCUNNYFUYOBELLYANDCHESTEROTIC1111SOB222SOB333SOB";

/**
 * Spoiler component that prevents rendering of children until a password has
 * been correctly entered. Only active in production builds.
 */
export function Spoiler({ children }: PropsWithChildren) {
    const [show, setShow] = useState(
        !import.meta.env.PROD || !!localStorage.spoilerDisabled
    );

    useEffect(() => {
        if (show) return;

        let response: string | null;

        do response = prompt("Password:");
        while (response !== PASSWORD);

        localStorage.spoilerDisabled = true;

        setShow(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return show ? children : <></>;
}
