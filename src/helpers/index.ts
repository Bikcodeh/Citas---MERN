import jwt from 'jsonwebtoken';

export const generateId = (): string => {
    const numberRandom = Math.random().toString(32).substring(2);
    const date = Date.now().toString(32);
    return numberRandom + date;
}

export const generateJWT = (id: string): string => {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error('The environment variable JWT_SECRET it is not defined.');
        throw new Error('An error happened trying to instantiate JWT');
    }

    try {
        const token = jwt.sign({ id }, jwtSecret, {
            expiresIn: '30d'
        });
        return token;
    } catch (error) {
        console.error('An error happened  generating JWT:', error);
        throw new Error('Error generating JWT');
    }
};