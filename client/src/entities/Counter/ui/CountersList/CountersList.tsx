import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/UI/Stack';
import { CounterCard } from '../CounterCard/CounterCard';
import classes from './CountersList.module.scss';
import { Counter } from '../../model/types/Counter';

interface CountersListProps {
    className?: string;
    counters: Counter[];
}

export const CountersList = memo((props: CountersListProps) => {
    const { className, counters } = props;

    return (
        <VStack gap="16" maxW className={classNames(classes.CountersList, {}, [className])}>
            {counters.map((counter) => (
                <CounterCard counter={counter} key={counter.id} />
            ))}
        </VStack>
    );
});
