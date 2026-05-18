const isDev = process.env.NODE_ENV === "development";
const host = window.location.host;
// 消息
const messageWebSocketUrl = isDev
  ? `ws://172.18.0.185:30478/ws`
  : `ws://${host}/wsmsg/ws`;

// 监控
const labWebSocketUrl = isDev
  ? `ws://172.18.0.185:30478/ws`
  : `ws://${host}/wsmsg/ws`;

//实验xterm地址
const xtermWebSocketUrl = isDev
  ? `ws://172.18.0.185:30411/ws/webssh`
  : `ws://172.18.0.185:30411/ws/webssh`;

export { messageWebSocketUrl, labWebSocketUrl, xtermWebSocketUrl };
