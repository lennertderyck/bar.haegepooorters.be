import classNames from 'classnames';
import { FC, ReactElement } from 'react';

type Props = {
    children: ReactElement;
    active?: boolean;
};

const ExspansionPane: FC<Props> = ({ active, children }) => {
    const activeClasses = 'opacity-100 max-h-screen py-2';
    const hiddenClasses = 'opacity-0 max-h-[0vh] py-0';
    
    return (
        <div className={ classNames(
            'overflow-hidden',
            active ? activeClasses : hiddenClasses
        )}>
            { children }
        </div>
    )
}

export default ExspansionPane;