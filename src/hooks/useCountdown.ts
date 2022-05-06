import {Dispatch, SetStateAction, useState} from 'react';
import {useRecoilValue} from "recoil";
import {idleTimeRemainingInSeconds} from "../components/InnerSceptre";

type UseCountdownFunctions = {
    setCount: Dispatch<SetStateAction<number>>;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
};

type UseCountdownType = [number, UseCountdownFunctions];

export const useCountdown = (): UseCountdownType => {
    const maxIdleTimeInSeconds = useRecoilValue(idleTimeRemainingInSeconds)
    const [count, setCount] = useState(maxIdleTimeInSeconds);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(maxIdleTimeInSeconds);

    return [
        count,
        {
            increment,
            decrement,
            reset,
            setCount,
        },
    ];
};
