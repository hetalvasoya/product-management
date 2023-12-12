import jwt from 'jsonwebtoken';
import { devConfig } from '../config/dev.config.js';

export const getToken = (id) => {
    let payload = {id: id};
    let token = jwt.sign(payload, devConfig.secrets.jwt, {
        expiresIn:devConfig.secrets.jwtExp
    });
    return token;
}