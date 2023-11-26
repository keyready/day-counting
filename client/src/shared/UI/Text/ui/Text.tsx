import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { alignsMapper, headerTagMapper, sizeMapper, variantsMapper } from '../types/TextMappers';
import { TextAlign, TextSize, TextVariant } from '../types/Text.types';
import classes from './Text.module.scss';

interface TextProps {
    className?: string;
    headerClassname?: string;
    textClassname?: string;
    title?: string;
    text?: string;
    align?: TextAlign;
    size?: TextSize;
    variant?: TextVariant;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        headerClassname,
        textClassname,
        title,
        text,
        align = 'justify',
        size = 'medium',
        variant = 'primary',
    } = props;

    const variantsClasses = variantsMapper[variant];
    const alignsClasses = alignsMapper[align];
    const sizeClasses = sizeMapper[size];
    const HeaderTag = headerTagMapper[size];

    const add = [className, variantsClasses, alignsClasses, sizeClasses];

    return (
        <div className={classNames(classes.Text, {}, add)}>
            {title && (
                <HeaderTag className={classNames(classes.title, {}, [headerClassname])}>
                    {title}
                </HeaderTag>
            )}
            {text && <p className={classNames(classes.text, {}, [textClassname])}>{text}</p>}
        </div>
    );
});
