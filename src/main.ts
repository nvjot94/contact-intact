import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user/user';
import contactRouter from './routes/contact/contacts';
import authRouter from './routes/auth/auth';
import connectDb from './database/connection';
const app: Application = express();
const port: number = parseInt(process.env.PORT || '5000');
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



app.listen(port, (error) => {
    console.log(`server running at port ${port}`);
    if (error) {
        console.log(error);
    }
});




