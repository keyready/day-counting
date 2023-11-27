import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useCallback, useEffect } from 'react';
import { Divider } from 'primereact/divider';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Counter, createCounter } from 'entities/Counter';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { CreateCounterForm } from '../CreateCounterForm/CreateCounterForm';
import classes from './CreateCounterPage.module.scss';

interface CreateCounterPageProps {
    className?: string;
}

const CreateCounterPage = memo((props: CreateCounterPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Создание счетчика';
    }, []);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleCreateSubmit = useCallback(
        async (data: Partial<Counter>) => {
            const result = await dispatch(createCounter(data));

            if (result.meta.requestStatus === 'fulfilled') {
                navigate(RoutePath.main);
            }
        },
        [dispatch, navigate],
    );

    return (
        <Page className={classNames(classes.CreateCounterPage, {}, [className])}>
            <h1>Отлично!</h1>
            <h3>У тебя появилась новая дата. Давай сохраним ее)</h3>

            <Divider className={classes.divider} />

            <CreateCounterForm onCreate={handleCreateSubmit} />
        </Page>
    );
});

export default CreateCounterPage;
