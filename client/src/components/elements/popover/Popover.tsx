import { FC, useCallback, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { CSSTransition } from 'react-transition-group';
import './Popover.scss';
import { Icon } from '../../basics';
import classNames from 'classnames';
import Draggable from 'react-draggable';

export type PopoverProps = {
    children?: any;
    active: boolean;
    onClose?: Function;
    bare?: boolean;
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

const Popover: FC<PopoverProps> = ({ children, active, onClose, bare }) => {
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
    
    const dragSpeedTreshold = 29;
    const handleDrag = (event: any, data: any) => {
        const targetBounds = event.target.getBoundingClientRect();
        const dragspeedHasCrossedTreshold = data.deltaY > dragSpeedTreshold;
        const handleHasCrossedTreshold = targetBounds.bottom > window.innerHeight - (targetBounds.height * 4);
        
        if (dragspeedHasCrossedTreshold || handleHasCrossedTreshold) {
            exitWithEffect();
        }
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
                        <div className="popover">
                            <Draggable
                                allowAnyClick={ true }
                                axis="y"
                                handle=".popover__drag-handle"
                                bounds={{
                                    top: 0
                                }}
                                onDrag={ handleDrag }
                            >
                                <div>
                                    <div 
                                        className="popover__drag-handle bg-red h-16 flex items-center justify-center"
                                        onClick={ exitWithEffect }
                                    >
                                        <div className="h-2 w-12 bg-white dark:bg-stone-800 rounded-full mx-auto translate-y-2" />
                                    </div>
                                    <div className={ classNames(
                                        'popover__drag-cancel',
                                        'relative h-fit w-full max-h-screen overflow-scroll',
                                        !bare && 'bg-white dark:bg-stone-900 p-8'
                                    )}>
                                        <button 
                                            className="absolute top-4 right-3 justify-end rounded-full p-1"
                                            onClick={ exitWithEffect }
                                        >
                                            <Icon name="close" size="1.6rem" className="text--main" />
                                        </button>
                                        { children }
                                    </div>
                                </div>
                        </Draggable>
                    </div>
                </CSSTransition>
            </Container>
        </CSSTransition>
    </>
}

export default Popover;