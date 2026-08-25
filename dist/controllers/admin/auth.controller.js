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
exports.registerPost = exports.register = exports.logout = exports.loginPost = exports.login = void 0;
var account_model_1 = __importDefault(require("../../models/account.model"));
var role_model_1 = __importDefault(require("../../models/role.model"));
var system_1 = require("../../config/system");
var hashPassword_helper_1 = require("../../helpers/hashPassword.helper");
var generate_helper_1 = require("../../helpers/generate.helper");
var permissions_helper_1 = require("../../helpers/permissions.helper");
// [GET] /admin/auth/login
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.cookies.token) {
            res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/dashboard"));
            return [2 /*return*/];
        }
        res.render("admin/pages/auth/login.pug", {
            pageTitle: "Đăng nhập"
        });
        return [2 /*return*/];
    });
}); };
exports.login = login;
// [POST] /admin/auth/login
var loginPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = (0, hashPassword_helper_1.hashPassword)(req.body.password);
                return [4 /*yield*/, account_model_1.default.findOne({
                        email: email,
                        deleted: false,
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    req.flash("error", "Email không tồn tại!");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                if (password != user.password) {
                    req.flash("error", "Mật khẩu không chính xác!");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                if (user.status != "active") {
                    req.flash("error", "Tài khoản đã bị khóa!");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                res.cookie("token", user.token);
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/dashboard"));
                return [2 /*return*/];
        }
    });
}); };
exports.loginPost = loginPost;
// [GET] /admin/auth/logout
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.clearCookie("token");
        res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/auth/login"));
        return [2 /*return*/];
    });
}); };
exports.logout = logout;
// [GET] /admin/auth/register
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.cookies.token) {
            res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/dashboard"));
            return [2 /*return*/];
        }
        res.render("admin/pages/auth/register.pug", {
            pageTitle: "Đăng ký"
        });
        return [2 /*return*/];
    });
}); };
exports.register = register;
// [POST] /admin/auth/register
var registerPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, emailExists, accountCount, roleId, superRole, staffRole, accountObject, account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                req.body.fullName = "".concat(req.body.fullName).trim();
                email = "".concat(req.body.email).trim().toLowerCase();
                if (!req.body.fullName || req.body.fullName.length < 5) {
                    req.flash("error", "Vui lòng nhập họ tên có ít nhất 5 kí tự!");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                if (!req.body.email) {
                    req.flash("error", "Vui lòng nhập email của bạn!");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    req.flash("error", "Email không đúng định dạng!");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                if (!req.body.password || req.body.password.length < 6) {
                    req.flash("error", "Mật khẩu phải có ít nhất 6 kí tự!");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                if (req.body.password !== req.body.confirmPassword) {
                    req.flash("error", "Xác nhận mật khẩu không khớp!");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, account_model_1.default.findOne({
                        email: email,
                        deleted: false,
                    })];
            case 1:
                emailExists = _a.sent();
                if (emailExists) {
                    req.flash("error", "Email đã tồn tại!");
                    res.redirect("back");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, account_model_1.default.countDocuments({ deleted: false })];
            case 2:
                accountCount = _a.sent();
                if (!(accountCount === 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, role_model_1.default.findOne({
                        title: "Quản trị viên cao nhất",
                        deleted: false,
                    })];
            case 3:
                superRole = _a.sent();
                if (!!superRole) return [3 /*break*/, 5];
                superRole = new role_model_1.default({
                    title: "Quản trị viên cao nhất",
                    description: "Có toàn quyền trong hệ thống",
                    permissions: permissions_helper_1.ALL_PERMISSIONS,
                });
                return [4 /*yield*/, superRole.save()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                roleId = superRole.id;
                return [3 /*break*/, 10];
            case 6: return [4 /*yield*/, role_model_1.default.findOne({
                    title: "Nhân viên",
                    deleted: false,
                })];
            case 7:
                staffRole = _a.sent();
                if (!!staffRole) return [3 /*break*/, 9];
                staffRole = new role_model_1.default({
                    title: "Nhân viên",
                    description: "Chỉ quản lý chủ đề, bài hát và ca sĩ",
                    permissions: permissions_helper_1.STAFF_PERMISSIONS,
                });
                return [4 /*yield*/, staffRole.save()];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9:
                roleId = staffRole.id;
                _a.label = 10;
            case 10:
                accountObject = {
                    fullName: req.body.fullName,
                    email: email,
                    password: (0, hashPassword_helper_1.hashPassword)(req.body.password),
                    phone: req.body.phone,
                    token: generate_helper_1.generateHelper.generateRandomString(30),
                    roleId: roleId,
                    status: "active",
                };
                account = new account_model_1.default(accountObject);
                return [4 /*yield*/, account.save()
                    // Đăng ký thành công thì đăng nhập luôn
                ];
            case 11:
                _a.sent();
                // Đăng ký thành công thì đăng nhập luôn
                res.cookie("token", account.token);
                req.flash("success", "Đăng ký tài khoản thành công!");
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/dashboard"));
                return [2 /*return*/];
        }
    });
}); };
exports.registerPost = registerPost;
