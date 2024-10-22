"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// console.log(express);
const app = (0, express_1.default)();
// console.log(app);
app.get('/', (req, res) => {
    console.log(req.url);
    console.log("req >>", req);
    console.log("res >>", res);
    res.send('home page');
});
app.listen(3000, () => console.log('app listen on port 3000'));
