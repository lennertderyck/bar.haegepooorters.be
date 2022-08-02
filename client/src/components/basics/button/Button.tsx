import classNames from 'classnames';
import { FC } from 'react';
import tw from "tailwind-styled-components";
import useHaptic from '../../../states/hooks/useHaptic/useHaptic';
import Icon from '../icon/Icon';

const themes = {
    main: 'py-3 px-4 bg-black dark:bg-stone-200 text-white dark:text-black',
    secondary: 'py-3 px-4 border-2 bg-white border-stone-300 dark:bg-stone-900 text-black dark:text-white',
    simple: 'bg-transparent border-none text-black dark:text-stone-300',
}

const states = {
    all: 'flex items-center font-medium',
    loading: 'cursor-not-allowed opacity-60',
    disabled: 'opacity-50',
    small: 'text-sm'
}

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: any;
    loading?: boolean;
    promise?: Promise<any>;
    secondary?: boolean;
    simple?: boolean;
    small?: boolean;
    icon?: string;
    iconPlacement?: 'prepend' | 'append';
    fitWidth?: boolean;
    theme?: keyof typeof themes;
};

const ButtonShim = tw.button`
    rounded-full
    uppercase
    tracking-widest
    ${() => states.all}
    ${(props: Props) => classNames(themes[props.theme || 'main'])}
    
    
    ${(props: Props) => props.icon ? 'justify-between' : 'justify-center' }
    ${(props: Props) => props.disabled ? 'opacity-50' : 'opacity-100' }
    ${(props: Props) => props.loading ? '' : 'cursor-pointer'}
    ${(props: Props) => props.fitWidth ? '' : 'w-full'}
`;

// ${(props: Props) => props.icon ? 'flex items-center' : ''}
// ${(props: Props) => props.fitWidth ? 'justify-start px-4' : 'justify-between w-full'}

const Button: FC<Props> = ({ children, disabled, onClick, iconPlacement = 'append', ...otherProps }) => {
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
            {( otherProps.icon && iconPlacement === 'prepend' ) && <Icon className="mr-2" name={ otherProps.icon } />}
            { otherProps.loading ? '...' : children }
            {( otherProps.icon && iconPlacement === 'append') && <Icon className="ml-2" name={ otherProps.icon } />}
        </ButtonShim>
    )
}

export default Button;