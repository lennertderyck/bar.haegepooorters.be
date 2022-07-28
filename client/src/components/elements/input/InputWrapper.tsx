import { FC, ReactElement } from 'react';
import { Icon } from '../../basics';
import Wrapper from './Wrapper';

type Props = {
    block?: boolean;
    children: any;
    disabled?: boolean;
    icon?: string;
}

const InputWrapper: FC<Props> = ({ children, block, disabled, icon }) => {
    return (
        <Wrapper
            {...{ block, disabled }}
        >
            { icon && <Icon name={ icon } color="#000" className="mr-4" />}
            { children }
        </Wrapper>
    )
}

export default InputWrapper;