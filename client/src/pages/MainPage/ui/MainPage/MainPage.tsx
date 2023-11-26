import { Page } from 'widgets/Page/Page';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { Text } from 'shared/UI/Text';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { HStack, VStack } from 'shared/UI/Stack';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './MainPage.module.scss';

const MainPage = () => {
    useEffect(() => {
        document.title = 'Обратный отсчет';
    }, []);

    const user = useSelector(getUserData);

    return (
        <Page>
            <HStack maxW>
                <VStack maxW>
                    <Text
                        className={classes.title}
                        title={user?.name ? `Привет, ${user.name!}!` : 'Привет!'}
                        size="large"
                    />
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
                    <Divider className={classes.divider} />
                </VStack>
                <Divider className={classes.vert_divider} layout="vertical" />
                <VStack maxW className={classes.todo}>
                    <Text title="Тут будут твои персональные счетчики, когда ты" />
                    <Text
                        className={classNames('', {
                            [classes.done]: !!user?.name,
                        })}
                        title="a) авторизуешься;"
                        size="small"
                    />
                    <Text title="б) создашь их!" size="small" />
                </VStack>
            </HStack>
        </Page>
    );
};

export default MainPage;
