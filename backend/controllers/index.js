import bcrypt from 'bcrypt';
import CreditProvider from '../mongo/models/creditProvider.js';
import Product from '../mongo/models/product.js';
import ProductCategory from '../mongo/models/productCategory.js';
import Session from '../mongo/models/session.js';
import Transaction from '../mongo/models/transaction.js';
import User from "../mongo/models/user.js";
import UserWallet from '../mongo/models/userWallet.js';
import { hashJwtToken } from '../utils/auth/index.js';

export const status = (req, res) => {
    res.json({
        status: 'OK'
    })
}

export const register = async (req, res) => { 
    const currentUserId = req?.user?.id;
    
    const { pin } = req.body;
    const hashedPin = bcrypt.hashSync(pin, 12);
       
    try {
        const result = await User.findOne({ 
            $or: [
                { _id: currentUserId },
                { email: req.body.email }
            ]    
        });
                
        if (!result) {
            const created = await User.create({
                ...req.body,
                ...(pin && { pin: hashedPin })
            });

            res.json(created);
        } else if (result) {
            const updated = await User.findOneAndUpdate({
                    email: req.body.email
                }, 
                {
                    ...req.body,
                    ...(pin && { pin: hashedPin })
                },
                { new: true, sanitizeProjection: true }
            )
                        
            res.json(updated);
        } else {
            res.status(500).json({
                status: 'ERROR',
                error: {
                    message: 'User already exists'
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            error
        })
    }
}

export const login = async (req, res) => {
    const { email, pin } = req.body;
    const { session } = req;
    
    try {
        if (!email || !pin) {
            res.status(400).json({
                status: 'ERROR',
                error: {
                    message: 'Missing required credentials'
                }
            })
        
            return;
        }
    
        const user = await User.findOne({ email: email })
    
        if (!user) {
            res.status(400).json({
                status: 'ERROR',
                error: {
                    message: 'Could not find user'
                }
            })
        
            return;
        }
    
        const isValid = await bcrypt.compare(pin, user.pin);
        if (!isValid) {
            res.status(400).json({
                status: 'ERROR',
                error: {
                    message: 'Invalid credentials'
                }
            })
            
            return;
        }
        
        // if (!session) {
        //     session = Session.create({
        //         user: user.id || user._id,
        //     })
        // }
    
        const token = hashJwtToken({ 
            userId: user._id, 
            role: user.role,
            session: session
        });
        
        console.log(token);
        
        const wallets = await UserWallet.find({
            user: user._id
        });
        
        if (token) {
            res.json({
                user,
                token,
                wallets
            })
        }
    
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            error
        })
    }
}

export const registerUserWallet = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            status: 'ERROR',
            error: {
                message: 'Unauthorized'
            }
        })
    } else {
        const newWallet = await UserWallet.create({
            ...req.body,
            user: req.user.userId
        });
        res.json(newWallet);
    }
    
}

export const getWallet = async (req, res) => {
    console.log('USER')
    
    if (!req.user) {
        res.status(401).json({
            status: 'ERROR',
            error: {
                message: 'Unauthorized'
            }
        })
    } else {
        const wallet = await UserWallet.find({
            user: req.user.userId
        })
                
        res.json(wallet);
    }
    
}

export const getProducts = async (req, res) => {
    const products = await Product
        .find({})
        .populate('category');
    res.json(products)
}

export const registerTransaction = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            status: 'ERROR',
            error: {
                message: 'Unauthorized'
            }
        })
    } else {
        // Accumulate all requested items
        // Multiply price by requested amount
        // Reduce to final total price
        // Check if wallet has enough credit
        // Negative topup
        
        const newTransaction = await Transaction.create({
            ...req.body,
        });
        
        res.json(newTransaction)
    }
}

export const registerTransactionByUser = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            status: 'ERROR',
            error: {
                message: 'Unauthorized'
            }
        })
    } else {
        const accumulatedProductIds = req.body.items.reduce((acc, item) => {
            return [...acc, item.product]
        }, [])
        
        const accumulatedProductData = await Product.find({
            '_id': { $in: accumulatedProductIds }
        })
        
        const subtotal = accumulatedProductData.reduce((acc, item) => {
            const requestedProductAmount = req.body.items.find(r => r.product === item.id).amount;
            const productSubtotal = item.price * requestedProductAmount;
            
            return acc + productSubtotal;
        }, 0)
        
        const incrementedValue = subtotal * -1;
        
        await UserWallet.findOneAndUpdate(
            {
                _id: req.body.wallet,
                user: req.user.userId
            }, 
            {
                $inc: {
                    balance: incrementedValue
                }
            }, 
            { new: true }
        );
                        
        const newTransaction = await Transaction.create({
            user: req.user.userId,
            ...req.body,
        });
        
        const populated = await newTransaction.populate('wallet')
        
        res.json(populated)
    }
}

export const addProduct = async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
}

export const addCategory = async (req, res) => {
    const newCategory = await ProductCategory.create(req.body);
    res.json(newCategory);
}

export const registerCreditProvider = async (req, res) => {
    const newCreditProvider = await CreditProvider.create(req.body);
    res.json(newCreditProvider);
}

export const getAllCreditProviders = async (req, res) => {
    const creditProviders = await CreditProvider.find({});
    res.json(creditProviders);
}

export const getPublicCreditProviders = async (req, res) => {
    const requestedId = req.params?.id;
    
    console.log(req.query)
    
    if (requestedId) {
        const creditProviders = await CreditProvider.findById(requestedId);
        res.json(creditProviders);
    } else {
        const creditProviders = await CreditProvider.find({})
        res.json(creditProviders);
    }
}

export const getTransactionsByUser = async (req, res) => {
    const limit = req?.query?.limit
    
    if (!req.user) {
        res.status(401).json({
            status: 'ERROR',
            error: {
                message: 'Unauthorized'
            }
        })
    } else {
        const transactions = await Transaction.find({
            user: req.user.userId
        }, null, { limit }).sort({
            createdAt: "descending"
        });
        res.json(transactions);
    }
}

export const getUserWallets = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            status: 'ERROR',
            error: {
                message: 'Unauthorized'
            }
        })
    } else {
        const wallets = await UserWallet.find({
            user: req.user.userId
        });
        res.json(wallets);
    }
}

export const topupUserWallet = async (req, res) => {
    if (!req.user) {
        res.status(401).json({
            status: 'ERROR',
            error: {
                message: 'Unauthorized'
            }
        })
    } else {
        console.log(req.user);
        
        const wallet = await UserWallet.findOne({
            _id: req.params.id,
            user: req.user.userId
        });
        
        if (wallet) {
            const updated = await UserWallet.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user.userId
                }, 
                {
                    $inc: {
                        balance: req.body.amount
                    }
                }, 
                { new: true }
            );
                        
            res.json(updated);
        } else {
            res.status(401).json({
                status: 'ERROR',
                error: {
                    message: 'Could not find wallet'
                }
            })
        }
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
    
        if (!user) {
            res.status(400).json({
                status: 'ERROR',
                error: {
                    message: 'Could not find user'
                }
            })
        
            return;
        }
    
        const token = hashJwtToken({ userId: user._id, role: user.role });
        const wallets = await UserWallet.find({
            user: user._id
        });
    
        res.json({
            user,
            token,
            wallets
        })
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            error: error.message
        })
    }
}

export const getTransactions = async (req, res) => {
    const requestedId = req.params.id;
    
    try {
        if (requestedId) {
            const transactions = await Transaction.findById(requestedId);
            res.json(transactions)
        } else {
            const transactions = await Transaction.find();
            res.json(transactions)
        }
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            error
        })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('wallets');
        console.log(users[0])
        res.json(users);
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            error
        })
    }
}

export const createUser = async (req, res) => {
    try {
        const { pin } = req.body;
        const hashedPin = bcrypt.hashSync(pin, 12);
        
        const newUser = await User.create({
            ...req.body,
            pin: hashedPin
        });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            error
        })
    }
}

export const getAvailableCreditProvidersForUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const walletIds = user.wallets.map(w => w.provider._id)
        const creditProviders = await CreditProvider.find({
            _id: {
                $nin: walletIds
            }
        })
        res.json(creditProviders);
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            error
        })
    }
}

export const checkCreditProviderAvailabilityForUser = async (req, res) => {
    const requestedCreditProvider = req.params.id;
    
    try {
        const wallet = await UserWallet.findOne({
            provider: requestedCreditProvider,
            user: req.user.userId
        })
        
        const creditProvider = await CreditProvider.findById(requestedCreditProvider);
        
        const response = {
            available: false,
            creditProvider,
            wallet
        }
        
        if (wallet) {
            res.json(response);
        } else {
            res.json({
                ...response,
                available: true
            });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: 'ERROR',
            error: error.message
        })
    }
    
}