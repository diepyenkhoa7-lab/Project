<script setup>
import { ref } from 'vue'

const products = ref([
  {
   id: 1,
    title: 'Mắt Biếc',
    code: 'NNA-001',
    releaseDate: '1990',
    description: 'Chuyện tình đơn phương trong sáng nhưng trầm buồn của Ngạn dành cho Hà Lan.',
    price: 110000,
    starRating: 4.9,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JXc-D83XbjPq3u9lPzfq20AlIsEmASD1H5MvC4ZmKQ&s=10'
  },
  {
     id: 2,
    title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
    code: 'NNA-002',
    releaseDate: '2010',
    description: 'Những ký ức tuổi thơ êm đềm, ngọt ngào và gian khó của anh em Thiều và Tường.',
    price: 125000,
    starRating: 4.8,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQiZffMqrhfFFW2Xnd4p6fjllJ2Xa1xapXGEqrbQamqg&s=10'
  },
  {
     id: 3,
    title: 'Cho Tôi Xin Một Vé Đi Tuổi Thơ',
    code: 'NNA-003',
    releaseDate: '2008',
    description: 'Tấm vé quay ngược thời gian đưa người đọc trở về thế giới hồn nhiên của trẻ thơ.',
    price: 98000,
    starRating: 4.9,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIkK1SeIa6v5koZ2n_ecbcJ2dt0k0agCYfVlmkLpBC7A&s=10'
  },
  {
    id: 4,
    title: 'Kính Vạn Hoa',
    code: 'NNA-004',
    releaseDate: '1995',
    description: 'Bộ truyện học trò đầy hài hước và ly kỳ về bộ ba Quý róm, Hạnh và Tiểu Long.',
    price: 85000,
    starRating: 4.7,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1awwlsEzyJHePcOfLFDF9daKVEygeYgZjgMGe1nup6g&s=10'
  },
  {
     id: 5,
    title: 'Cô Gái Đến Từ Hôm Qua',
    code: 'NNA-005',
    releaseDate: '1989',
    description: 'Những câu chuyện rắc rối, dở khóc dở cười của tuổi học trò ngây thơ.',
    price: 105000,
    starRating: 4.6,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmF5xYkYYWdytRUsxxlCf297Nheb5ngo0JRp9jhsWNfA&s=10'
  }
])
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Product</th>
          <th>Code</th>
          <th>Available</th>
          <th>Price</th>
          <th>5 star rating</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="center img-col">
            <img :src="item.imageUrl" :alt="item.title" class="product-img" />
          </td>

          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.releaseDate }}</td>
          <td class="right">{{ item.price.toLocaleString('vi-VN') }} đ</td>
          <td class="rating-cell">
            <span class="rating-stars" :aria-label="`${item.starRating} trên 5 sao`">
              <span v-for="star in 5" :key="star" class="star">★</span>
            </span>
            <span class="rating-value">{{ item.starRating }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
}

th, td {
  border: 1px solid #e0e0e0;
  padding: 10px;
  vertical-align: middle;
  font-size: 14px;
  color: #333;
}

th {
  font-weight: bold;
  text-align: center;
  background-color: #ffffff;
}

/* Thu gọn ô chứa ảnh */
.img-col {
  width: 65px;
  padding: 6px !important;
  vertical-align: middle;
}

/* Kích thước ảnh chuẩn tỉ lệ dạng bìa sách (Dọc) */
.product-img {
  width: 48px;
  aspect-ratio: 3 / 4;
  height: auto;
  object-fit: cover;
  border-radius: 3px;
  display: block;
  margin: 0 auto;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}

.rating-cell {
  white-space: nowrap;
  text-align: center;
}

.rating-stars {
  display: inline-flex;
  gap: 2px;
  color: #f5a623;
}

.star {
  line-height: 1;
}

.rating-value {
  margin-left: 6px;
}
</style>