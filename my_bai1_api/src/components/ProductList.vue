<template>
  <div class="product-manager">
    <h1>Product Manager</h1>

    <!-- Form Thêm / Cập nhật sản phẩm -->
    <div class="form-container">
      <div class="input-group">
        <input type="text" v-model="form.id" placeholder="ID" :disabled="isEditing" />
        <input type="text" v-model="form.name" placeholder="Name" />
        <input type="number" v-model.number="form.quantity" placeholder="Quantity" />
        <input type="number" v-model.number="form.price" placeholder="Price" />
        <input type="text" v-model="form.description" placeholder="Description" />
        <input type="text" v-model="form.image" placeholder="Image URL" />
        
        <button v-if="!isEditing" class="action-btn" @click="addProduct">Add Product</button>
        <button v-else class="action-btn" @click="updateProduct">Update Product</button>
      </div>

      <div class="delete-all-wrapper">
        <button class="delete-all-btn" @click="deleteAllProducts">Delete All Products</button>
      </div>
    </div>

    <!-- Danh sách sản phẩm dạng thẻ -->
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image || 'https://via.placeholder.com/100'" :alt="product.name" class="product-img" />
        
        <div class="product-info">
          <p><strong>ID: {{ product.id }}</strong></p>
          <p>Name: {{ product.name }}</p>
          <p>Quantity: {{ product.quantity }}</p>
          <p>Price: ${{ product.price }}</p>
          <p>Description: {{ product.description }}</p>
        </div>

        <div class="card-actions">
          <button @click="editProduct(product)">Edit</button>
          <button @click="deleteProduct(product.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductManager',
  data() {
    return {
      isEditing: false,
      form: {
        id: '',
        name: '',
        quantity: 0,
        price: 0,
        description: '',
        image: ''
      },
      products: [
        {
          id: 1,
          name: 'Trà Thạch Đào',
          quantity: 10,
          price: 100,
          description: 'Description 1',
          image: 'https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/CLASSIC_PHIN_FREEZE.jpg'
        },
        {
          id: 2,
          name: 'Freeze Trà Xanh',
          quantity: 5,
          price: 200,
          description: 'Description 2',
          image: 'https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/FREEZE_TRA_XANH.jpg'
        },
        {
          id: 3,
          name: 'cà phê sữa',
          quantity: 3,
          price: 6,
          description: 'béo',
          image: 'https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/FREEZE_COOKIES.jpg'
        }
      ]
    };
  },
  methods: {
    // 1. Thêm sản phẩm mới
    addProduct() {
      if (!this.form.id || !this.form.name) {
        alert('Vui lòng nhập đầy đủ thông tin ID và Name!');
        return;
      }
      
      const exists = this.products.some(p => String(p.id) === String(this.form.id));
      if (exists) {
        alert('ID sản phẩm đã tồn tại!');
        return;
      }

      this.products.push({ ...this.form });
      this.resetForm();
    },

    // 2. Chuẩn bị dữ liệu khi bấm nút Edit[cite: 3]
    editProduct(product) {
      this.isEditing = true;
      this.form = { ...product };
    },

    // 3. Cập nhật sản phẩm
    updateProduct() {
      const index = this.products.findIndex(p => String(p.id) === String(this.form.id));
      if (index !== -1) {
        this.products.splice(index, 1, { ...this.form });
      }
      this.resetForm();
    },

    // 4. Xóa một sản phẩm theo ID
    deleteProduct(id) {
      this.products = this.products.filter(p => p.id !== id);
      if (this.isEditing && String(this.form.id) === String(id)) {
        this.resetForm();
      }
    },

    // 5. Xóa tất cả sản phẩm[cite: 4]
    deleteAllProducts() {
      if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm?')) {
        this.products = [];
        this.resetForm();
      }
    },

    // Reset các trường nhập liệu
    resetForm() {
      this.isEditing = false;
      this.form = {
        id: '',
        name: '',
        quantity: 0,
        price: 0,
        description: '',
        image: ''
      };
    }
  }
};
</script>

<style scoped>
.product-manager {
  font-family: Arial, sans-serif;
  padding: 20px;
  color: #333;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

/* Thanh Form nằm ngang */
.form-container {
  margin-bottom: 25px;
}

.input-group {
  display: flex;
  gap: 0;
  margin-bottom: 5px;
}

.input-group input {
  border: 1px solid #ccc;
  padding: 6px 8px;
  font-size: 0.85rem;
  outline: none;
}

.input-group input[placeholder="ID"] { width: 120px; }
.input-group input[placeholder="Name"] { width: 150px; }
.input-group input[placeholder="Quantity"] { width: 70px; }
.input-group input[placeholder="Price"] { width: 100px; }
.input-group input[placeholder="Description"] { width: 180px; }
.input-group input[placeholder="Image URL"] { width: 160px; }

.action-btn {
  border: 1px solid #999;
  background-color: #eee;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 0.85rem;
}

.action-btn:hover {
  background-color: #ddd;
}

.delete-all-wrapper {
  margin-top: 4px;
}

.delete-all-btn {
  border: 1px solid #999;
  background-color: #fff;
  padding: 4px 10px;
  font-size: 0.8rem;
  cursor: pointer;
}

.delete-all-btn:hover {
  background-color: #f0f0f0;
}

/* Lưới thẻ sản phẩm[cite: 2, 3, 4] */
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 15px;
  width: 150px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-img {
  width: 60px;
  height: 75px;
  object-fit: contain;
  margin-bottom: 10px;
}

.product-info p {
  margin: 2px 0;
  font-size: 0.82rem;
}

.card-actions {
  margin-top: 8px;
  display: flex;
  gap: 4px;
}

.card-actions button {
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  padding: 3px 8px;
  font-size: 0.75rem;
  border-radius: 3px;
  cursor: pointer;
}

.card-actions button:hover {
  background-color: #e5e5e5;
}
</style>