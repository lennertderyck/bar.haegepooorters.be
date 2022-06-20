import { ComponentPropsWithoutRef, FC, forwardRef, useCallback, useEffect, useState } from 'react';
import PadKey from './PadKey';
import ValueIndicators from './ValuesIndicator';
import classNames from 'classnames'
import styles from './CodePad.module.scss';
import { Pin } from '../../../types/verification';
import { Icon } from '../../basics';

interface Props {
    className?: string;
    length?: number;
    loading: boolean;
    error?: any;
    onChange?: (value: Pin) => void;
    onComplete?: (value: Pin) => void;
};

const Codepad: FC<Props> = ({ length = 4, className, onComplete, loading, error, onChange }) => {
    const [ pin, setPin ] = useState<number[]>([])
    const pinLength = pin.length;
    const pinLengthReached = length === pinLength;
    
    const resetEnteredPin = () => setPin([]);
    
    useEffect(() => {
        if (pinLength !== 0 && typeof onChange === 'function') {
            onChange(pin);
        }
        
        if (pinLengthReached) {
            handlePinComplete(pin);
        }
    }, [ pin, pinLength ])
    
    useEffect(() => {
        if (error && pinLength !== 0) {
            resetEnteredPin();
        }
    }, [error])
        
    const addValue = (value: number) => {
        setPin([...pin, value])
    }
    
    const removeValue = () => {
        if (error) {
            resetEnteredPin();
        } else {
            setPin(p => p.slice(0, -1))
        }
    }
    
    const handlePinComplete = (pin: number[]) => {
        if (typeof onComplete === 'function') {
            onComplete(pin)
        }
    }
    
    const keys = [
        {
            outputValue: 1,
            label: '1',
            onClick: addValue
        },
        {
            outputValue: 2,
            label: '2',
            onClick: addValue
        },
        {
            outputValue: 3,
            label: '3',
            onClick: addValue
        },
        {
            outputValue: 4,
            label: '4',
            onClick: addValue
        },
        {
            outputValue: 5,
            label: '5',
            onClick: addValue
        },
        {
            outputValue: 6,
            label: '6',
            onClick: addValue
        },
        {
            outputValue: 7,
            label: '7',
            onClick: addValue
        },
        {
            outputValue: 8,
            label: '8',
            onClick: addValue
        },
        {
            outputValue: 9,
            label: '9',
            onClick: addValue
        },
        {
            label: 'X',
            onClick: removeValue,
            hidden: false
        },
        {
            outputValue: 0,
            label: '0',
            onClick: addValue
        },
        {
            label: 'C',
            onClick: handlePinComplete,
            hidden: true
        },
    ]
    
    return (
        <div className={classNames(
            'h-fit relative',
            className 
        )}>
            <div className="mt-4">
                <ValueIndicators maxLength={ length } length={ pinLength } error={ !!error } />
            </div>
            { error && <h4 className="text-red-600 text-center mt-4">Je code was niet correct</h4>}
            <div className={classNames(
                'grid grid-cols-3 gap-6 mx-auto mt-6', 
                styles.keyscontainer
            )}>
                {
                    keys.map(({ label, hidden, ...keyProps}, index) => (
                        <div className={ classNames('col-span-1', hidden && 'opacity-0 pointer-events-none')}>
                            <PadKey { ...keyProps } key={ index }>
                                <div className="w-12 h-12 flex items-center justify-center font-medium text-xl">{ label }</div>
                            </PadKey>
                        </div>
                    ))
                }
            </div>
            { loading && <div className="absolute inset-0 bg-stone-200 bg-opacity-80 z-10 flex items-center justify-center">
                <div className="animate-spin">
                    <Icon name="loader-5" size="3rem" />
                </div>
            </div> }
        </div>
    )
}

export default Codepad;