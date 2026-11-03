import { createStore } from 'vuex'

export default createStore({
  state: () => ({ modalOpen: false, editingProductId: null }),
  mutations: {
    openAdd(state) {
      state.modalOpen = true
      state.editingProductId = null
    },
    openEdit(state, productId) {
      state.modalOpen = true
      state.editingProductId = productId
    },
    closeModal(state) {
      state.modalOpen = false
      state.editingProductId = null
    },
  },
})
