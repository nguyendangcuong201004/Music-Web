"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var database_1 = require("./config/database");
(0, database_1.connect)();
var client_1 = __importDefault(require("./routes/client"));
var admin_1 = __importDefault(require("./routes/admin"));
var system_1 = require("./config/system");
var path_1 = __importDefault(require("path"));
var method_override_1 = __importDefault(require("method-override"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_flash_1 = __importDefault(require("express-flash"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var app = (0, express_1.default)();
var port = "".concat(process.env.PORT) || 3000;
app.set('views', "".concat(__dirname, "/views"));
app.set('view engine', 'pug');
app.use((0, cookie_parser_1.default)('NDCNDTN'));
app.use((0, express_session_1.default)({ cookie: { maxAge: 60000 } }));
app.use((0, express_flash_1.default)());
app.use("/tinymce", express_1.default.static(path_1.default.join(__dirname, "node_modules", "tinymce")));
app.use(express_1.default.static("".concat(__dirname, "/public")));
app.use((0, method_override_1.default)('_method'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.locals.prefixAdmin = system_1.systemConfig.prefixAdmin;
(0, client_1.default)(app); // Router for client 
(0, admin_1.default)(app);
app.listen(port, function () {
    console.log("Chay tren cong ".concat(port));
});
