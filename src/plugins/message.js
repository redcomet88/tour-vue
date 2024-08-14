import { Message } from 'element-ui';

const MessagePlugin = {
    install(Vue) {
        Vue.prototype.$message = function(response, duration = 2000) {
            const messageType = response.data.code === 0 ? 'success' : 'error';

            Message({
                message: response.data.message,
                type: messageType,
                duration: duration
            });
        };
    }
};

export default MessagePlugin;
