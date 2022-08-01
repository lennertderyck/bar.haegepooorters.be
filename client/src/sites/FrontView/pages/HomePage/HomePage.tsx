import { FC } from 'react';
import { Button } from '../../../../components/basics';
import { useUA } from 'use-ua-parser-js';

type Props = {
    children?: any;
};

const HomePage: FC<Props> = ({ children }) => {
    const uaDetails = useUA();
    
    const isMobile = uaDetails?.device.type === 'mobile';
    
    return (
        <div className="h-full flex flex-col justify-center">
            <header>
                <div className="container mx-auto py-8">
                    <h1 className="text--main text-4xl text-center">BarApp</h1>
                </div>
            </header>
            { isMobile ? (<>
                <div className="container mx-auto px-12">
                    <a href="/app/session">
                        <Button>Aanmelden</Button>
                    </a>
                    <a href="/app/session/new">
                        <Button secondary className="mt-4">Account aanmaken</Button>
                    </a>
                </div>
            </>) : (<>
                <div className="container mx-auto px-12">
                    <h2 className="text-center text-xl text--main">Je kan de app hier nog niet gebruiken</h2>
                    <p className="text-center text-stone-500">Open deze pagina op je smartphone</p>
                </div>
            </>)}
        </div>
    )
}

export default HomePage;