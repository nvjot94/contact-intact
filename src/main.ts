import App from "./server";

const port = parseInt(process.env.PORT || '3000');

const app = new App().start(port)
    .then(port => console.log(`server running at ${port}`))
    .catch(error => {
        console.log(error);
        process.exit(1)
    });