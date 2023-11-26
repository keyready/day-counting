import { Page } from 'widgets/Page/Page';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { Text } from 'shared/UI/Text';
import { Divider } from 'primereact/divider';
import { HStack, VStack } from 'shared/UI/Stack';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/UI/AppLink';
import { ThickArrowRightIcon } from '@radix-ui/react-icons';
import { usePrivateCounters, usePublicCounters, CounterGrid, CountersList } from 'entities/Counter';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Skeleton } from 'primereact/skeleton';
import classes from './MainPage.module.scss';

const MainPage = () => {
    useEffect(() => {
        document.title = 'Обратный отсчет';
    }, []);

    const user = useSelector(getUserData);
    const {
        data: counters,
        isLoading: isCountersLoading,
        error: countersLoadingError,
    } = usePublicCounters();

    const { data: privateCounters, isLoading: isPrivateCountersLoading } = usePrivateCounters(
        user?.id || -1,
    );

    const generateSkeletons = useCallback((type: 'list' | 'grid' = 'grid') => {
        if (type === 'list') {
            return (
                <VStack maxW gap="16" className={classes.CounterList}>
                    {new Array(5).fill(0).map((_, index) => (
                        <Skeleton width="100%" height="50px" key={index} />
                    ))}
                </VStack>
            );
        }

        return (
            <div className={classes.CounterGrid}>
                {new Array(8).fill(0).map((_, index) => (
                    <Skeleton width="100%" height="200px" key={index} />
                ))}
            </div>
        );
    }, []);

    return (
        <Page>
            <HStack maxW>
                <VStack maxW>
                    <Text title={user?.name ? `Привет, ${user.name!}!` : 'Привет!'} size="large" />
                    <Divider className={classes.divider} />
                    <Text title="Это приложение я сделал специально для тебя!" />
                    <Text
                        text={
                            'Здесь ты сможешь отслеживать, сколько времени осталось ' +
                            'до какого-либо события.'
                        }
                    />
                    <Text
                        text={
                            'Ты можешь добавлять общие счетчики, как ниже, — их видят все. ' +
                            'А можешь только те, которые будут только для тебя. И при желании ' +
                            'сможешь поделиться ими со своим другом, который тоже использует ' +
                            'это приложение'
                        }
                    />
                    <Divider className={classes.divider} />
                    <Text
                        title={
                            'Ты уж извини, что дизайн такой скромный,' +
                            ' на большее фантазии не хватило...'
                        }
                        size="small"
                    />
                </VStack>

                <Divider className={classes.vert_divider} layout="vertical" />

                <VStack maxW className={classes.todo}>
                    {user?.id && isPrivateCountersLoading && generateSkeletons('list')}
                    {user?.id && privateCounters?.length && (
                        <CountersList counters={privateCounters} />
                    )}
                    {user?.id && !isPrivateCountersLoading && !privateCounters?.length && (
                        <>
                            <Text title="Тут будут твои персональные счетчики, когда ты" />
                            <VStack maxW>
                                <HStack maxW gap="16">
                                    <Text
                                        headerClassname={classNames('', {
                                            [classes.done]: !!user?.name,
                                        })}
                                        title="a) авторизуешься"
                                        size="small"
                                    />
                                    {!user?.name && (
                                        <AppLink className={classes.link} to="/">
                                            странно, почему ты этого еще не сделал...
                                            <ThickArrowRightIcon />
                                        </AppLink>
                                    )}
                                </HStack>
                                <HStack maxW>
                                    <Text title="б) создашь их!" size="small" />
                                    {user?.name && !privateCounters?.length && (
                                        <AppLink className={classes.link} to="/">
                                            полетели?)
                                            <ThickArrowRightIcon />
                                        </AppLink>
                                    )}
                                </HStack>
                            </VStack>
                        </>
                    )}
                </VStack>
            </HStack>

            <Divider className={classes.divider} />

            <VStack maxW>
                <Text size="large" title="А вот тут общие счетчики" />
                {counters?.length && <CounterGrid counters={counters} />}
                {!isCountersLoading && !counters?.length && !countersLoadingError && (
                    <>
                        <Text size="large" text="Только вот почему-то их никто не создал..." />
                        <AppLink to={RoutePath.createcounter}>Будешь первым?</AppLink>
                    </>
                )}
                {countersLoadingError && (
                    <Text
                        size="large"
                        // @ts-ignore
                        text={`Что-то пошло не так: ${countersLoadingError.status}`}
                    />
                )}
                {isCountersLoading && generateSkeletons()}
            </VStack>
        </Page>
    );
};

export default MainPage;
