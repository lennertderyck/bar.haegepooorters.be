import { addCategory, addProduct, registerUserWallet, getProducts, getWallet, login, register, registerCreditProvider, registerTransaction, status, getTransactionsByUser, getAllCreditProviders, getUserWallets, registerTransactionByUser, topupUserWallet, getUserDetails, getTransactions } from "../controllers/index.js";
import app from "../server.js";

app.get('/', status);

app.post('/register', register);
app.post('/login', login);

app.post('/credit-provider', registerCreditProvider);
app.get('/credit-provider', getAllCreditProviders);

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

