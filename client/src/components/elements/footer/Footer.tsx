import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useCart from '../../../states/hooks/useCart/useCart';
import { Icon } from '../../basics';
import tw from 'tailwind-styled-components';

type StickyFooterProps = {
    children?: any;
}

type Props = {
    children?: any;
};

const ActiveLink = styled(NavLink)`
    padding: .75rem;
    border-bottom: 2px solid transparent;

    &.active {
        border-bottom: 2px solid #00bcd4;
    }
`;

const FooterWrapper = styled.footer`
    // box-shadow: 0px 1px 0px rgba(17,17,26,0.05), 0px 0px 8px rgba(17,17,26,0.1);
`;

const StickyFooter: FC<StickyFooterProps> = ({ children }) => {
    return (<div className="sticky bottom-0 left-0 right-0 z-40 p-8 flex justify-center">
        { children }
    </div>)
}

const Footer: FC<Props> = ({ children }) => {
    const { items } = useCart();
    
    return (
        <FooterWrapper className="w-fit">
            <div className="w-fit">
                <div className="px-3"> 
                    <div className="flex justify-evenly gap-4">
                        <ActiveLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                            {({ isActive }) => (
                                <Icon className={ isActive ? 'text-[#00bcd4] -translate-y-0.5' : 'text-stone-600' } name="home" size="1.6rem" />
                            )}
                        </ActiveLink>
                        <ActiveLink to="/bar">
                            {({ isActive }) => (
                                <Icon className={ isActive ? 'text-[#00bcd4] -translate-y-0.5' : 'text-stone-600' } name="goblet" size="1.6rem" />
                            )}
                        </ActiveLink>
                        <ActiveLink to="/user">
                            {({ isActive }) => (
                                <Icon className={ isActive ? 'text-[#00bcd4] -translate-y-0.5' : 'text-stone-600' } name="account-circle" size="1.6rem" />
                            )}
                        </ActiveLink>
                    </div>
                </div>
            </div>
        </FooterWrapper>
    )
}

export { StickyFooter }
export default Footer;