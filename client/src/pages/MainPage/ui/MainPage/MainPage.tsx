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
import { DeviceDetectWrapper } from 'widgets/DeviceDetectWrapper';
import { useWindowWidth } from 'shared/lib/hooks/useWindowWidth/useWindowWidth';
import classes from './MainPage.module.scss';

const MainPage = () => {
    useEffect(() => {
        document.title = 'Обратный отсчет';
    }, []);

    const innerWidth = useWindowWidth();

    const user = useSelector(getUserData);
    const {
        currentData: counters,
        isFetching: isCountersLoading,
        error: countersLoadingError,
        refetch: refetchPublicCounters,
    } = usePublicCounters(user?.id || -1);

    const {
        currentData: privateCounters,
        isFetching: isPrivateCountersLoading,
        refetch: refetchPrivateCounters,
    } = usePrivateCounters(user?.id || -1);

    useEffect(() => {
        refetchPrivateCounters();
        refetchPublicCounters();
    }, [refetchPrivateCounters, refetchPublicCounters]);

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
            <DeviceDetectWrapper maxW step={1200} gap="32">
                <VStack maxW>
                    <HStack maxW justify="between">
                        <Text
                            title={user?.name ? `Привет, ${user.name!}!` : 'Привет!'}
                            size="large"
                        />
                        {!user?.name && innerWidth < 1200 && (
                            <AppLink to={RoutePath.auth}>Кто я?..</AppLink>
                        )}
                    </HStack>
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
                    {innerWidth < 1200 && <Divider className={classes.divider} />}
                </VStack>

                {/* <Divider className={classes.vert_divider} layout="vertical" /> */}

                <VStack maxW className={classes.todo}>
                    {user?.id && isPrivateCountersLoading && generateSkeletons('list')}
                    {user?.id && privateCounters?.length && (
                        <CountersList counters={privateCounters} />
                    )}
                    {!isPrivateCountersLoading && !privateCounters?.length && (
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
                                    {!user?.name && innerWidth > 700 && (
                                        <AppLink className={classes.link} to={RoutePath.auth}>
                                            странно, почему ты этого еще не сделал...
                                            <ThickArrowRightIcon />
                                        </AppLink>
                                    )}
                                </HStack>
                                <HStack maxW>
                                    <Text title="б) создашь их!" size="small" />
                                    {user?.name && !privateCounters?.length && (
                                        <AppLink
                                            className={classes.link}
                                            to={RoutePath.createcounter}
                                        >
                                            полетели?)
                                            <ThickArrowRightIcon />
                                        </AppLink>
                                    )}
                                </HStack>
                            </VStack>
                        </>
                    )}
                </VStack>
            </DeviceDetectWrapper>

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
                {!counters?.length && (
                    <Text size="large" text="Никто ничего не ждет... Будешь первым?" />
                )}
                {isCountersLoading && generateSkeletons()}
            </VStack>
        </Page>
    );
};

export default MainPage;
