import {
    Route
} from "react-router-dom";
// @ts-ignore
import SlideRoutes from 'react-slide-routes';
import { FC } from 'react';
import { AddSessionPage, CartPage, FeatureFlagsPage, LoginPage, ManagePage, ProductsListPage, SessionIndexPage, StartPage, UserDetailPage, UserProfilePage, UserTransactionsPage, WalletDetailPage, WalletJoinPage, WalletOverviewPage } from "../../pages";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import RouterOutlet from "../routerOutlet/RouterOutlet";
import Footer from "../footer/Footer";
import styled from "styled-components";
import useAuth from "../../../states/hooks/useAuth/useAuth";
import NotificationPermissionPopover from "../notificationPermissionPopover/NotificationPermissionPopover";
import QrScanPopover from "../qrScanPopover/QrScanPopover";
import useQrScanPopover from "../../../states/hooks/useQrScanPopover/useQrScanPopover";

type Props = {
    children?: any;
};

const FooterWrapper = styled.div`
    box-shadow: 0px 1px 0px rgba(17,17,26,0.05), 0px 0px 8px rgba(17,17,26,0.1);
`;

const Router: FC<Props> = ({ children }) => {
    const qrScan = useQrScanPopover();
    const { user } = useAuth();
    
    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="flex-1 overflow-scroll">
                    <SlideRoutes>
                        <Route element={<RouterOutlet />}>
                            <Route path="session" element={ <RouterOutlet /> }>
                                <Route index element={ <SessionIndexPage /> } />
                                <Route path=":id" element={ <LoginPage /> } />
                                <Route path="new" element={ <AddSessionPage /> } />
                            </Route>
                            <Route path="bar" element={ <ProtectedRoute><RouterOutlet /></ProtectedRoute> }>
                                <Route index element={ <ProductsListPage /> } />
                                <Route path=":id" element={ <ProductsListPage /> } />
                            </Route>
                            <Route path="cart" element={ <ProtectedRoute><RouterOutlet /></ProtectedRoute> }>
                                <Route index element={ <CartPage /> } />
                            </Route>
                            <Route path="user" element={ <ProtectedRoute><RouterOutlet /></ProtectedRoute> }>
                                <Route index element={ <UserDetailPage /> } />
                                <Route path="wallets" element={ <ProtectedRoute><RouterOutlet /></ProtectedRoute> }>
                                    <Route index element={ <WalletOverviewPage /> } />
                                    <Route path=":id" element={ <WalletDetailPage /> } />
                                    <Route path="join" element={ <WalletJoinPage /> } />
                                    <Route path="join/:id" element={ <WalletJoinPage /> } />
                                </Route>
                                <Route path="transactions" element={ <ProtectedRoute><RouterOutlet /></ProtectedRoute> }>
                                    <Route path=":id" element={ <UserTransactionsPage /> } />
                                    <Route index element={ <UserTransactionsPage /> } />
                                </Route>
                                <Route path="account" element={ <UserProfilePage /> } />
                                <Route path="flags">
                                    <Route index element={ <FeatureFlagsPage /> } />
                                    <Route path=":id" element={ <FeatureFlagsPage /> } />
                                </Route>
                            </Route>
                            <Route path="shared/:type/:data" element={ <></> } />
                            <Route path="manage" element={ <ProtectedRoute><RouterOutlet /></ProtectedRoute> }>
                                <Route index element={ <ManagePage /> } />
                            </Route>
                            <Route path="/" element={ <ProtectedRoute><StartPage /></ProtectedRoute> } />
                        </Route>
                    </SlideRoutes>
                </div>
                { user && (
                    <>
                        <div className="flex justify-center pt-3">
                            <Footer />
                        </div>
                        <NotificationPermissionPopover />
                    </>
                )}
                <QrScanPopover />
            </div>
        </>
    )
}

export default Router;