import { FC, ReactElement, ReactNode } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type Props = {
    children?: ReactElement[] | ReactElement;
};

const AnimatedList: FC<Props> = ({ children }) => {
    const [ animationParent ] = useAutoAnimate<HTMLUListElement>()

    return (
        <ul ref={ animationParent }>
            { children }
        </ul>
    )
}

export default AnimatedList;