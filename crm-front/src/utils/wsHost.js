const isDev = import.meta.env.MODE === "development";
const host = window.location.host;
// 消息
const messageWebSocketUrl = isDev
  ? `ws://172.18.0.185:30910/ws`
  : `ws://${host}/wsmsg/ws`;

// 监控
const labWebSocketUrl = isDev
  ? `ws://1.94.188.75:9080/ws`
  : `wss://${host}/wsmsg/ws`;

//实验xterm地址
const xtermWebSocketUrl = isDev
  ? `ws://${"1.94.188.75"}/ws/webssh`
  : `wss://${host}/ws/webssh`;

export { messageWebSocketUrl, labWebSocketUrl, xtermWebSocketUrl };
