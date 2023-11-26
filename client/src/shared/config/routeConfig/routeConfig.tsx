import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { NotFound } from 'pages/NotFound';
import { CreateCounterPage } from 'pages/CreateCounterPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    loggedOutOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    CREATECOUNTER = 'createcounter',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CREATECOUNTER]: '/create_counter',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.CREATECOUNTER]: {
        path: RoutePath.createcounter,
        element: <CreateCounterPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
