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
exports.deleteAccount = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.changeStatus = exports.index = void 0;
var account_model_1 = __importDefault(require("../../models/account.model"));
var role_model_1 = __importDefault(require("../../models/role.model"));
var system_1 = require("../../config/system");
var hashPassword_helper_1 = require("../../helpers/hashPassword.helper");
var auth_middleware_1 = require("../../middlewares/admin/auth.middleware");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, accounts, roles, roleMap, _i, accounts_1, account;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "accounts_view")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Promise.all([
                        account_model_1.default.find({ deleted: false }),
                        role_model_1.default.find({ deleted: false }),
                    ])];
            case 1:
                _a = _c.sent(), accounts = _a[0], roles = _a[1];
                roleMap = new Map(roles.map(function (role) { return [role.id, role]; }));
                for (_i = 0, accounts_1 = accounts; _i < accounts_1.length; _i++) {
                    account = accounts_1[_i];
                    account["role"] = ((_b = roleMap.get(account.roleId)) === null || _b === void 0 ? void 0 : _b.title) || "";
                }
                res.render("admin/pages/accounts/index.pug", {
                    pageTitle: "Tài khoản admin",
                    accounts: accounts
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var changeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, accountId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "accounts_edit")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                status = req.params.status;
                accountId = req.params.accountId;
                return [4 /*yield*/, account_model_1.default.updateOne({
                        _id: accountId,
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
    var roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "accounts_create")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, role_model_1.default.find({
                        deleted: false,
                    })];
            case 1:
                roles = _a.sent();
                res.render("admin/pages/accounts/create.pug", {
                    pageTitle: "T\u1EA1o t\u00E0i kho\u1EA3n admin",
                    roles: roles
                });
                return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var emailExists, accountObject, account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "accounts_create")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, account_model_1.default.findOne({
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
                accountObject = {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: (0, hashPassword_helper_1.hashPassword)(req.body.password),
                    phone: req.body.phone,
                    avatar: req.body.avatar,
                    roleId: req.body.roleId,
                    status: req.body.status,
                    createdBy: res.locals.user.id,
                };
                account = new account_model_1.default(accountObject);
                return [4 /*yield*/, account.save()];
            case 2:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 th\u00EAm t\u00E0i kho\u1EA3n ".concat(accountObject.fullName, " th\u00E0nh c\u00F4ng!"));
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/accounts"));
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accountId, account, roles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "accounts_edit")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                accountId = req.params.accountId;
                return [4 /*yield*/, account_model_1.default.findOne({
                        _id: accountId,
                        deleted: false,
                    })];
            case 1:
                account = _a.sent();
                return [4 /*yield*/, role_model_1.default.find({
                        deleted: false,
                    })];
            case 2:
                roles = _a.sent();
                res.render("admin/pages/accounts/edit.pug", {
                    pageTitle: "Ch\u1EC9nh s\u1EEDa t\u00E0i kho\u1EA3n admin",
                    account: account,
                    roles: roles
                });
                return [2 /*return*/];
        }
    });
}); };
exports.edit = edit;
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accountId, emailExists, accountObject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "accounts_edit")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                accountId = req.params.accountId;
                return [4 /*yield*/, account_model_1.default.findOne({
                        _id: { $ne: accountId },
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
                accountObject = {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    phone: req.body.phone,
                    avatar: req.body.avatar,
                    roleId: req.body.roleId,
                    status: req.body.status,
                };
                // Chỉ cập nhật mật khẩu khi người dùng nhập mới
                if (req.body.password) {
                    accountObject.password = (0, hashPassword_helper_1.hashPassword)(req.body.password);
                }
                accountObject.updatedBy = res.locals.user.id;
                return [4 /*yield*/, account_model_1.default.updateOne({
                        _id: accountId,
                        deleted: false,
                    }, accountObject)];
            case 2:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 c\u1EADp nh\u1EADt t\u00E0i kho\u1EA3n th\u00E0nh c\u00F4ng!");
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.editPatch = editPatch;
var deleteAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accountId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "accounts_delete")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                accountId = req.params.accountId;
                return [4 /*yield*/, account_model_1.default.updateOne({
                        _id: accountId,
                    }, {
                        deleted: true,
                        deletedAt: new Date(),
                        deletedBy: res.locals.user.id,
                    })];
            case 1:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 x\u00F3a t\u00E0i kho\u1EA3n th\u00E0nh c\u00F4ng!");
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.deleteAccount = deleteAccount;
