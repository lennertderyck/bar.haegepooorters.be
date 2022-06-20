import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const { isValidObjectId } = mongoose;
import Product from '../mongo/models/product.js';
import ProductCategory from '../mongo/models/productCategory.js';
import Transaction from '../mongo/models/transaction.js';
import User from "../mongo/models/user.js";
import Wallet from '../mongo/models/wallet.js';
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
        }
    
        const token = hashJwtToken({ userId: user._id, role: user.role });
        const wallets = await Wallet.find();
        const addedBalances = wallets.map(w => ({
            ...w.toJSON(),
            balance: 12.50
        }));
        
        if (token) {
            res.json({
                user,
                token,
                wallets: addedBalances
            })
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'ERROR',
            error
        })
    }
}

export const addWallet = async (req, res) => {
    const newWallet = await Wallet.create(req.body);
    res.json(newWallet);
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
        const wallets = await Wallet.find();
        
        const f = await Promise.all(wallets.map(async (wallet) => {
            const transactions = await Transaction.find({
                user: req.user.id,
                wallet: wallet.id
            })
            
            return {
                ...wallet.toJSON(),
                transactions,
                balance: 12.45,
            }
        }))
                
        res.json(f);
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
        const newTransaction = await Transaction.create({
            user: req.user.id,
            ...req.body,
        });
        
        res.json(newTransaction)
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