import { FC, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { CSSTransition } from 'react-transition-group';
import { useEffectOnce } from '../../../states/hooks/useEffectOnce/useEffectOnce';
import './Popover.scss';
import { Icon } from '../../basics';

export type PopoverProps = {
    children?: any;
    active: boolean;
    onClose?: Function
};

const Container = tw.div`
    fixed
    inset-0
    flex flex-col
    justify-end
    z-50
`;

const Backdrop = tw.div`
    absolute
    inset-0
    bg-black bg-opacity-50
`;

const Popover: FC<PopoverProps> = ({ children, active, onClose }) => {
    const [ contentVisible, setContentVisible ] = useState(active);
    
    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    }
    
    const exitWithEffect = () => {
        setContentVisible(false);
    }
    
    const handleContentExitWithDelay = () => {
        setTimeout(handleClose, 300);
    }
    
    useEffect(() => {
        setContentVisible(active)
    }, [active])
                
    return <>
        <CSSTransition
            in={ active }
            timeout={ 200 }
            classNames="backdrop"
            mountOnEnter
            unmountOnExit
            appear
        >
            <Container className="backdrop">
                <Backdrop
                    onClick={ exitWithEffect }
                />
                <CSSTransition 
                    in={ contentVisible }
                    timeout={ 200 }
                    classNames="popover"
                    mountOnEnter
                    appear
                    onExited={ handleContentExitWithDelay }
                >
                    <div className="popover relative bg-white h-fit w-full p-8 max-h-screen overflow-scroll">
                        <button 
                            className="absolute top-4 right-3 justify-end rounded-full p-1"
                            onClick={ exitWithEffect }
                        >
                            <Icon name="close" size="1.6rem" />
                        </button>
                        { children }
                    </div>
                </CSSTransition>
            </Container>
        </CSSTransition>
    </>
}

export default Popover;