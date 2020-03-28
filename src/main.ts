import start from "./server";

const port: Number = parseInt(process.env.PORT || '3000');

start(port)
    .then(port => console.log(`server running at ${port}`))
    .catch(error => {
        console.log(error);
        process.exit(1)
    });