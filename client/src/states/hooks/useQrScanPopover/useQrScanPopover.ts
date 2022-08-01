import create from 'zustand';
import UseQrScanPopover from './useQrScanPopover.types';

const useQrScanPopover = create<UseQrScanPopover>((set) => ({
    active: false,
    
    open: () => set({
        active: true
    }),
    close: () => set({
        active: false
    })
}))

export default useQrScanPopover;