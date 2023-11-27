import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/UI/Stack';
import { useNavigate } from 'react-router-dom';
import { Text } from 'shared/UI/Text';
import { AppLink } from 'shared/UI/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Divider } from 'primereact/divider';
import { Counter } from '../../model/types/Counter';
import classes from './CountersList.module.scss';
import { CounterCard } from '../CounterCard/CounterCard';

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
            <VStack maxW>
                <Divider className={classes.divider} />
                <AppLink to={RoutePath.createcounter}>Создать еще один!</AppLink>
            </VStack>
        </VStack>
    );
});
