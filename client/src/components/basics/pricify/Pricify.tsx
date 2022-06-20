import { FC } from 'react';

type Props = {
    children: string | number;
    prefix?: string;
};

const Pricfy: FC<Props> = ({ children: price, prefix = '€' }) => {
    const type = typeof price;
    
    const priceAsNumber = type === 'string' ? parseFloat(price as string).toFixed(2) : (price as number).toFixed(2);
    const priceAsParsedString = new String(priceAsNumber).replace('.', ',');
    
    return <>
        { prefix } { priceAsParsedString }
    </>
}

export default Pricfy;