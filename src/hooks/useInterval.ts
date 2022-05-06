import {useEffect, useRef} from 'react';

type UseIntervalProps = {
    callback: () => void;
    delay: number | null;
};

export const useInterval = ({callback, delay}: UseIntervalProps): void => {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!delay && delay !== 0) {
            return;
        }

        const id = setInterval(() => savedCallback.current(), delay);

        return () => clearInterval(id);
    }, [delay]);
};
