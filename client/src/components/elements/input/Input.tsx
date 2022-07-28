import { FC, HTMLInputTypeAttribute, ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import tw from 'tailwind-styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    stretch?: boolean;
};

const InputShim = tw.input<Props>`
    rounded-full
    bg-stone-200
    placeholder:text-stone-600
    text-stone-800
    text-lg
    py-3 px-5
    outline-none
    ${( props: Props ) => props.stretch && 'w-full'}
`;

const Input: FC<Props> = (props) => {
    const { register } = useFormContext();
    
    const defaultValues = {
        stretch: true,
    }
    
    return (
        <InputShim { ...register(props.name)} { ...{ ...props, ...defaultValues } } />
    )
}

export default Input;