import classNames from 'classnames';
import { FC } from 'react';
import { Icon } from '../../basics';

type Props = {
    onClick?: () => void;
};

const ProductRemoveButton: FC<Props> = ({ onClick }) => {
    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick();
        }
    }
    
    return (
        <button
            onClick={ handleClick }
            className="p-0.5 border border-black rounded-full"
        >
            <Icon name="subtract"/>
        </button>
    )
}
export default ProductRemoveButton;