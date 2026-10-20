import ChildComponent from './ChildComponent.js'

export default {
  components: {
    ChildComponent
  },

  data() {
    return {
      messageFromParent: 'Hello from Parent!',
      messageFromChild: ''
    }
  },

  methods: {
    receiveMessage(message) {
      this.messageFromChild = message
    }
  },

  template: `
    <div style="font-family: Arial; padding: 20px;">
      <h1>Parent Component</h1>

      <ChildComponent
        :message="messageFromParent"
        @send-message="receiveMessage"
      />

      <p>{{ messageFromChild }}</p>
    </div>
  `
}
