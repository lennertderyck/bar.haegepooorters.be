import { FC, useState } from 'react';
import useQrScanPopover from '../../../states/hooks/useQrScanPopover/useQrScanPopover';
import Popover from '../popover/Popover';
import QrScanner from '../qrScanner/QrScanner';

type Props = {
    onResult?: (data: any) => void;
    onError?: (error: any) => void;
};

const QrScanPopover: FC<Props> = ({ onResult }) => {
    const [ result, setResult ] = useState<any>();
    const [ error, setError ] = useState(false);
    const scan = useQrScanPopover();
    
    const handleScan = (result: any) => {
        if (typeof result === 'string') {
            setError(true)
        } else if (typeof result === 'object') {
            setError(true)
            const data = result.data;
            console.log(data)
            const correctFormat = data.startsWith('web+barapp://');
            if (correctFormat) {
                setResult(data);
            }
        }
    }
    

    return (
        <Popover active={ scan.active } bare onClose={ scan.close }>
            {!result ? (
                <div className="relative w-full h-full">
                    <QrScanner
                        onScan={ handleScan }
                        onError={ error => setError(error) }
                    />
                    <div 
                        className="bg-gradient-to-t from-black to-transparent p-6 absolute left-0 right-0 bottom-0 text-sm text-white text-center"
                    >Houd de code duidelijk in beeld</div>
                </div>
            ) : (
                <div className="bg-white p-8">
                    <div className="mb-6">
                        <h3 className="popover__title">Code herkend</h3>
                        <h4 className="popover__subtitle">Volgende stap</h4>
                        <p className="mt-6">Resultaat: { result }</p>
                    </div>
                </div>
            )}
        </Popover>
    )
}

export default QrScanPopover;