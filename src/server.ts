import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user/users';
import contactRouter from './routes/contact/contacts';
import authRouter from './routes/auth/auth';
import connectDb from './connection';
const app: Application = express();

//connecting the database
connectDb();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send(`url queried is ${req.url}`);
});


// Route Setup
app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);


const start = (port: Number) => {
    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            resolve(port);
        }).on('error', (err: object) => reject(err));
    })
};

export default start;

