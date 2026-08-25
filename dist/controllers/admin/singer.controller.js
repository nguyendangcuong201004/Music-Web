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
exports.deleteSinger = exports.editPatch = exports.edit = exports.createPost = exports.create = exports.detail = exports.changeStatus = exports.index = void 0;
var singer_mode_1 = __importDefault(require("../../models/singer.mode"));
var song_model_1 = __importDefault(require("../../models/song.model"));
var system_1 = require("../../config/system");
var auth_middleware_1 = require("../../middlewares/admin/auth.middleware");
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var singers, _i, singers_1, singer, countSong;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, singer_mode_1.default.find({
                    deleted: false,
                })];
            case 1:
                singers = _a.sent();
                _i = 0, singers_1 = singers;
                _a.label = 2;
            case 2:
                if (!(_i < singers_1.length)) return [3 /*break*/, 5];
                singer = singers_1[_i];
                return [4 /*yield*/, song_model_1.default.countDocuments({
                        singerId: singer.id,
                        deleted: false,
                    })];
            case 3:
                countSong = _a.sent();
                singer["countSong"] = countSong;
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                res.render("admin/pages/singers/index.pug", {
                    pageTitle: "Quản lý ca sĩ",
                    singers: singers
                });
                return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var changeStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, singerId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "singers_edit")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                status = req.params.status;
                singerId = req.params.singerId;
                return [4 /*yield*/, singer_mode_1.default.updateOne({
                        _id: singerId,
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
var detail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var singerId, singer, songs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                singerId = req.params.singerId;
                return [4 /*yield*/, singer_mode_1.default.findOne({
                        _id: singerId,
                        deleted: false,
                    })];
            case 1:
                singer = _a.sent();
                return [4 /*yield*/, song_model_1.default.find({
                        singerId: singerId,
                        deleted: false,
                    })];
            case 2:
                songs = _a.sent();
                res.render("admin/pages/singers/detail.pug", {
                    pageTitle: 'Spotify Singers',
                    singer: singer,
                    songs: songs
                });
                return [2 /*return*/];
        }
    });
}); };
exports.detail = detail;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!(0, auth_middleware_1.checkPermission)(res, "singers_create")) {
            (0, auth_middleware_1.notPermission)(res);
            return [2 /*return*/];
        }
        res.render("admin/pages/singers/create.pug", {
            pageTitle: "Spotify's Singers"
        });
        return [2 /*return*/];
    });
}); };
exports.create = create;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var singerObject, singer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "singers_create")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                singerObject = {
                    fullName: req.body.fullName,
                    avatar: req.body.avatar,
                    status: req.body.status,
                };
                singer = new singer_mode_1.default(singerObject);
                return [4 /*yield*/, singer.save()];
            case 1:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 th\u00EAm ca s\u0129 ".concat(singerObject.fullName, " th\u00E0nh c\u00F4ng!"));
                res.redirect("/".concat(system_1.systemConfig.prefixAdmin, "/singers"));
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var singerId, singer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "singers_edit")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                singerId = req.params.singerId;
                return [4 /*yield*/, singer_mode_1.default.findOne({
                        _id: singerId,
                        deleted: false,
                    })];
            case 1:
                singer = _a.sent();
                res.render("admin/pages/singers/edit.pug", {
                    pageTitle: "Spotify's Singers",
                    singer: singer
                });
                return [2 /*return*/];
        }
    });
}); };
exports.edit = edit;
var editPatch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var singerId, singerObject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "singers_edit")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                singerId = req.params.singerId;
                singerObject = {
                    fullName: req.body.fullName,
                    avatar: req.body.avatar,
                    status: req.body.status,
                };
                return [4 /*yield*/, singer_mode_1.default.updateOne({
                        _id: singerId,
                        deleted: false,
                    }, singerObject)];
            case 1:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 c\u1EADp nh\u1EADt ca s\u0129 th\u00E0nh c\u00F4ng!");
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.editPatch = editPatch;
var deleteSinger = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var singerId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(0, auth_middleware_1.checkPermission)(res, "singers_delete")) {
                    (0, auth_middleware_1.notPermission)(res);
                    return [2 /*return*/];
                }
                singerId = req.params.singerId;
                return [4 /*yield*/, singer_mode_1.default.updateOne({
                        _id: singerId,
                    }, {
                        deleted: true,
                        deletedAt: new Date(),
                    })];
            case 1:
                _a.sent();
                req.flash('success', "Spotify \u0111\u00E3 x\u00F3a ca s\u0129 th\u00E0nh c\u00F4ng!");
                res.redirect("back");
                return [2 /*return*/];
        }
    });
}); };
exports.deleteSinger = deleteSinger;
