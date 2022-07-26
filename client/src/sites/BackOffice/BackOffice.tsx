import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouterOutlet } from '../../components/elements';
import { OverviewPage, UsersOverviewPage } from './pages';

type Props = {
};

const BackOffice: FC<Props> = () => {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={ <OverviewPage /> } />
                    <Route path="users" element={ <RouterOutlet /> }>
                        <Route index element={ <UsersOverviewPage /> } />
                        <Route path=":id" element={ <UsersOverviewPage /> } />
                    </Route>
                </Routes>
            </div>
            <footer className="bg-stone-50 border-t-[1px] border-stone-200 px-8 py-1 flex justify-between">
                <h1 className="text-xs label text-stone-400">Barapp Backoffice 1.0</h1>
                <div className="text-xs label text-stone-400">Ingelogd als <span className="text-stone-500">Beheerder</span></div>
            </footer>
        </div>
    )
}

export default BackOffice;