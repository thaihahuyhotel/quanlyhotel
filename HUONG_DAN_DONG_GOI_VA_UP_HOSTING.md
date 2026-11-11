# HƯỚNG DẪN SỬA LỖI MÀN HÌNH TRẮNG & ĐƯA LÊN GITHUB PAGES / HOSTING

---

## 🔍 NGUYÊN NHÂN BỊ MÀN HÌNH TRẮNG TINH TRÊN GITHUB

Khi đưa một ứng dụng React / Vite lên GitHub Pages, màn hình bị trắng tinh là do:
1. **Lỗi đường dẫn tuyệt đối (`/assets/...`)**: 
   - Địa chỉ GitHub Pages luôn có dạng: `https://ten-ban.github.io/ten-kho-repo/` (nằm trong thư mục con).
   - Trước đó, file HTML gọi script ở `/assets/index.js`, khiến trình duyệt tìm ở `https://ten-ban.github.io/assets/index.js` (thiếu `ten-kho-repo`) ➔ Bị lỗi **404 Not Found** không tải được JavaScript ➔ **Màn hình trắng tinh**.
2. **Cơ chế Jekyll của GitHub**: Mặc định GitHub Pages chạy bộ lọc Jekyll và chặn một số thư mục chứa tài nguyên.

---

## ✅ CÁC ĐIỀU CHỈNH ĐÃ ĐƯỢC XỬ LÝ TRIỆT ĐỂ:

1. **Chuyển toàn bộ đường dẫn sang tương đối (`./assets/...`)** bằng cấu hình `base: './'` trong `vite.config.ts`. Bây giờ web chạy được ở **bất kỳ tên miền hoặc thư mục con nào trên GitHub mà không bao giờ bị trắng màn hình**.
2. **Tạo sẵn file `.nojekyll`**: Vô hiệu hóa Jekyll để GitHub nạp đầy đủ file CSS, JS.
3. **Tạo sẵn file `404.html`**: Đảm bảo khi bấm tải lại trang (F5) không bị lỗi 404 của GitHub.
4. **Cấu hình sẵn GitHub Actions (`.github/workflows/deploy.yml`)**: Tự động build và deploy lên GitHub Pages chỉ với 1 click.

---

## 🚀 2 CÁCH ĐƯA LÊN GITHUB PAGES HOẠT ĐỘNG 100%:

### CÁCH 1: Dùng Gói `hotel25-dist.zip` Mới (Đơn giản nhất, không cần cài Node.js)
1. Bấm nút màu xanh **[📥 Tải Gói Hosting (ZIP)]** ở góc trên màn hình để tải file `hotel25-dist.zip` vừa được cập nhật.
2. Giải nén file `hotel25-dist.zip` trên máy tính của bạn. Bên trong sẽ có:
   - `index.html` (đã sửa đường dẫn thành `./assets/...`)
   - `404.html`
   - `.nojekyll`
   - Thư mục `assets/`
3. Tạo một repository mới trên GitHub (ví dụ đặt tên là `hotel25`).
4. Bấm **Upload files** và kéo thả toàn bộ các file vừa giải nén ở trên lên GitHub (vào nhánh `main`).
5. Vào **Settings** của repository ➔ Tìm mục **Pages** (cột bên trái):
   - **Source**: Chọn `Deploy from a branch`
   - **Branch**: Chọn `main`, thư mục `/ (root)`
   - Bấm **Save**.
6. Đợi 1-2 phút, GitHub Pages sẽ hiển thị đường link `https://<ten-ban>.github.io/hotel25/`. Mở ra ứng dụng hoạt động mượt mà, đầy đủ giao diện!

---

### CÁCH 2: Đẩy Toàn Bộ Mã Nguồn Lên GitHub & Dùng GitHub Actions
Nếu bạn dùng Git đẩy cả thư mục dự án lên GitHub:
1. Đẩy mã nguồn lên nhánh `main`.
2. Vào **Settings** của repository ➔ Vào mục **Pages**:
   - Tại mục **Build and deployment > Source**, đổi từ `Deploy from a branch` sang **`GitHub Actions`**.
3. File cấu hình `.github/workflows/deploy.yml` đã được tạo sẵn trong dự án sẽ tự động chạy quy trình build và đưa trang web lên GitHub Pages hoàn toàn tự động mỗi khi bạn push code.

---

## 🌐 NẾU ĐƯA LÊN HOSTING CPANEL / HOSTINGER / AZDIGI:
- Tải file `hotel25-dist.zip` lên thư mục `public_html`.
- Bấm **Extract (Giải nén)**.
- Mở tên miền là website chạy ngay lập tức với file `.htaccess` tự động điều hướng.
