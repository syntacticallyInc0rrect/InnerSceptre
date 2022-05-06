import React, {FC, ReactElement, useEffect} from "react";
import {useCountdownTimer} from "../hooks/useCountdownTimer";
import {atom, useRecoilState} from "recoil";

export const idleTimeRemainingInSeconds = atom({
    key: 'IdleTimeRemaining',
    default: 0,
});

type InnerSceptreWrapperProps = {
    children: ReactElement;
    maxIdleTimeInSeconds?: number;
    timeToExtendInSeconds?: number;
    WarningComponent?: FC<WarningComponentProps>;
    ExpiredComponent?: FC<any>;
}

export const InnerSceptre: FC<InnerSceptreWrapperProps> = (
    {
        children,
        maxIdleTimeInSeconds = 0,
        timeToExtendInSeconds = 60,
        WarningComponent = DefaultWarningComponent,
        ExpiredComponent = DefaultExpiredComponent
    }
): ReactElement => {
    const [maxIdleTime, setMaxIdleTime] = useRecoilState(idleTimeRemainingInSeconds);
    const [secondsUntilSessionTimeout, restartSessionCountdownTimer] = useCountdownTimer();

    useEffect(() => {
        setMaxIdleTime(maxIdleTimeInSeconds);
    }, []);

    return (
        <>
            {
                (maxIdleTime !== 0) &&
                (secondsUntilSessionTimeout <= timeToExtendInSeconds) &&
                (secondsUntilSessionTimeout >= 1) &&
                <WarningComponent secondsUntilSessionTimeout={secondsUntilSessionTimeout}
                                  restartSessionCountdownTimer={restartSessionCountdownTimer}
                />
            }
            {
                (maxIdleTime !== 0) &&
                (secondsUntilSessionTimeout <= 0) &&
                <ExpiredComponent/>
            }
            {children}
        </>
    );

};

type WarningComponentProps = {
    secondsUntilSessionTimeout: number;
    restartSessionCountdownTimer: () => void;
}

const DefaultWarningComponent: FC<WarningComponentProps> = (
    {
        secondsUntilSessionTimeout,
        restartSessionCountdownTimer
    }
): ReactElement => (
    <>
        {secondsUntilSessionTimeout}
        <button onClick={restartSessionCountdownTimer}>
            I'M STILL HERE
        </button>
    </>
);

const DefaultExpiredComponent: FC<any> = (): ReactElement => (
    <>
        <h2>Your Session has Expired.</h2>
        <button onClick={() => window.location.reload()}>
            OK
        </button>
    </>
);
