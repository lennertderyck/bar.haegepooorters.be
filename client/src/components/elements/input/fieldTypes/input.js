import tw from 'tailwind-styled-components';

const Input = tw.input`
    ${ props => props.block && 'w-full' }
    ${ props => props.disabled && 'cursor-not-allowed' }
    bg-white
    bg-opacity-0
    border-0 
    focus:outline-none 
    active:outline-none
`;

export default Input;