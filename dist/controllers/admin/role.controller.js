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
exports.permissionsPatch = exports.permissions = exports.deleteRole = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.detail = exports.index = void 0;
var role_model_1 = __importDefault(require("../../models/role.model"));
var account_model_1 = __importDefault(require("../../models/account.model"));
var system_1 = require("../../config/system");
var auth_middleware_1 = require("../../middlewares/admin/auth.middleware");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, records, accounts, accountCountMap, _i, accounts_1, account, creatorMap, _b, records_1, record;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "roles_view")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Promise.all([
                        role_model_1.default.find({ deleted: false }),
                        account_model_1.default.find({ deleted: false }),
                    ])];
            case 1:
                _a = _d.sent(), records = _a[0], accounts = _a[1];
                accountCountMap = new Map();
                for (_i = 0, accounts_1 = accounts; _i < accounts_1.length; _i++) {
                    account = accounts_1[_i];
                    accountCountMap.set(account.roleId, (accountCountMap.get(account.roleId) || 0) + 1);
                }
                creatorMap = new Map(accounts.map(function (account) { return [account.id, account]; }));
                for (_b = 0, records_1 = records; _b < records_1.length; _b++) {
                    record = records_1[_b];
                    record["countAccount"] = accountCountMap.get(record.id) || 0;
                    record["creator"] = ((_c = creatorMap.get(record.createdBy)) === null || _c === void 0 ? void 0 : _c.fullName) || "";
                }
                res.render("admin/pages/roles/index.pug", {
                    pageTitle: "Nh\u00F3m quy\u1EC1n",
                    records: records
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleId, record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                roleId = req.params.roleId;
                return [4 /*yield*/, role_model_1.default.findOne({
                        _id: roleId,
                        deleted: false,
                    })];
            case 1:
                record = _a.sent();
                res.render("admin/pages/roles/detail.pug", {
                    pageTitle: "Chi ti\u1EBFt nh\u00F3m quy\u1EC1n",
                    record: record
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detail = detail;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!(0, auth_middleware_1.checkPermission)(res, "roles_create")) {
            (0, auth_middleware_1.notPermission)(res);
            return [2 /*return*/];
        }
        res.render("admin/pages/roles/create.pug", {
            pageTitle: "Spotify's Roles"
        });
        return [2 /*return*/];
    });
}); };
exports.create = create;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleObject, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "roles_create")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                roleObject = {
                    title: req.body.title,
                    description: req.body.description,
                };
                role = new role_model_1.default(roleObject);
                return [4 /*yield*/, role.save()];
            case 1:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 th\u00EAm nh\u00F3m quy\u1EC1n ".concat(roleObject.title, " th\u00E0nh c\u00F4ng!"));
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/roles"));
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleId, record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "roles_edit")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                roleId = req.params.roleId;
                return [4 /*yield*/, role_model_1.default.findOne({
                        _id: roleId,
                        deleted: false,
                    })];
            case 1:
                record = _a.sent();
                res.render("admin/pages/roles/edit.pug", {
                    pageTitle: "Spotify's Roles",
                    record: record
                });
                return [2 /*return*/];
        }
    });
}); };
exports.edit = edit;
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleId, roleObject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "roles_edit")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                roleId = req.params.roleId;
                roleObject = {
                    title: req.body.title,
                    description: req.body.description,
                };
                return [4 /*yield*/, role_model_1.default.updateOne({
                        _id: roleId,
                        deleted: false,
                    }, roleObject)];
            case 1:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 c\u1EADp nh\u1EADt nh\u00F3m quy\u1EC1n th\u00E0nh c\u00F4ng!");
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.editPatch = editPatch;
var deleteRole = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "roles_delete")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                roleId = req.params.roleId;
                return [4 /*yield*/, role_model_1.default.updateOne({
                        _id: roleId,
                    }, {
                        deleted: true,
                        deletedAt: new Date(),
                    })];
            case 1:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 x\u00F3a nh\u00F3m quy\u1EC1n th\u00E0nh c\u00F4ng!");
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.deleteRole = deleteRole;
var permissions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var records;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, role_model_1.default.find({
                    deleted: false,
                })];
            case 1:
                records = _a.sent();
                res.render("admin/pages/roles/permissions.pug", {
                    pageTitle: "Ph\u00E2n quy\u1EC1n",
                    records: records
                });
                return [2 /*return*/];
        }
    });
}); };
exports.permissions = permissions;
var permissionsPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roles, _i, roles_1, item, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "roles_permissions")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                roles = JSON.parse(req.body.roles);
                _i = 0, roles_1 = roles;
                _a.label = 2;
            case 2:
                if (!(_i < roles_1.length)) return [3 /*break*/, 5];
                item = roles_1[_i];
                return [4 /*yield*/, role_model_1.default.updateOne({
                        _id: item.id,
                        deleted: false
                    }, {
                        permissions: item.permissions
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                req.flash('success', "Spotify \u0111\u00E3 c\u1EADp nh\u1EADt ph\u00E2n quy\u1EC1n th\u00E0nh c\u00F4ng!");
                res.redirect("back");
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                req.flash('error', "C\u1EADp nh\u1EADt ph\u00E2n quy\u1EC1n th\u1EA5t b\u1EA1i!");
                res.redirect("back");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.permissionsPatch = permissionsPatch;
