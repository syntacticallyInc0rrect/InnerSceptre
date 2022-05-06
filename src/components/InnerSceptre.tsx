import React, {FC, ReactElement, useEffect} from "react";
import {useCountdownTimer} from "../hooks/useCountdownTimer";
import {atom, useRecoilState} from "recoil";
import {useInnerSceptre} from "../hooks";

export const idleTimeRemainingInSeconds = atom({
    key: 'IdleTimeRemaining',
    default: 0,
});

type InnerSceptreWrapperProps = {
    children: ReactElement;
    maxIdleTimeInSeconds?: number;
    timeToExtendInSeconds?: number;
    serverRequestUri?: string;
    WarningComponent?: FC<WarningComponentProps>;
    ExpiredComponent?: FC<any>;
}

export const InnerSceptre: FC<InnerSceptreWrapperProps> = (
    {
        children,
        maxIdleTimeInSeconds = 0,
        timeToExtendInSeconds = 60,
        serverRequestUri = '/api';
        WarningComponent = DefaultWarningComponent,
        ExpiredComponent = DefaultExpiredComponent
    }
): ReactElement => {
    const [maxIdleTime, setMaxIdleTime] = useRecoilState(idleTimeRemainingInSeconds);
    const [secondsUntilSessionTimeout, restartSessionCountdownTimer] = useCountdownTimer();
    const innerSceptre = useInnerSceptre();

    useEffect(() => {
        setMaxIdleTime(maxIdleTimeInSeconds);
        innerSceptre.get(serverRequestUri).then(restartSessionCountdownTimer);
    }, []);

    return (
        <>
            {
                (maxIdleTime !== 0) &&
                (secondsUntilSessionTimeout <= timeToExtendInSeconds) &&
                (secondsUntilSessionTimeout >= 1) &&
                <WarningComponent secondsUntilSessionTimeout={secondsUntilSessionTimeout}
                                  serverRequest={() => innerSceptre.get(serverRequestUri)}
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
    serverRequest: () => Promise<any>;
}

const DefaultWarningComponent: FC<WarningComponentProps> = (
    {
        secondsUntilSessionTimeout,
        restartSessionCountdownTimer
    }
): ReactElement => (
    <>
        {secondsUntilSessionTimeout}
        <button onClick={serverRequest}>
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
