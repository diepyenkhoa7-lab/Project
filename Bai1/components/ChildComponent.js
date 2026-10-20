export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },

  emits: ['send-message'],

  data() {
    return {
      localMessage: ''
    }
  },

  watch: {
    message(newValue) {
      this.localMessage = newValue
    }
  },

  methods: {
    sendMessageToParent() {
      this.$emit('send-message', 'Hello from Child!')
    }
  },

  template: `
    <div>
      <h2>Child Component</h2>

      <p>Message from parent: {{ message }}</p>

      <button @click="sendMessageToParent">
        Send Message to Parent
      </button>
    </div>
  `
}
