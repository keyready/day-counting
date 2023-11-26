import { Counter } from './Counter';

export interface CounterSchema {
    data?: Counter;
    isLoading: boolean;
    error?: string;
}
