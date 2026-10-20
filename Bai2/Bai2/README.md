# Bài 2 — Ứng dụng quản lý công việc

Ứng dụng Vue 3 dùng Vite để thêm, đánh dấu hoàn thành, lọc và xóa công việc. Danh sách được lưu trong `localStorage` của trình duyệt.

## Chạy ứng dụng

Mở terminal tại thư mục `Bai2/Bai2`, sau đó chạy:

```bash
npm run dev
```

## Cấu trúc component

- `App.vue`: component gốc của ứng dụng.
- `components/ParentComponent.vue`: quản lý danh sách, trạng thái và bộ lọc; dùng `watch` để lưu dữ liệu và cập nhật giao diện.
- `components/ChildComponent.vue`: nhận danh sách qua `props`, phát sự kiện `add-task` để yêu cầu component cha thêm công việc.
- `vite.config.js`: bật hỗ trợ Single File Component (`.vue`) cho Vite.
