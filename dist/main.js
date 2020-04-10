"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./routes/user/user"));
const contacts_1 = __importDefault(require("./routes/contact/contacts"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
const connection_1 = __importDefault(require("./database/connection"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const port = parseInt(process.env.PORT || "8080");
//connecting the database
connection_1.default();
//middleware
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
// Route Setup
app.use("/api/user", user_1.default);
app.use("/api/contact", contacts_1.default);
app.use("/api/auth", auth_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static("client/build"));
    app.get("*", (request, response) => {
        response.sendfile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
app.listen(port, error => {
    console.log(`server running at port ${port}`);
    if (error) {
        console.log(error);
    }
});
