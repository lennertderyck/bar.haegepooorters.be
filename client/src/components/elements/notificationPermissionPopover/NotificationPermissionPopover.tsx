import { FC, useState } from 'react';
import { Button } from '../../basics';
import Popover from '../popover/Popover';

type Props = {
    children?: any;
};

const NotificationPermissionPopover: FC<Props> = ({ children }) => {
    const isIgnored = window.sessionStorage.getItem('notify:notifications') === 'ignore'
    const isBlocked = window.localStorage.getItem('notify:notifications') === 'blocked';
    const permissionState = Notification.permission;
    
    const [ showPopover, setShowPopover ] = useState(permissionState === 'default' && !isIgnored && !isBlocked)
    
    const requestPermission = async () => {
        try {
            await Notification.requestPermission();
            setShowPopover(false);
        } catch {}
    }
    
    const ignore = () => {
        window.sessionStorage.setItem('notify:notifications', 'ignore')
        setShowPopover(false);
    }
    
    const block = () => {
        window.localStorage.setItem('notify:notifications', 'block');
        setShowPopover(false);
    }
    
    return (
        <Popover active={ showPopover } onClose={ ignore }>
            <div className="mb-4">
                <h3 className="text-2xl font-semibold first-letter:uppercase">Notificaties</h3>
                <h4 className="text-stone-700 text-center font-medium text-lg">Mogen we je een notificatie sturen?</h4>
                <p className="text-stone-500 mt-2">Geen zorgen, we zullen je niet stalken - beloofd!</p>
            </div>
            <Button theme="main" onClick={ requestPermission  }>Dat is ok!</Button>
            <Button theme="secondary" onClick={ ignore } secondary className="mt-4">Vraag me later</Button>
            <Button theme="simple" onClick={ block } secondary simple small className="mt-6 text-stone-400">Niet meer vragen</Button>
        </Popover>
    )
}

export default NotificationPermissionPopover;