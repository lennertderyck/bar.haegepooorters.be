import { useRef } from "react";
import { BeforeInstallPromptEvent } from "../../../types/global";
import { useEffectOnce } from "../useEffectOnce/useEffectOnce";
import { UseApp } from "./useApp.types";

export const useApp: UseApp = () => {
    const pwaInstallable = useRef<BeforeInstallPromptEvent>();
    
    useEffectOnce(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            pwaInstallable.current = e;
        });
    })
    
    const add2Screen = async () => {
        if (pwaInstallable.current) {
            await pwaInstallable.current.prompt();
            pwaInstallable.current.userChoice.then(() => {
                pwaInstallable.current = undefined;
            })
        }   
    }
    
    return {
        get installed() {
            return window.matchMedia('(display-mode: standalone)').matches
        },
        add2Screen
    }
}