import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/UI/Text';
import { Counter } from 'entities/Counter';
import classes from './CounterCard.module.scss';

interface CounterCardProps {
    className?: string;
    counter: Counter;
}

export const CounterCard = memo((props: CounterCardProps) => {
    const { className, counter } = props;

    return (
        <div className={classNames(classes.CounterCard, {}, [className])}>
            <Text title={counter.title} size="large" />
        </div>
    );
});
