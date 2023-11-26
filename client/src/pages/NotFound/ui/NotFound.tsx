import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { useEffect } from 'react';
import { HStack } from 'shared/UI/Stack';
import classes from './NotFound.module.scss';

interface NotFoundProps {
    className?: string;
}

export const NotFound = ({ className }: NotFoundProps) => {
    useEffect(() => {
        document.title = '404 | Не найдено';
    }, []);

    return (
        <Page className={classNames(classes.NotFound, {}, [className])}>
            <HStack maxW>
                <h1>Страница не найдена</h1>
            </HStack>
        </Page>
    );
};
