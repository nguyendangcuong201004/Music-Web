# 🎵 Music-Web — Website Nghe Nhạc Trực Tuyến

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Pug](https://img.shields.io/badge/Pug-A86454?style=for-the-badge&logo=pug&logoColor=white)](https://pugjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

Dự án website nghe nhạc trực tuyến xây dựng theo mô hình **Server-Side Rendering (SSR)** với **Node.js + TypeScript + Express + MongoDB + Pug**, có trang quản trị (admin) để quản lý chủ đề, bài hát, vai trò, và tích hợp **Cloudinary** để upload ảnh / file nhạc.

🔗 **Live Demo:** [https://music-web-eta.vercel.app/topics](https://music-web-eta.vercel.app/topics)

---

## ✨ Tính năng chính

### Phía người dùng (Client)
- 🎧 Xem danh sách chủ đề nhạc (`/topics`) và danh sách bài hát theo chủ đề (`/songs/:slugTopic`)
- ▶️ Trang chi tiết bài hát: nghe nhạc, xem lời bài hát (lyrics)
- ❤️ Thả tim (like) và thêm bài hát vào danh sách yêu thích
- 👀 Đếm lượt nghe bài hát
- 🔍 Tìm kiếm bài hát theo tên (hỗ trợ tìm kiếm không dấu nhờ `unidecode`), có cả trang kết quả và API trả JSON cho gợi ý tìm kiếm
- 🎼 Trang playlist (`/songs/playlist`)

### Phía quản trị (Admin — tiền tố `/admin`)
- 📊 Dashboard tổng quan
- 📁 Quản lý Chủ đề (Topics): thêm / sửa / xóa (xóa mềm), thay đổi trạng thái, upload ảnh lên Cloudinary
- 🎵 Quản lý Bài hát (Songs): thêm / sửa / xóa mềm, thay đổi trạng thái, upload ảnh avatar và file audio lên Cloudinary
- 👥 Quản lý Vai trò (Roles) & phân quyền
- 🖼️ API upload ảnh cho trình soạn thảo TinyMCE

> ⚠️ **Lưu ý:** Dự án hiện **chưa có trang CRUD cho Ca sĩ (Singers)**. Muốn thêm ca sĩ, bạn cần insert trực tiếp vào collection `singers` trên MongoDB (các trường: `fullName`, `avatar`, `status`, `slug`, `deleted`). Khi tạo bài hát trong admin, hệ thống sẽ lấy danh sách ca sĩ từ collection này.

---

## 🛠 Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Runtime | Node.js |
| Ngôn ngữ | TypeScript |
| Framework | Express.js |
| Cơ sở dữ liệu | MongoDB (Mongoose ODM + mongoose-slug-updater) |
| Template Engine | Pug (SSR) |
| Upload file | Multer (memory storage) → Cloudinary |
| Session / Flash | express-session, express-flash, cookie-parser |
| Khác | method-override, streamifier, unidecode, TinyMCE |
| Deploy | Vercel (Serverless Functions) |

### Các model chính (collections trong MongoDB)
| Model | Collection | Mô tả |
|---|---|---|
| `Song` | `songs` | Bài hát: title, avatar, description, singerId, topicId, like, lyrics, audio, slug, listen, status... |
| `Topic` | `topics` | Chủ đề nhạc: title, avatar, description, slug... |
| `Singer` | `singers` | Ca sĩ: fullName, avatar, slug... |
| `Role` | `roles` | Vai trò & quyền hạn |
| `FavoriteSong` | `favorite-songs` | Bài hát yêu thích của người dùng |

---

## 📦 Cài đặt & Chạy dự án local

### Yêu cầu
- **Node.js** >= 18 (khuyến nghị bản LTS)
- **npm**
- Tài khoản **MongoDB Atlas** (miễn phí) và tài khoản **Cloudinary** (miễn phí)

### 1. Clone dự án

```bash
git clone https://github.com/nguyendangcuong201004/Music-Web.git
cd Music-Web
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Setup MongoDB Atlas (database)

1. Truy cập [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → đăng ký tài khoản miễn phí.
2. Tạo một **Cluster** (chọn gói M0 Free).
3. Trong cluster, vào **Database Access** → tạo user (username + password), chọn role **Read and write to any database**.
4. Vào **Network Access** → **Add IP Address** → chọn `0.0.0.0/0` (Allow access from anywhere) để tiện chạy local và deploy lên Vercel.
5. Vào **Database** → **Connect** → chọn **Drivers** (Node.js) → copy **connection string**, dạng:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Sửa connection string: thay `<password>` bằng mật khẩu thật, và **thêm tên database** vào sau `.mongodb.net/`, ví dụ `music-web`:
   ```
   mongodb+srv://cuong:matkhau@cluster0.xxxxx.mongodb.net/music-web?retryWrites=true&w=majority
   ```
   > Database và các collection (`songs`, `topics`, `singers`...) sẽ tự động được tạo khi bạn lưu dữ liệu đầu tiên thông qua ứng dụng (Mongoose).

### 4. Setup Cloudinary (lưu trữ ảnh & file nhạc)

1. Truy cập [cloudinary.com](https://cloudinary.com/) → đăng ký tài khoản miễn phí.
2. Sau khi đăng nhập, vào **Dashboard** (Home) → mục **API Keys** (hoặc Settings → Access Keys).
3. Lấy lại 3 giá trị cần thiết:
   - `Cloud Name`
   - `API Key`
   - `API Secret`
4. Dán các giá trị này vào file `.env` ở bước tiếp theo. Ảnh avatar/thumbnail và file audio khi tạo chủ đề/bài hát trong admin sẽ được upload thẳng lên Cloudinary (dùng `resource_type: "auto"` nên hỗ trợ cả audio).

### 5. Tạo file `.env`

Tạo file `.env` tại thư mục gốc của dự án với nội dung:

```env
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/music-web?retryWrites=true&w=majority
CLOUD_NAME=<cloud_name_cua_ban>
CLOUD_KEY=<api_key_cua_ban>
CLOUD_SECRET=<api_secret_cua_ban>
```

### 6. Build & chạy

```bash
# Biên dịch TypeScript sang JavaScript (xuất ra thư mục dist/)
npx tsc

# Chạy môi trường dev (nodemon + ts-node, tự restart khi sửa code)
npm start
```

Mở trình duyệt truy cập:

| Trang | Đường dẫn |
|---|---|
| Danh sách chủ đề | `http://localhost:3000/topics` |
| Danh sách bài hát theo chủ đề | `http://localhost:3000/songs/:slugChuDe` |
| Chi tiết bài hát | `http://localhost:3000/songs/detail/:slugBaiHat` |
| Playlist | `http://localhost:3000/songs/playlist` |
| Tìm kiếm | `http://localhost:3000/search/result?keyword=tuKhoa` |
| **Trang admin** | `http://localhost:3000/admin/dashboard` |
| Admin - Chủ đề | `http://localhost:3000/admin/topics` |
| Admin - Bài hát | `http://localhost:3000/admin/songs` |
| Admin - Vai trò | `http://localhost:3000/admin/roles` |

> 💡 Thứ tự thao tác gợi ý khi chạy lần đầu: insert ca sĩ vào collection `singers` (do chưa có UI) → vào `/admin/topics` tạo chủ đề → vào `/admin/songs` tạo bài hát → ra client nghe thử.

---

## 🚀 Deploy lên Vercel

Dự án deploy dưới dạng **Vercel Serverless Function** (file `vercel.json` trỏ tới `dist/index.js`). Vì vậy **bắt buộc phải build (`npx tsc`) và commit cả thư mục `dist/`** lên GitHub mỗi khi sửa code TypeScript.

### Các bước

1. Push code (bao gồm thư mục `dist/`) lên GitHub.
2. Truy cập [vercel.com](https://vercel.com/) → **Add New Project** → import repository GitHub của bạn (giữ nguyên các thiết lập mặc định, Vercel sẽ đọc `vercel.json`).
3. ⚠️ **Quan trọng:** vào **Project → Settings → Environment Variables**, thêm các biến sau (vì file `.env` không được commit lên git):

   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `MONGO_URL` | Connection string MongoDB Atlas của bạn |
   | `CLOUD_NAME` | Cloud Name trên Cloudinary |
   | `CLOUD_KEY` | API Key trên Cloudinary |
   | `CLOUD_SECRET` | API Secret trên Cloudinary |

   > `NODE_ENV=production` là bắt buộc: khi biến này được set, server sẽ export app làm Serverless Function thay vì chạy `app.listen()` (chỉ dùng cho local). Thiếu biến này hoặc thiếu `MONGO_URL` sẽ gây lỗi **500 FUNCTION_INVOCATION_FAILED**.
4. Nhấn **Deploy** và chờ hoàn tất.
5. Mỗi lần cập nhật code: chạy `npx tsc` → commit (nhớ gồm cả `dist/`) → push → Vercel tự động redeploy.

---

## 📂 Cấu trúc thư mục

```
Music-Web/
├── config/
│   ├── database.ts        # Kết nối MongoDB (Mongoose)
│   └── system.ts          # Cấu hình chung (tiền tố admin)
├── controllers/
│   ├── admin/             # Controller trang quản trị (dashboard, topics, songs, roles, upload)
│   └── client/            # Controller người dùng (topics, songs, search)
├── helpers/
│   ├── storage.helper.ts  # Bộ nhớ đệm (memoryStorage) cho multer
│   └── uploadToCloudiary.helper.ts # Upload buffer lên Cloudinary qua stream
├── middlewares/
│   └── admin/uploadCloud.middleware.ts # Middleware upload file lên Cloudinary
├── models/
│   ├── song.model.ts      # Model bài hát
│   ├── topic.model.ts     # Model chủ đề
│   ├── singer.mode.ts     # Model ca sĩ
│   ├── role.model.ts      # Model vai trò
│   └── favorite-song.model.ts # Model bài hát yêu thích
├── routes/
│   ├── client/            # Route client: /topics, /songs, /search
│   └── admin/             # Route admin: /admin/dashboard|topics|roles|songs|upload
├── views/
│   ├── client/            # Giao diện pug phía người dùng
│   └── admin/             # Giao diện pug phía quản trị
├── public/                # Static assets (css, js, images)
├── dist/                  # Code đã biên dịch (deploy lên Vercel)
├── index.ts               # Điểm khởi tạo app Express
├── vercel.json            # Cấu hình deploy Vercel
└── tsconfig.json          # Cấu hình TypeScript
```

---

## 👨‍💻 Tác giả

- **Nguyễn Đặng Cường** — [GitHub](https://github.com/nguyendangcuong201004)

---

## 📄 License

Dự án được phát hành theo giấy phép [ISC](https://opensource.org/licenses/ISC).
