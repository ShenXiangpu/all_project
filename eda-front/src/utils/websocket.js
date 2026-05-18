import { isJSON } from '../utils/index';
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
    // clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function () {
    var self = this;
    this.timeoutObj = setInterval(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      ws.send(JSON.stringify([{ msgInfo: 'ping' }]));
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
      heartCheck.reset()
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
    console.log('接收服务端发过来的消息event: ', event);
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
    heartCheck.reset()
    console.log('WebSocket连接关闭', e);
  };

  ws.onerror = function (e) {
    heartCheck.reset()
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