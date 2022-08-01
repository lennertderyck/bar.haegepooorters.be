import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFlags from '../../../states/hooks/useFlags/useFlags';
import { FeatureFlag, ID } from '../../../types/general';
import flags from '../../../utils/data/flags';
import { Toggle } from '../../basics';
import { Popover } from '../../elements';

type Props = {
    children?: any;
};

const FeatureFlagsPage: FC<Props> = ({ children }) => {
    const { flags, flagById, toggleFlag } = useFlags();
    const params = useParams<{ id: string }>()
    
    const [ requestedFlag, setRequestedFlag ] = useState<ID | undefined>(params.id);
    const flagDetails = requestedFlag && flagById(requestedFlag);
    
    const handleDetailPopoverClose = () => {
        setRequestedFlag(undefined)
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
                                onClick={() => setRequestedFlag(flag.id)}
                            >
                                <div className="w-full flex items-baseline justify-between py-4">
                                    <div className="flex-1 mr-6"> 
                                        <h4 className="text-lg">{ flag.label }</h4>
                                        {/* <p className="text-stone-500 text-sm">{ flag.description }</p> */}
                                    </div>
                                    <div className="label text-stone-400">{ flag.state ? 'Ingeschakeld' : 'Uitgeschakeld' }</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Popover active={ !!requestedFlag } onClose={ handleDetailPopoverClose }>
               { !!flagDetails && (
                <>
                    <div className="mb-4">
                        <div className="text-xl">{ flagDetails?.label }</div>
                        <p className="text-stone-500 text-sm">{ flagDetails?.description }</p>
                    </div>
                    <label className="flex items-center gap-4">
                        <Toggle 
                            onChange={() => toggleFlag(flagDetails.id, !flagDetails.state)}
                            defaultChecked={ flagDetails?.state } 
                            name={ flagDetails?.id }
                        />
                        <span>{ flagDetails?.state ? 'Ingeschakeld' : 'Uitgeschakeld' }</span>
                    </label>
                </>
               )}
            </Popover>
        </>
    )
}

export default FeatureFlagsPage;