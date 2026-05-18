import request from '../utils/request';
import { message } from 'antd';
import { isJSON } from 'utils';

/**
 * 通用的service
 */

//获取当前用户信息
export function queryCurrentUser() {
  return request({
    url: '/service/sso-service/sso/user/getInfo',
    method: "GET"
  });
}

//修改当前用户信息
export function updateCurrentUser(values) {
  return request({
    url: '/service/sso-service/sso/user/updUserBasicInfo',
    method: "PUT",
    data: values
  });
}

//查询所有企业信息列表
export function getAllCompanies() {
  return request({
    url: '/service/sso-service/sso/enterprise/getAll',
    method: "GET"
  });
}

//校验手机号
export function checkMobile(values) {
  return request({
    url: '/service/sso-service/sso/register/validatePhone',
    method: 'GET',
    data: values
  });
}

//校验邮箱，判断邮箱是否已被注册
export function checkEmail(values) {
  return request({
    url: '/service/sso-service/sso/register/validateEmail',
    method: 'POST',
    data: values
  });
}

export function logoutUser() {
  return request({
    url: '/service/sso-service/sso/logout'
  });
}

//根据用户权限获取菜单列表
export function queryMenuList() {
  return request({
    url: '/service/sso-service/sso/user/getMenu',
    method: 'GET',
  });
}

export function checkPassword(values) {
  return request({
    url: '/service/sso-service/sso/user/selectPwd',
    method: 'POST',
    data: values
  });
}

export function updatePassword(values) {
  return request({
    url: '/service/sso-service/sso/user/modifyPwd',
    method: 'PUT',
    data: values
  });
}

// 根据id获取用户信息
export function getUserInfoById(id) {
  return request({
    // url: '/service/sso-service/sso/user/getInfoById',
    url: '/service/sso-service/sso/user/getOtherInfoById',
    data: id,
  });
}

//接入第三方：获取 token 接口
export function otherLogin(value) {
  return request({
    url: `/openService/eda/doLogin?code=${value}`,
    method: 'GET',
  });
}

/**
 * 获取文件内容 Base64 编码
 * @param {*} value fileId
 */
export function getFileContent(value) {
  return request({
    url: `/service/datamanage-service/v1/datamanage/loadById?fileId=${value}`,
    method: 'POST',
    data: value,
  });
}

/**
 * 编辑文件内容
 * @param {*} values fileId, fileContent
 */
export function editFileContent(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/editById',
    method: 'POST',
    data: values
  });
}


// >>>>>>>>>>>>>>>>>>>>>>>> websocket监听，包括VM创建结果、VM升降配结果、站内信、任务日志 <<<<<<<<<<<<<<<<<<<<<<<<
const sockets = [];
let ws;
export function wsConnect(url) {
  try {
    if ((ws && ws.readyState !== 1) || !ws) {
      if ('WebSocket' in window) {
        ws = new WebSocket(url);
      } else if ('MozWebSocket' in window) {
        ws = new MozWebSocket(url);
      } else {
        message.error("您的浏览器不支持websocket协议,建议使用新版谷歌、火狐等浏览器，请勿使用IE10以下浏览器，360浏览器请使用极速模式，不要使用兼容模式！");
      }
    }
    sockets.push(ws);
    return ws;
  } catch (e) {
    console.log('catch websocket error', e);
    reconnect(url);
  }



}

//心跳检测
var heartCheck = {
  timeout: 30000,        //30s发一次心跳
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function () {
    var self = this;
    this.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      ws.send("ping");
      console.log("ping!")
      // self.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
      //   ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
      // }, self.timeout)
    }, this.timeout)
  }
}

// 关闭所有连接
export function removeAllClients() {
  sockets.forEach(function (s) {
    wsClose(s);
  });
}

export function wsClose(ws) {
  if (ws && ws.readyState === 1) {   //websocket状态> 0:connecting 1:open 2:closing 3:closed
    ws.send('close');
    ws.close()  //关闭websocket
    ws.onclose = function (e) {
      console.log('前端关闭websocket连接', ws);
    }
  }
}

//1. 创建init方法，初始化一些监听事件，如果希望websocket连接一直保持, 我们会在close或者error上绑定重新连接方法。
export function wsInit(ws, action) {
   

  ws.onopen = function () {
    console.log('WebSocket连接开启');
    heartCheck.reset().start();  //心跳检测重置
  };

  ws.onmessage = function (event) {
    const value = event.data;
    heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
    console.log('接收服务端发过来的消息: ', value);
    if (value) {
      if (isJSON(value)) {
        action(JSON.parse(value))
      } else {
        action(value)
      }
    }
  }

  ws.onclose = function (e) {
    console.log('WebSocket连接关闭', e);
  };

  ws.onerror = function (e) {
    console.log('WebSocket连接异常', e);
  };

  //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接
  window.onbeforeunload = function () {
    ws.close();
  }
}

//2. 重连操作，通过设置lockReconnect变量避免重复连接。
var lockReconnect = false;//避免重复连接
let tt;
function reconnect(url) {
  if (lockReconnect) {
    return;
  };
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  tt && clearTimeout(tt);
  tt = setTimeout(function () {
    console.log('websocket重连...');

    wsConnect(url);
    lockReconnect = false;
  }, 4000);
}


// >>>>>>>>>>>>>>>>>>>>>> 计费相关 >>>>>>>>>>>>>>>>>>>>>>

//查询当前用户余额
export function queryBalance() {
  return request({
    url: '/service/icharge/v1/icharge/balance/queryBalance',
    method: "GET"
  });
}

//查询当前用户剩余可用机时
export function queryMachineHours() {
  return request({
    url: '/service/icharge/v1/icharge/balance/queryMachineHours',
    method: "GET"
  });
}

/**
 * 存储空间预检
 * @param {*} values
 */
export function isEnoughStorage(values) {
  return request({
    url: `/service/datamanage-service/v1/datamanage/isEnoughStorage?fileSize=${values.fileSize}&currentPath=${values.currentPath}`,
    method: 'POST',
  });
}

// 在线支付
export function pay(values) {
  return request({
    url: '/service/icharge/pay/test',
    method: 'POST',
    data: values,
  });
}

// 绑定手机号
export function modifyPhone(values) {
  return request({
    url: '/service/sso-service/sso/user/modifyPhone',
    method: 'PUT',
    data: values
  });
}

// 绑定手机号，发送验证码
export function bindPhoneSend(value) {
  return request({
    url: '/service/sso-service/sso/bindPhone/send',
    method: 'GET',
    data: value
  })
}
