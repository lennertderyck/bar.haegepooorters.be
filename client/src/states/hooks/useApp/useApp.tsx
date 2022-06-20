import { UseApp } from "./useApp.types";

export const useApp: UseApp = () => {
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    return {
        isInstalled,
    }
}