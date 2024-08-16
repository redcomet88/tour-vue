import { Message } from 'element-ui';

const MessagePlugin = {
    install(Vue) {
        Vue.prototype.$message = function(response, type='success', duration = 2000,) {
            let message;
            let messageType;

            // 检查 response.data 是否存在
            if (response.data) {
                message = response.data.message;
                messageType = response.data.code === 0 ? 'success' : 'error';
            } else {
                // 如果 response.data 不存在，直接使用 response
                message = response || '未知错误';
                messageType = type || 'error'; // 使用传入的类型或者默认为 'error'
            }

            // 显示消息
            Message({
                message: message,
                type: messageType,
                duration: duration
            });
        };
    }
};

export default MessagePlugin;
