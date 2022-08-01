import { FC } from 'react';
import tw from 'tailwind-styled-components';

type ValueIndicatorProps = {
    active: boolean;
    error?: boolean;
}

const ValueIndicator = tw.div<ValueIndicatorProps>`
    w-2.5 h-2.5
    rounded-full
    ${(props: ValueIndicatorProps) => props.error ? 'bg-red-500' : props.active ? 'bg-stone-400 dark:bg-stone-600' : 'bg-stone-200' }
`;

type ValueIndicatorsProps = {
    maxLength: number;
    length: number;
    error?: boolean;
};

const ValueIndicators: FC<ValueIndicatorsProps> = ({ maxLength, length, error}) => {
    return (
        <div className="flex gap-4 justify-center">
            { Array.from({ length: maxLength }).map((_, index) => {
                const isActive = !error && (index + 1 <= length);
                return <ValueIndicator key={ index } active={ isActive } error={ !!error } />
            })}
        </div>
    )
}

export default ValueIndicators;