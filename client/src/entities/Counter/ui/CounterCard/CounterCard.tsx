import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { Text } from 'shared/UI/Text';
import { Counter } from 'entities/Counter';
import { HStack, VStack } from 'shared/UI/Stack';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { Modal } from 'shared/UI/Modal';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import classes from './CounterCard.module.scss';

interface CounterCardProps {
    className?: string;
    counter: Counter;
    type?: 'list' | 'grid';
}

export const CounterCard = memo((props: CounterCardProps) => {
    const { className, counter, type = 'grid' } = props;

    const [timeLeft, setTimeLeft] = useState<string>('');
    const [shareLogin, setShareLogin] = useState<string>('');
    const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

    const user = useSelector(getUserData);

    function daysUntil(target: Date) {
        const now: Date = new Date();
        const targetDate = new Date(target);

        let diffInMilliseconds = targetDate.getTime() - now.getTime();

        const yearsLeft = ~~(diffInMilliseconds / 31104000000);
        diffInMilliseconds -= yearsLeft * 31104000000;

        const monthsLeft = ~~(diffInMilliseconds / 2592000000);
        diffInMilliseconds -= monthsLeft * 2592000000;

        const daysLeft = ~~(diffInMilliseconds / 86400000);
        diffInMilliseconds -= daysLeft * 86400000;

        const hLeft = ~~(diffInMilliseconds / 3600000);
        diffInMilliseconds -= hLeft * 3600000;

        const mLeft = ~~(diffInMilliseconds / 60000);
        diffInMilliseconds -= mLeft * 60000;

        const sLeft = ~~(diffInMilliseconds / 1000);

        const time = [];

        if (yearsLeft)
            time.push(
                yearsLeft % 10 === 1 && yearsLeft % 100 !== 11
                    ? `${yearsLeft} год`
                    : yearsLeft % 10 >= 2 &&
                      yearsLeft % 10 <= 4 &&
                      (yearsLeft % 100 < 10 || yearsLeft % 100 >= 20)
                    ? `${yearsLeft} года`
                    : `${yearsLeft} лет`,
            );

        if (monthsLeft)
            time.push(
                monthsLeft % 10 === 1 && monthsLeft % 100 !== 11
                    ? `${monthsLeft} месяц`
                    : monthsLeft % 10 >= 2 &&
                      monthsLeft % 10 <= 4 &&
                      (monthsLeft % 100 < 10 || monthsLeft % 100 >= 20)
                    ? `${monthsLeft} месяца`
                    : `${monthsLeft} месяцев`,
            );

        if (daysLeft > 0)
            time.push(
                daysLeft % 10 === 1 && daysLeft % 100 !== 11
                    ? `${daysLeft} день`
                    : daysLeft % 10 >= 2 &&
                      daysLeft % 10 <= 4 &&
                      (daysLeft % 100 < 10 || daysLeft % 100 >= 20)
                    ? `${daysLeft} дня`
                    : `${yearsLeft} дней`,
            );

        if (hLeft > 0)
            time.push(
                hLeft % 10 === 1 && hLeft % 100 !== 11
                    ? `${hLeft} час`
                    : hLeft % 10 >= 2 && hLeft % 10 <= 4 && (hLeft % 100 < 10 || hLeft % 100 >= 20)
                    ? `${hLeft} часа`
                    : `${hLeft} часов`,
            );

        if (mLeft > 0)
            time.push(
                mLeft % 10 === 1 && mLeft % 100 !== 11
                    ? `${mLeft} минута`
                    : mLeft % 10 >= 2 && mLeft % 10 <= 4 && (mLeft % 100 < 10 || mLeft % 100 >= 20)
                    ? `${mLeft} минуты`
                    : `${mLeft} минут`,
            );

        if (sLeft > 0)
            time.push(
                sLeft % 10 === 1 && sLeft % 100 !== 11
                    ? `${sLeft} секунда`
                    : sLeft % 10 >= 2 && sLeft % 10 <= 4 && (sLeft % 100 < 10 || sLeft % 100 >= 20)
                    ? `${sLeft} секунды`
                    : `${sLeft} секунд`,
            );

        return time.slice(0, 3).join(' ').trim();
    }

    useEffect(() => {
        const updateTimeLeft = setInterval(() => {
            setTimeLeft(daysUntil(counter.date));
        }, 500);

        return () => clearTimeout(updateTimeLeft);
    }, [counter.date]);

    useEffect(() => {
        setTimeLeft(daysUntil(counter.date));
    }, [counter.date]);

    const handleShareClick = useCallback(() => {
        setIsShareOpen(true);
    }, []);

    const handleShareSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }, []);

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
            </Modal>
            <HStack align="start" maxW justify="between">
                <Text title={counter.title} size="large" />
                <VStack>
                    <Text size="small" title={new Date(counter.date).toLocaleDateString()} />
                    {user?.id !== counter.hostId && (
                        <Text text={counter.hostName} align="right" className={classes.w100} />
                    )}
                    {user?.id === counter.hostId && (
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
            <Text size="small" title={timeLeft} />
        </VStack>
    );
});
