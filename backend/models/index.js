import { addCategory, addProduct, addWallet, getProducts, getWallet, login, register, registerTransaction, status } from "../controllers/index.js";
import app from "../server.js";

app.get('/', status);

app.post('/register', register);
app.post('/login', login);

app.post('/wallet', addWallet);
app.get('/wallet', getWallet);

app.get('/products', getProducts);
app.post('/products', addProduct);

app.post('/product-categories', addCategory);

app.post('/purchase', registerTransaction);
