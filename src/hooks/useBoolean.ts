import {Dispatch, SetStateAction, useCallback, useState} from 'react';

type UseBooleanFunctions = {
    setValue: Dispatch<SetStateAction<boolean>>;
    setTrue: () => void;
    setFalse: () => void;
    toggleBoolean: () => void;
};

type UseBooleanType = [boolean, UseBooleanFunctions];

export const useBoolean = (defaultValue?: boolean): UseBooleanType => {
    const [value, setValue] = useState(!!defaultValue);

    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);
    const toggleBoolean = useCallback(() => setValue(!value), []);

    return [value, {setValue, setTrue, setFalse, toggleBoolean}];
};
