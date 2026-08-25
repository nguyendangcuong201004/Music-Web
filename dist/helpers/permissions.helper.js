"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAFF_PERMISSIONS = exports.ALL_PERMISSIONS = void 0;
// Danh sách toàn bộ quyền của hệ thống (dành cho quản trị viên cao nhất)
exports.ALL_PERMISSIONS = [
    "topics_view", "topics_create", "topics_edit", "topics_delete",
    "songs_view", "songs_create", "songs_edit", "songs_delete",
    "singers_view", "singers_create", "singers_edit", "singers_delete",
    "roles_view", "roles_create", "roles_edit", "roles_permissions", "roles_delete",
    "accounts_view", "accounts_create", "accounts_edit", "accounts_delete",
    "settings_view", "settings_edit",
];
// Quyền mặc định cho các tài khoản admin đăng ký sau
// (chỉ CRUD chủ đề, bài hát, ca sĩ - không phân quyền, không quản lý admin khác)
exports.STAFF_PERMISSIONS = [
    "topics_view", "topics_create", "topics_edit", "topics_delete",
    "songs_view", "songs_create", "songs_edit", "songs_delete",
    "singers_view", "singers_create", "singers_edit", "singers_delete",
];
