import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Counter } from '../../model/types/Counter';
import classes from './CounterGrid.module.scss';
import { CounterCard } from '../CounterCard/CounterCard';

interface CounterGridProps {
    className?: string;
    counters: Counter[];
}

export const CounterGrid = memo((props: CounterGridProps) => {
    const { className, counters } = props;

    return (
        <div className={classNames(classes.CounterGrid, {}, [className])}>
            {counters.map((counter) => (
                <CounterCard counter={counter} key={counter.id} />
            ))}
        </div>
    );
});
