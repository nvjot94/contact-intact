import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user/user";
import contactRouter from "./routes/contact/contacts";
import authRouter from "./routes/auth/auth";
import connectDb from "./database/connection";
import cors from "cors";
import path from "path";
const app: Application = express();
const port: number = parseInt(process.env.PORT || "8080");
//connecting the database
connectDb();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Route Setup
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);
app.use("/api/auth", authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendfile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, error => {
  console.log(`server running at port ${port}`);
  if (error) {
    console.log(error);
  }
});
