import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import classes from './CreateCounterPage.module.scss';

interface CreateCounterPageProps {
    className?: string;
}

const CreateCounterPage = memo((props: CreateCounterPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Создание счетчика';
    }, []);

    return (
        <Page className={classNames(classes.CreateCounterPage, {}, [className])}>
            <h1>CreateCounterPage</h1>
        </Page>
    );
});

export default CreateCounterPage;
