import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from "../../components/user/domain/interface";
import User from "../../components/user/domain/model/user";
import { StatusCodes } from "http-status-codes";
import { InvalidTokenException } from "../../common/exceptions";

declare module 'express-serve-static-core' {
    interface Request {
        user: IUser;
    }
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const jwtSecret = process.env.JWT_SECRET;

            if (!jwtSecret) {
                console.error('The environment variable JWT_SECRET it is not defined.');
                throw new Error('An error happened trying to instantiate JWT');
            }
            const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
            const user = await User.findOne({ _id: decoded.id }, { password: 0, token: 0, createdAt: 0, updatedAt: 0, __v: 0, confirmed: 0 });

            if (!user) {
                res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Error searching user' });
            }
            req.user = user!;
            return next();
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.NOT_FOUND).json({ msg: 'An error happened, try again later.' })
        }
    }

    if (!token) {
        const error = new InvalidTokenException();
        res.status(error.code).json({ msg: error.message })
    }
    next();
}