// import { EventSourcePolyfill } from "event-source-polyfill";
let source = null;
import { getToken } from "@/utils/auth";
export function sseConnect(url) {
    console.log("sseConnect", url);
    
  if ("EventSource" in window) {
    // 创建EventSource对象并指定SSE服务器的路径
    source = new EventSource(url, {
        
      headers: {
        // 'Content-Type': 'application/json',
        'auth-token': getToken(),
      },
    });
    return source;
  } else {
    console.log("浏览器不支持SSE");
  }
}

export function sseInit(source, action) {
  source.onopen = function () {
    console.log("sse连接成功");
  };
  source.onmessage = function (e) {
    console.log("sse接收到消息：" + e.data);
    action(e);
  };
  source.onerror = function (e) {
    if (e.readyState == EventSource.CLOSED) {
      sseClose(source);
    } else if (source.readyState == EventSource.CONNECTING) {
      console.log("sse正在重连");
    } else {
      console.log("sse连接错误");
    }
  };
}

export function sseClose(source) {
  if (source) {
    source.close();
    this.source = null;
    console.log("sse关闭了");
  } else {
    console.log("sse没有连接");
  }
}
