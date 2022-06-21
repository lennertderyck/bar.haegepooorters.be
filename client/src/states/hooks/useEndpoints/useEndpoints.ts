import { ID } from "../../../types/general";

const useEndPoints = (overrideOrigin?: string) => {
    const origin = overrideOrigin || process.env.REACT_APP_API_URL || 'http://localhost:4000';
    
    return {
        user: {
            login: origin + '/user/login',
            purchase: origin + '/user/purchase',
            wallets: origin + '/user/wallets',
            addWallet: origin + '/user/add-wallet',
        },
        creditProviders: {
            all: origin + '/credit-provider',
            byId: (id: ID) => origin + '/credit-provider/' + id,
        },
        products: {
            all: origin + '/products',
            byId: (id: ID) => origin + '/products/' + id,
        },
    }
};

export default useEndPoints;