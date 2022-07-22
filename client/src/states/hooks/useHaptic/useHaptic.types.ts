export type VibratePatterns = {
    default: VibratePattern;
    click: VibratePattern;
    confirm: VibratePattern;
    forbidden: VibratePattern;
};
export type Vibrate = () => boolean;

export type UseHapticProperties = [ Vibrate ];
export type UseHaptic = () => UseHapticProperties;