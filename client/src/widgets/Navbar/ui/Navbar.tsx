import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UserActions } from 'entities/User';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const dispatch = useAppDispatch();

    const handleLogout = useCallback(() => {
        dispatch(UserActions.logout());
    }, [dispatch]);

    return (
        <HStack maxW justify="end" className={classNames(classes.Navbar, {}, [className])}>
            <Button variant="danger" onClick={handleLogout}>
                Выйти
            </Button>
        </HStack>
    );
});
