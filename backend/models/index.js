import { addCategory, addProduct, registerUserWallet, getProducts, getWallet, login, register, registerCreditProvider, registerTransaction, status, getTransactionsByUser, getPublicCreditProviders, getUserWallets, registerTransactionByUser, topupUserWallet, getUserDetails, getTransactions, getUsers, createUser, getAvailableCreditProvidersForUser, checkCreditProviderAvailabilityForUser } from "../controllers/index.js";
import app from "../server.js";

app.get('/', status);

app.post('/register', register);
app.post('/login', login);

app.post('/credit-provider', registerCreditProvider);
app.get('/credit-provider', getPublicCreditProviders);
app.get('/credit-provider/:id', getPublicCreditProviders);

app.post('/wallet', registerUserWallet);
app.get('/wallet', getWallet);

app.get('/products', getProducts);
app.post('/products', addProduct);

app.post('/product-categories', addCategory);

app.post('/purchase', registerTransaction);

app.get('/transactions/:id', getTransactions)

app.get('/user', getUserDetails)
app.post('/user/purchase', registerTransactionByUser);
app.post('/user/wallet', registerUserWallet);
app.post('/user/wallet/:id/topup', topupUserWallet);

app.get('/user/transactions', getTransactionsByUser);
app.get('/user/wallets', getUserWallets);
app.get('/user/credit-providers', getAvailableCreditProvidersForUser);
app.get('/user/credit-provider/:id', checkCreditProviderAvailabilityForUser);

/**
 * BACKOFFICE
 */
app.get('/users', getUsers);
app.post('/users', createUser);

