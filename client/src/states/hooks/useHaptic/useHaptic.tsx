import { VibratePatterns } from "./useHaptic.types";

const defaultPatterns: VibratePatterns = {
    default: [50],
    click: [50],
    confirm: [50, 50],
    forbidden: [200],
}

const useHaptic = (pattern: keyof VibratePatterns | VibratePattern = 'click') => {
    const selectedPattern = typeof pattern === 'string' ? defaultPatterns[pattern] : pattern;
    
    const vibrate = () => {
        return navigator.vibrate(selectedPattern);
    }
    
    return [
        vibrate
    ]
}

export default useHaptic;