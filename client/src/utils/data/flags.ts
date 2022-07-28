import { FeatureFlag } from "../../types/general";

const flags: FeatureFlag[] = [
    {
        label: 'Desktop support',
        id: 'desktop_support',
        description: 'Maak gebruik van de app ook mogelijk op desktop in een experimentele omgeving.',
        state: false
    },
    {
        label: 'Donkere modus',
        id: 'dark_mode',
        description: 'Een donkere versie van de applicatie. Mogelijks werder nog niet alle elementen gewijzigd.',
        state: false
    },
    {
        label: 'Product toevoeg popup',
        id: 'prod_popup',
        description: 'Toon een popup wanneer een product toegevoegd wordt door op desbetreffende knop te klikken.',
        state: true
    },
    {
        label: 'Haptische feedback',
        id: 'haptic',
        description: 'Genereer vibraties bij het uitvoeren van bepaalde acties. Bijvoorbeeld het aanklikken van uitgeschakelde knop.',
        state: true
    },
]

export default flags;