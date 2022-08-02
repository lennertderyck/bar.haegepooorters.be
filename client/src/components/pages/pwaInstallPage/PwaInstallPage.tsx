import { FC } from 'react';
import { useUA } from 'use-ua-parser-js';
import { useApp } from '../../../states/hooks/useApp/useApp';
import { Button } from '../../basics';

type Props = {
    children?: any;
};

const PwaInstallPage: FC<Props> = ({ children }) => {
    const app = useApp();
    const uaDetails = useUA();
    
    const isMobile = uaDetails?.device.type === 'mobile';
    
    return (
        <div className="h-full flex flex-col justify-center">
            <header>
                <div className="container mx-auto py-8">
                    <h1 className="text-4xl text-center">BarApp</h1>
                </div>
            </header>
            <div className="container mx-auto px-12">
                <h2 className="text-center text-xl">Installeer BarApp om verder te gaan</h2>
                <p className="text-center text-stone-500">De app wordt toegevoegd aan je startschem</p>
                
                <div className="mt-4">
                    <Button theme="main" onClick={ app.add2Screen } icon="arrow-right-down">Installeren</Button>
                </div>
            </div>
            {/* { isMobile ? (<>
                <div className="container mx-auto px-12">
                    <a href="/app/session">
                        <Button theme="main">Aanmelden</Button>
                    </a>
                    <a href="/app/session/new">
                        <Button theme="secondary" className="mt-4">Account aanmaken</Button>
                    </a>
                </div>
            </>) : (<>
                
            </>)} */}
        </div>
    )
}

export default PwaInstallPage;