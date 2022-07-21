import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FeatureFlag } from '../../../types/general';
import { Toggle } from '../../basics';
import { Popover } from '../../elements';

type Props = {
    children?: any;
};

const flags: FeatureFlag[] = [
    {
        label: 'Desktop support',
        id: 'desktop_support',
        default: false,
        description: 'Maak gebruik van de app ook mogelijk op desktop in een experimentele omgeving.'
    },
    {
        label: 'Donkere modus',
        id: 'dark_mode',
        default: false,
        description: 'Een donkere versie van de applicatie. Mogelijks werder nog niet alle elementen gewijzigd.'
    },
    {
        label: 'Product toevoeg popup',
        id: 'prod_popup',
        default: false,
        description: 'Toon een popup wanneer een product toegevoegd wordt door op desbetreffende knop te klikken.'
    },
]

const FeatureFlagsPage: FC<Props> = ({ children }) => {
    const params = useParams<{ id: string }>()
    
    const requestedFlagFromUrl = flags.find((flag) => flag.id === params?.id) || null;
    const [ requestedFlag, setRequestedFlag ] = useState<FeatureFlag | null>(requestedFlagFromUrl);
    
    const handleDetailPopoverClose = () => {
        setRequestedFlag(null)
    }
    
    return (
        <>
            <div className="p-8">
                <div className="mb-6">
                    <div className="pre-heading">Configuratie</div>
                    <div className="heading">Feature flags</div>
                </div>
                <div>
                    <ul>
                        { flags.map((flag) => (
                            <li 
                                className="border-b border-stone-300"
                                onClick={() => setRequestedFlag(flag)}
                            >
                                <div className="w-full flex items-baseline justify-between py-4">
                                    <div className="flex-1 mr-6"> 
                                        <h4 className="text-lg">{ flag.label }</h4>
                                        {/* <p className="text-stone-500 text-sm">{ flag.description }</p> */}
                                    </div>
                                    <div className="label text-stone-400">Ingeschakeld</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Popover active={ !!requestedFlag } onClose={ handleDetailPopoverClose }>
                <div className="mb-4">
                    <div className="text-xl">{ requestedFlag?.label }</div>
                    <p className="text-stone-500 text-sm">{ requestedFlag?.description }</p>
                </div>
                <label className="flex items-center gap-4">
                    <Toggle 
                        defaultChecked={ requestedFlag?.default } 
                        name={ requestedFlag?.id }
                    />
                    <span>In-/uitschakelen</span>
                </label>
            </Popover>
        </>
    )
}

export default FeatureFlagsPage;