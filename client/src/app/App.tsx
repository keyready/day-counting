import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/AppRouter';
import { Navbar } from 'widgets/Navbar';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserData, UserActions } from 'entities/User';
import Cookie from 'js-cookie';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export const App = () => {
    const { theme } = useTheme();

    const userData = useSelector(getUserData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!userData) {
            const userDataFromCookie = Cookie.get('userdata');
            if (userDataFromCookie) {
                dispatch(UserActions.setUserData(JSON.parse(userDataFromCookie)));
            }
        }
    }, [dispatch, userData]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="page">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};
