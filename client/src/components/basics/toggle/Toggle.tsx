import { ChangeEvent, FC, useRef } from 'react';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Toggle: FC<Props> = ({ onChange, defaultChecked, ...otherProps }) => { 
    const checkboxRef = useRef<any>();
    
    const toggle = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const $checkbox = checkboxRef.current as HTMLInputElement;
        $checkbox.checked = $checkbox.checked!;
        onChange && onChange(event as unknown as ChangeEvent<HTMLInputElement>);
    }
    
    return (
        <label className="block">
            <input { ...{ otherProps, type: "checkbox" }} defaultChecked={ defaultChecked } className="hidden peer" ref={ checkboxRef } />
            <div
                onClick={ toggle }
                className="border-2 w-fit rounded-full py-1 border-stone-400 dark:border-stone-600 pl-0 pr-7 peer-checked:border-black dark:peer-checked:border-stone-300 peer-checked:pl-7 peer-checked:pr-0"
            >
                <div className="h-4 w-4 bg-black dark:bg-stone-300 rounded-full mx-1" />
            </div>
        </label>
    )
}

export default Toggle;