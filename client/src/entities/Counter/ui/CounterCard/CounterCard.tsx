import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { Text } from 'shared/UI/Text';
import { HStack, VStack } from 'shared/UI/Stack';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { Modal } from 'shared/UI/Modal';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useWindowWidth } from 'shared/lib/hooks/useWindowWidth/useWindowWidth';
import { SymbolIcon } from '@radix-ui/react-icons';
import { getLeftTime, LeftTimeDisplayType } from '../../utils/getLeftTime';
import { Counter } from '../../model/types/Counter';
import classes from './CounterCard.module.scss';
import { shareCounter } from '../../model/services/shareCounter';
import { deleteCounter } from '../../model/services/deleteCounter';
import { getCounterError } from '../../model/selectors/CounterSelectors';

interface CounterCardProps {
    className?: string;
    counter: Counter;
    type?: 'list' | 'grid';
}

export const CounterCard = memo((props: CounterCardProps) => {
    const { className, counter, type = 'grid' } = props;

    const innerWidth = useWindowWidth();

    const [timeLeft, setTimeLeft] = useState<string>('');
    const [shareLogin, setShareLogin] = useState<string>('');
    const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [timeDisplayType, setTimeDisplayType] = useState<LeftTimeDisplayType>(
        innerWidth < 500 ? 'days' : 'calendar',
    );

    const user = useSelector(getUserData);
    const shareError = useSelector(getCounterError);
    const dispatch = useAppDispatch();

    const handleChangeTimeLeftType = useCallback(() => {
        switch (timeDisplayType) {
            case 'calendar': {
                setTimeDisplayType('days');
                break;
            }
            case 'days': {
                setTimeDisplayType('hours');
                break;
            }
            case 'hours': {
                setTimeDisplayType('calendar');
                break;
            }

            default:
                setTimeDisplayType('calendar');
        }
    }, [timeDisplayType]);

    useEffect(() => {
        const updateTimeLeft = setInterval(() => {
            setTimeLeft(getLeftTime(counter.date, timeDisplayType));
        }, 500);

        return () => clearTimeout(updateTimeLeft);
    }, [counter.date, timeDisplayType]);

    useEffect(() => {
        setTimeLeft(getLeftTime(counter.date, timeDisplayType));
    }, [counter.date, timeDisplayType]);

    useEffect(() => {
        setShareLogin('');
    }, [shareError]);

    const handleShareClick = useCallback(() => {
        setIsShareOpen(true);
    }, []);

    const handleShareSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const result = await dispatch(
                shareCounter({ counterId: counter.id, receiverLogin: shareLogin }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                setIsShareOpen(false);
            }
        },
        [counter.id, dispatch, shareLogin],
    );

    const handleDeleteClick = useCallback(() => {
        if (user?.id === counter.hostId) setIsDeleteModalOpen(true);
    }, [counter.hostId, user?.id]);

    const handleDeleteSubmit = useCallback(async () => {
        const result = await dispatch(deleteCounter(counter.id));

        if (result.meta.requestStatus === 'fulfilled') {
            setIsDeleteModalOpen(false);
        }
    }, [counter.id, dispatch]);

    return (
        <VStack className={classNames(classes.CounterCard, {}, [className])}>
            <Modal isOpen={isShareOpen} setIsOpen={setIsShareOpen}>
                <Text title="Введи логин друга, которому хочешь отправить счетчик" size="small" />
                <form onSubmit={handleShareSubmit}>
                    <VStack maxW>
                        <Input placeholder="Логин..." value={shareLogin} onChange={setShareLogin} />
                        <Button className={classes.btn} type="submit">
                            Поделиться!
                        </Button>
                    </VStack>
                </form>

                {shareError && (
                    <Text
                        headerClassname={classes.shareError}
                        // @ts-ignore
                        title={shareError.message}
                        size="small"
                    />
                )}
            </Modal>

            <Modal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen}>
                <VStack maxW gap="16">
                    <Text title="Вы действительно хотите удалить счетчик?" size="small" />
                    <HStack maxW justify="center" gap="32">
                        <Button onClick={handleDeleteSubmit} variant="danger">
                            Да!
                        </Button>
                        <Button onClick={() => setIsDeleteModalOpen(false)}>Нет...</Button>
                    </HStack>
                </VStack>
            </Modal>

            <HStack align="start" maxW justify="between">
                <Text
                    style={{ maxWidth: `${innerWidth / 2 - 15}px` }}
                    headerClassname={classNames(classes.headerOverflow, {
                        [classes.onDeleteHeaderHover]: user?.id === counter.hostId,
                    })}
                    onClick={handleDeleteClick}
                    title={counter.title}
                    size="large"
                />
                <VStack>
                    <Text size="small" title={new Date(counter.date).toLocaleDateString()} />
                    {user?.id !== counter.hostId && (
                        <Text text={counter.hostName} align="right" className={classes.w100} />
                    )}
                    {user?.id === counter.hostId && counter.isPrivate && (
                        <Text
                            onClick={handleShareClick}
                            text="Поделиться"
                            align="right"
                            textClassname={classes.shareText}
                            className={classes.w100}
                        />
                    )}
                </VStack>
            </HStack>

            <HStack maxW gap="16">
                <Button
                    onClick={handleChangeTimeLeftType}
                    variant="clear"
                    className={classes.iconButton}
                >
                    <SymbolIcon />
                </Button>
                <Text size="small" title={timeLeft} />
            </HStack>
        </VStack>
    );
});
