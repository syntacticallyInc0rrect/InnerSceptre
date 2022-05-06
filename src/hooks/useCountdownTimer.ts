import {useBoolean} from './useBoolean';
import {useCountdown} from './useCountdown';
import {useInterval} from './useInterval';

type UseCountdownType = [number, () => void]

export const useCountdownTimer = (): UseCountdownType => {
    const [count, {decrement, reset}] = useCountdown();
    const oneSecondIntervalInMilliseconds = 1000;

    const [isRunning, {setTrue: start}] = useBoolean(false);

    const restart = () => {
        reset();
        start();
    };

    useInterval({callback: decrement, delay: isRunning ? oneSecondIntervalInMilliseconds : null});

    return [count, restart];
};
