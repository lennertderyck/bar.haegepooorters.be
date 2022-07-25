import { useState } from "react";
import { Error } from "../../../types/general";

const useBadge = () => {
    const [ success, setSuccess ] = useState<boolean>(false);
    const [ error, setError ] = useState<Error | undefined>();
    
    const supported = 'setAppBadge' in navigator;
    
    const setBadge = async () => {
        try {
            await navigator.setAppBadge();
            setSuccess(true);
        } catch (error: Error) {
            setError(error);
        }
    }
    
    const removeBadge = async () => {
        
    }
}

export default useBadge;