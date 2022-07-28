import tw from 'tailwind-styled-components';

const Wrapper = tw.div<any>`
    ${ (props: any) => props.block ? 'w-full' : 'w-fit' }
    ${ (props: any) => props.disabled && 'opacity-50 cursor-not-allowed' }
    ${ (props: any) => props.outline && 'border-2' }
    ${ (props: any) => !props.outline && 'bg-gray-100' }
    flex items-center
    py-3 px-4
    rounded-2xl
`;

export default Wrapper