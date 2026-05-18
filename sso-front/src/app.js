import { notification } from 'antd'

export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error('统一异常处理：', e.message);

      // notification.error({
      //   message: "Error",
      //   description: e.message,
      // });
    },
  },
};
