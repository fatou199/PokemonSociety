import { error } from "console";
require('dotenv').config();


const jwt = require('jsonwebtoken');
function verifyToken(req: { header: (arg0: string) => any; userId: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }, next: () => void) {
    const token = req.header('Autorization');

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default {verifyToken};