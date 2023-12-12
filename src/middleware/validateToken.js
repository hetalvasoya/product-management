import jwt from 'jsonwebtoken';
import { devConfig } from '../config/dev.config.js';
import { User } from '../models/index.js';

export const validateToken = async (req, res, next) => {
    try{           
        const authorization = req.headers.authorization;
        let payload = {};   
        if(!authorization || Object.keys(authorization).length === 0) {
            return res.status(401).send()
        }
        if(authorization.startsWith('Bearer')) {
            const token = authorization.split("Bearer ")[1];
            payload = jwt.verify(token, devConfig.secrets.jwt);            
        } else {
            const token = authorization;
            payload = jwt.verify(token, devConfig.secrets.jwt);           
        }
        if((payload.exp * 1000) < new Date().getTime()) {
            return next(new Error(`Session expiry.`, 401))
        } 
        req.user = await User.findOne({_id: payload.id});
        next();
    }
    catch(e) {
        console.trace();
        next(new Error(e.message, 401))
    }
};