import classNames from 'classnames';
import { FC } from 'react';
import tw from "tailwind-styled-components";
import useHaptic from '../../../states/hooks/useHaptic/useHaptic';
import Icon from '../icon/Icon';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: any;
    loading?: boolean;
    promise?: Promise<any>;
    secondary?: boolean;
    simple?: boolean;
    icon?: string;
};

const ButtonShim = tw.button`w-full
    rounded-full
    uppercase
    tracking-widest
    ${(props: Props) => props.disabled ? 'opacity-50' : 'opacity-100' }
    ${(props: Props) => props.secondary ? 'bg-white font-medium' : 'bg-black text-white'}
    ${(props: Props) => !props.simple ? 'py-3 border' : 'py-0'}
    ${(props: Props) => !props.simple ? props.secondary ? 'border-stone-300' : 'border-black' : ''}
    ${(props: Props) => props.loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
    ${(props: Props) => props.icon ? 'flex items-center justify-between px-4' : ''}
`;

const Button: FC<Props> = ({ children, disabled, onClick, ...otherProps }) => {
    const [ vibrate ] = useHaptic('forbidden');
    
    const catchClickEvent = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {        
        if (onClick) {
            if (disabled) {
                vibrate();
            } else {
                onClick(event);
            }
        }
    }
    
    return (
        <ButtonShim
            onClick={ catchClickEvent } 
            className={ classNames(
                disabled ? 'opacity-50' : 'opacity-100'
            )}
            aria-disabled={ disabled }
            { ...otherProps }
        >
            { otherProps.loading ? '...' : children }
            { otherProps.icon && <Icon name={ otherProps.icon } />}
        </ButtonShim>
    )
}

export default Button;