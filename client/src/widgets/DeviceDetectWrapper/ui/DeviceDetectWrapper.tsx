import { memo, ReactNode, useEffect, useState } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { FlexProps } from 'shared/UI/Stack/Flex/Flex';

interface DeviceDetectWrapperProps extends FlexProps {
    children: ReactNode;
    step?: number;
}

export const DeviceDetectWrapper = memo((props: DeviceDetectWrapperProps) => {
    const { children, step = 1500, ...otherProps } = props;

    const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (innerWidth > step) {
        return <HStack {...otherProps}>{children}</HStack>;
    }

    return <VStack {...otherProps}>{children}</VStack>;
});
