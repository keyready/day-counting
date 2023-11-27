import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Input } from 'shared/UI/Input';
import { Text } from 'shared/UI/Text';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserError, userAuth } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import classes from './AuthPage.module.scss';

interface AuthPageProps {
    className?: string;
}

const AuthPage = memo((props: AuthPageProps) => {
    const { className } = props;

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const authError = useSelector(getUserError);

    const handleAuthClick = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const result = await dispatch(userAuth({ name, login, password }));

            if (result.meta.requestStatus === 'fulfilled') {
                navigate(RoutePath.main);
            }
        },
        [dispatch, login, name, navigate, password],
    );

    useEffect(() => {
        if (authError?.status === 2) setPassword('');
    }, [authError]);

    return (
        <Page className={classNames(classes.AuthPage, {}, [className])}>
            <VStack maxW justify="start" align="center">
                <HStack maxW justify="center" align="start" gap="32">
                    <Text title="Здесь ты можешь авторизоваться или зарегистрироваться" />
                    <VStack maxW justify="start">
                        <Text title="Все очень просто, но..." size="small" />
                        <Text
                            text={
                                'Пусть тебя не смущает, что здесь нет как таковой регистрации. ' +
                                'Если ты не проходил регистрацию, просто придумай логин или пароль. ' +
                                'Я сам пойму, что нужно создать аккаунт, и предложу придумать имя'
                            }
                        />
                    </VStack>
                </HStack>

                <form onSubmit={handleAuthClick} className={classes.form}>
                    <VStack maxW gap="8">
                        {authError?.status === 2 && (
                            <Text
                                className={classes.w100}
                                textClassname={classes.passwordError}
                                size="small"
                                text={authError.message}
                                align="center"
                            />
                        )}
                        {authError?.status !== 1 && (
                            <>
                                <Input
                                    required
                                    autoFocus
                                    value={login}
                                    onChange={setLogin}
                                    placeholder="Твой логин"
                                />
                                <Input
                                    required
                                    value={password}
                                    onChange={setPassword}
                                    placeholder="Пароль"
                                />
                                <Button type="submit" className={classes.btn}>
                                    Войти
                                </Button>
                            </>
                        )}
                        {authError?.status === 1 && (
                            <>
                                <Text title="Ты у нас впервые... Придумай имя!" size="small" />
                                <Input
                                    required
                                    autoFocus
                                    value={name}
                                    onChange={setName}
                                    placeholder="Тебя зовут..."
                                />
                                <Button type="submit" className={classes.btn}>
                                    Продолжить
                                </Button>
                            </>
                        )}
                    </VStack>
                </form>
            </VStack>
        </Page>
    );
});

export default AuthPage;
