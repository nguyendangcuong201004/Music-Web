"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.changeStatus = exports.index = void 0;
var user_model_1 = __importDefault(require("../../models/user.model"));
var favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
var system_1 = require("../../config/system");
var hashPassword_helper_1 = require("../../helpers/hashPassword.helper");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, _i, users_1, user, countFavorite;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.default.find({
                    deleted: false,
                })];
            case 1:
                users = _a.sent();
                _i = 0, users_1 = users;
                _a.label = 2;
            case 2:
                if (!(_i < users_1.length)) return [3 /*break*/, 5];
                user = users_1[_i];
                return [4 /*yield*/, favorite_song_model_1.default.countDocuments({
                        userId: user.id,
                        deleted: false,
                    })];
            case 3:
                countFavorite = _a.sent();
                user["countFavorite"] = countFavorite;
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                res.render("admin/pages/users/index.pug", {
                    pageTitle: "Tài khoản user",
                    users: users
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var changeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, userId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = req.params.status;
                userId = req.params.userId;
                return [4 /*yield*/, user_model_1.default.updateOne({
                        _id: userId,
                        deleted: false
                    }, {
                        status: status
                    })];
            case 1:
                _a.sent();
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.changeStatus = changeStatus;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render("admin/pages/users/create.pug", {
            pageTitle: "T\u1EA1o t\u00E0i kho\u1EA3n user"
        });
        return [2 /*return*/];
    });
}); };
exports.create = create;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var emailExists, userObject, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.default.findOne({
                    email: req.body.email,
                    deleted: false,
                })];
            case 1:
                emailExists = _a.sent();
                if (emailExists) {
                    req.flash('error', "Email ".concat(req.body.email, " \u0111\u00E3 t\u1ED3n t\u1EA1i!"));
                    res.redirect("back");
                    return [2 /*return*/];
                }
                userObject = {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: (0, hashPassword_helper_1.hashPassword)(req.body.password),
                    phone: req.body.phone,
                    avatar: req.body.avatar,
                    status: req.body.status,
                };
                user = new user_model_1.default(userObject);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 th\u00EAm t\u00E0i kho\u1EA3n ".concat(userObject.fullName, " th\u00E0nh c\u00F4ng!"));
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/users"));
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, user_model_1.default.findOne({
                        _id: userId,
                        deleted: false,
                    })];
            case 1:
                user = _a.sent();
                res.render("admin/pages/users/edit.pug", {
                    pageTitle: "Ch\u1EC9nh s\u1EEDa t\u00E0i kho\u1EA3n user",
                    user: user
                });
                return [2 /*return*/];
        }
    });
}); };
exports.edit = edit;
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, emailExists, userObject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, user_model_1.default.findOne({
                        _id: { $ne: userId },
                        email: req.body.email,
                        deleted: false,
                    })];
            case 1:
                emailExists = _a.sent();
                if (emailExists) {
                    req.flash('error', "Email ".concat(req.body.email, " \u0111\u00E3 t\u1ED3n t\u1EA1i!"));
                    res.redirect("back");
                    return [2 /*return*/];
                }
                userObject = {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    phone: req.body.phone,
                    avatar: req.body.avatar,
                    status: req.body.status,
                };
                // Chỉ cập nhật mật khẩu khi người dùng nhập mới
                if (req.body.password) {
                    userObject.password = (0, hashPassword_helper_1.hashPassword)(req.body.password);
                }
                return [4 /*yield*/, user_model_1.default.updateOne({
                        _id: userId,
                        deleted: false,
                    }, userObject)];
            case 2:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 c\u1EADp nh\u1EADt t\u00E0i kho\u1EA3n user th\u00E0nh c\u00F4ng!");
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.editPatch = editPatch;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, user_model_1.default.updateOne({
                        _id: userId,
                    }, {
                        deleted: true,
                        deletedAt: new Date(),
                    })];
            case 1:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 x\u00F3a t\u00E0i kho\u1EA3n user th\u00E0nh c\u00F4ng!");
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
