import { FC } from 'react';
import styled from 'styled-components';

type ImgShimProps = {
    width?: string;
    height?: string;
}

type Props = ImgShimProps & {
    value: string | number;
};

const ImgShim = styled.img<ImgShimProps>`
    width: ${ props => props.width }
    height: ${ props => props.height }
`;

const QR: FC<Props> = ({ value, ...otherProps }) => {
    return (
        <ImgShim 
            src={ `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ value }&format=svg` } 
            { ...otherProps }
        />
    )
}

export default QR;