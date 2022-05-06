import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {useSetRecoilState} from "recoil";
import {idleTimeRemainingInSeconds} from "../components/InnerSceptre";

type InnerSceptreProps = {
    onIntercept: () => void;
    onErrorIntercept: () => void;
    axiosConfig: AxiosRequestConfig;
    maxIdleTimeInSeconds: number;
};

type InnerSceptre = AxiosInstance;

const doNothing = (): void => {
    // Intentionally do nothing to appease ESLint
};

export const useInnerSceptre = (
    {
        onIntercept,
        onErrorIntercept,
        axiosConfig,
        maxIdleTimeInSeconds
    }: InnerSceptreProps = {
        onIntercept: doNothing,
        onErrorIntercept: doNothing,
        axiosConfig: {},
        maxIdleTimeInSeconds: 0
    }
): InnerSceptre => {
    const setIdleTimeRemainingInSeconds = useSetRecoilState(idleTimeRemainingInSeconds);
    const interceptor = (response: any): Promise<any> => {
        onIntercept();
        maxIdleTimeInSeconds > 0 && setIdleTimeRemainingInSeconds(maxIdleTimeInSeconds);
        return Promise.resolve(response)
    };

    const errorInterceptor = (error: any): Promise<any> => {
        onErrorIntercept();
        return Promise.reject(error.message);
    };

    const innerSceptre = axios.create(axiosConfig);

    innerSceptre.interceptors.response.use(interceptor, errorInterceptor);

    return innerSceptre;
};
