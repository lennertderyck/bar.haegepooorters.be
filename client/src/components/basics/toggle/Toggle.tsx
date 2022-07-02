import { FC, useRef } from 'react';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Toggle: FC<Props> = ({ ...otherProps }) => { 
    const checkboxRef = useRef<any>();
    
    const toggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const $checkbox = checkboxRef.current as HTMLInputElement;
        $checkbox.checked = $checkbox.checked!;
    }
    
    return (
        <label className="block">
            <input { ...{ otherProps, type: "checkbox" }} className="hidden peer" ref={ checkboxRef } />
            <div
                onClick={ toggle }
                className="border-2 w-fit rounded-full py-1 border-stone-400 pl-0 pr-7 peer-checked:border-black peer-checked:pl-7 peer-checked:pr-0"
            >
                <div className="h-4 w-4 bg-black rounded-full mx-1" />
            </div>
        </label>
    )
}

export default Toggle;