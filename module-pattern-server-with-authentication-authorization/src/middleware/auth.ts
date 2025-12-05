import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import config from '../config';

const auth = (...role: string[])=>{
    return async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const token = req.headers.authorization;
            if(!token){
                return res.status(401).json({
                    success: false,
                    message: "unauthorized"
                })
            }

            // verify token
            const secret = config.jwt_secret as string;
            const decode = jwt.verify(token,secret) as JwtPayload;

            req.user = decode;

            if(role.length && !role.includes(decode.role)){
                return res.status(403).json({
                    success: false,
                    message: "forbidden"
                })
            }

            next();
            
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: "unauthorized"
            })        }
    }
}

export default auth;