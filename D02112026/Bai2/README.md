# Bài 2: Bán trà sữa

Ứng dụng Vue 3 dùng Vue Router để chuyển giữa danh sách sản phẩm, trang chi tiết và giỏ hàng. Pinia lưu sản phẩm, size, số lượng và tổng tiền trong giỏ.

## Chạy ứng dụng

```sh
npm install
npm run dev
```

## Chức năng

- Xem danh sách trà sữa và mở trang chi tiết.
- Chọn size S, M hoặc L để xem giá tương ứng.
- Thêm món vào giỏ; cùng sản phẩm và size sẽ gộp số lượng.
- Cùng sản phẩm nhưng khác size sẽ tạo dòng riêng.
- Xóa từng dòng, xóa toàn bộ giỏ và xem tổng tiền.
