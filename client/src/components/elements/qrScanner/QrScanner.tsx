import { FC, ReactElement, useLayoutEffect, useRef } from 'react';
import Scanner from 'qr-scanner';

type Props = {
    children?: ReactElement | ReactElement[];
    onScan?: (data: any) => void;
    onError?: (error: any) => void;
};

const QrScanner: FC<Props> = ({ onScan, onError }) => {
    const videoRef = useRef<any>();
    
    useLayoutEffect(() => {
        const qrScanner = new Scanner(
            videoRef.current as HTMLVideoElement, 
            (data) => {
                if (data && onScan) {
                    onScan(data);
                }
            },
            {
                preferredCamera: 'environment',
                highlightCodeOutline: true,
            }
        );
        qrScanner.start();
        
        return () => {
            console.log('stop')
            qrScanner.stop();
        }
    })
    
    return (
        <video ref={ videoRef } className="w-full h-[50vh] object-cover bg-white" />
    )
}

export default QrScanner;