<template>
  <el-card>
    <div class="chat-box" ref="chatBox">
      <div v-for="(msg, index) in messages" :key="index" class="message">
        <div v-if="msg.type === 'user'" class="user-message">
          <img src="https://via.placeholder.com/40" alt="User" class="avatar" />
          <div class="message-content user-message-content">{{ msg.content }}</div>
        </div>
        <div v-if="msg.type === 'bot'" class="bot-message">
          <img src="https://via.placeholder.com/40" alt="Bot" class="avatar" />
          <div class="message-content bot-message-content">{{ msg.content }}</div>
        </div>
      </div>
    </div>
    <div class="input-area">
      <el-input
          v-model="input"
          placeholder="Type your message..."
          @keyup.enter="sendMessage"
          class="input-field"
          :style="{ maxWidth: 'calc(100% - 100px)' }"
      ></el-input>
      <el-button type="primary" @click="sendMessage">Send</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      messages: []
    };
  },
  methods: {
    sendMessage() {
      if (this.input.trim() === '') return;

      this.messages.push({ type: 'user', content: this.input });
      const userInput = this.input;
      this.input = '';

      setTimeout(() => {
        this.messages.push({ type: 'bot', content: `
        You said: ${userInput}
        You said: ${userInput}
        You said: ${userInput}
        You said: ${userInput}
        You said: ${userInput}
        You said: ${userInput}
数据简介：本数据包括街道ID、交通指数、通过样本总行驶长度(m) 、平均行程车速（km/h）、通过样本总行程时间(s) 、 时间、时间片等7个字段。

注：交通指数：越大越拥堵，划分五个等级，0-2 畅通，2-4 基本畅通，4-6 缓行，6-8 较拥堵，8-10 拥堵。时间片：一个时间片是5分钟。


        ` });
        this.scrollToBottom();
      }, 500);

      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
      });
    }
  }
};
</script>

<style scoped>
.chat-box {
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  border-bottom: 1px solid #dcdfe6;
}
.input-area {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.message {
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.user-message, .bot-message {
  display: flex;
  align-items: center;
}
.avatar {
  border-radius: 50%;
  margin-right: 10px;
}
.input-field {
  flex: 1;
  margin-right: 10px;
  max-width: calc(100% - 100px);
}
.message-content {
  max-width: 100%; /* 确保消息内容框不超过聊天框宽度 */
  background-color: #f0f0f0; /* 随意选择背景颜色 */
  border-radius: 5px; /* 圆角 */
  padding: 10px; /* 内边距 */
  overflow-wrap: break-word; /* 使长文本换行 */
  white-space: normal; /* 允许文本在标签内换行 */
  word-wrap: break-word; /* 兼容旧版浏览器 */
}
.user-message-content {
  background-color: #d1e7dd; /* 用户消息的背景颜色 */
}
.bot-message-content {
  background-color: #cfe2ff; /* 机器人消息的背景颜色 */
}
</style>
