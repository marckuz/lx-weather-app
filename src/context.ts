import { createContext } from 'react';
import { contextModel } from './types';

export const AppContext = createContext<contextModel>({
    location: "",
    data: undefined,
    selectedHour: 0,
    setSelectedHour: () => { },
    setLocation: () => { }
});