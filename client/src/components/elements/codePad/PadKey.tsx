import { FC } from 'react';
import tw from 'tailwind-styled-components';

export type PadKeyProps = {
    children: any;
    outputValue?: number;
    onClick: Function;
};

const Key = tw.div`
    w-fit h-fit
    border-2 border-stone-300
    rounded-2xl
`;


const PadKey: FC<PadKeyProps> = ({ children, onClick, outputValue }) => {
    const handleKeyPress = () => {
        onClick(outputValue);
    }
    
    return (
        <Key onClick={ handleKeyPress }>
            { children }
        </Key>
    )
}

export default PadKey;