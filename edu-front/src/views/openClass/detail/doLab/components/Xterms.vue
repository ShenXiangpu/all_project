<template>
  <div id="xterm" class="xterm"></div>
</template>


<script>
import { xtermWebSocketUrl } from "@/utils/wsHost";
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
export default {
  name: "terminal",
  props: {
    serveParam: {
      default: () => { },
      type: Object,
    },
  },
  data() {
    return {
      term: "",//terminal 黑窗口容器
      prefix: "",//前缀
      inputText: "",//输入内容，每次回车后进行ws通信然后清空此数据
      socket: '',
      cols: 100,
      row: 40,
      userName: '',
      password: '',
      host: '',
    };
  },
  watch: {},
  created() {
    let serveParam = this.serveParam
    let host = serveParam.host
    this.host = host
    let userCounts = serveParam.userCounts
    let userName = userCounts.accountName
    let password = userCounts.accountPwd
    this.userName = userName
    this.password = password
    this.prefix = `[${serveParam.userCounts.accountName}@${serveParam.hostname} ~]$`;
    this.initSocket()
  },
  mounted() {
    // this.initTerm()
  },
  methods: {

    async initSocket() {
      const WebSocketUrl = `${xtermWebSocketUrl}`;
      let socket = new WebSocket(
        WebSocketUrl
      );
      this.socket = socket;
      this.socketOnClose(); //关闭
      this.socketOnOpen(); //
      this.socketOnError();
      this.soketOnMessage()
    },
    scoketParams(operate = 'connect', command) {
      let data = {
        operate,
        host: this.host,
        username: this.userName,
        password: this.password,
        command
      }
      return JSON.stringify(data)
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        // 链接成功后
        let str = this.scoketParams()
        console.log(str);
        this.socket.send(str)
        this.initTerm();
      };
    },
    socketOnClose() {
      this.socket.onclose = () => {
        // console.log('close socket')
      }
    },
    soketOnMessage() {
      this.socket.onmessage = (event) => {
        let str = event && event.data;
        // console.log('测试',JSON.stringify(str));
        // // console.log('测试',str.subString('\n'));
        // console.log('ce',JSON.stringify(str).split('\\r\\n'));
        // console.log('ce',JSON.stringify(str).split('\\r\\n')[JSON.stringify(str).split('\\r\\n').length - 1]);
        // this.prefix = JSON.stringify(str).split('\\r\\n')[JSON.stringify(str).split('\\r\\n').length - 1]
        console.log(JSON.stringify(str));
        let strArr = JSON.stringify(str).split('\\r\\n')
        let newStr = strArr[strArr.length - 1]
        newStr = newStr.substring(0, newStr.length - 2)
        this.prefix = newStr
        console.log(newStr);
        this.term.write(event.data);
      }
    },
    socketOnError() {
      this.socket.onerror = () => {
        // console.log('socket 链接失败')
      }
    },
    //初始化黑窗口
    async initTerm() {
      const fitAddon = new FitAddon();
      this.term = new Terminal({
        fontSize: 14,

        cursorBlink: true,
        allowProposedApi: true,
        disableStdin: false,
        LogLevel: "debug",
      });

      this.term.loadAddon(fitAddon);
      //开启Xterm终端
      this.term.open(document.getElementById("xterm"));
      // this.term.writeln("\x1b[1;1;32mwelcome to web terminal!\x1b[0m");
      // this.term.write(this.prefix); //黑窗口 前缀

      await this.termPromt(); //term.promt
      await this.termKeyCode(); //事件
      // this.term.prompt();
      fitAddon.fit(); //黑窗口适应实际div宽高
      this.term.focus(); //自动聚焦
      // window.addEventListener("resize", resizeScreen);
      // 内容全屏显示
      function resizeScreen() {
        // 不传size

        try {
          fitAddon.fit();

          // 窗口大小改变时触发xterm的resize方法，向后端发送行列数，格式由后端决定
          // 这里不使用size默认参数，因为改变窗口大小只会改变size中的列数而不能改变行数，所以这里不使用size.clos,而直接使用获取我们根据窗口大小计算出来的行列数
          this.term.onResize(() => {
            this.socket.send({ Op: "resize", Cols: this.term.cols, Rows: this.term.rows });
          });
        } catch (e) {
          console.log("e", e.message);
        }
      }


      function runFakeTerminal(_this) {
        if (_this.term._initialized) {
          return;
        }
        // 初始化
        _this.term._initialized = true;

        _this.term.writeln("Welcome to use Superman. ");
        _this.term.writeln(
          `This is Web Terminal of pod\x1B[1;3;31m
          \x1B[0m in namespace\x1B[1;3;31m \x1B[0m`
        );

        _this.term.prompt();

        // / **
        //     *添加事件监听器，用于按下键时的事件。事件值包含
        //     *将在data事件以及DOM事件中发送的字符串
        //     *触发了它。
        //     * @返回一个IDisposable停止监听。
        //  * /
        //   / ** 更新：xterm 4.x（新增）
        //  *为数据事件触发时添加事件侦听器。发生这种情况
        //  *用户输入或粘贴到终端时的示例。事件值
        //  *是`string`结果的结果，在典型的设置中，应该通过
        //  *到支持pty。
        //  * @返回一个IDisposable停止监听。
        //  * /
        // 支持输入与粘贴方法
        _this.term.onData(function (key) {
          let order = {
            Data: key,
            Op: "stdin"
          };
          _this.socket.send(order);
          // 为解决窗体resize方法才会向后端发送列数和行数，所以页面加载时也要触发此方法
          _this.socket.send({
            Op: "resize",
            Cols: parseInt(_this.term.cols),
            Rows: parseInt(_this.term.rows)
          });
        });

      }
      let _this = this
      // lsrunFakeTerminal(_this);






    },
    //事件
    termKeyCode() {
      const TERMINAL_INPUT_KEY = {
        BACK: 8, // 退格删除键
        ENTER: 13, // 回车键
        UP: 38, // 方向盘上键
        DOWN: 40, // 方向盘键
        LEFT: 37, // 方向盘左键
        RIGHT: 39, // 方向盘右键
      };
      // const { eqpCode, server } = this.selectObj;
      let inputText = "";
      let currentIndex = 0;
      let inputTextList = [];
      this.term.onKey((e) => {
        const { key, domEvent } = e;
        const { keyCode, altKey, altGraphKey, ctrlKey, metaKey } = domEvent;

        const printAble = !(altKey || altGraphKey || ctrlKey || metaKey); // 禁止相关按键
        const totalOffsetLength = inputText.length + this.prefix.length; // 总偏移量
        const currentOffsetLength = this.term._core.buffer.x; // 当前x偏移量

        switch (keyCode) {
          //删除
          case TERMINAL_INPUT_KEY.BACK:
            if (currentOffsetLength > this.prefix.length) {
              const cursorOffSetLength = this.getCursorOffsetLength(totalOffsetLength - currentOffsetLength, "\x1b[D"); // 保留原来光标位置

              this.term._core.buffer.x = currentOffsetLength - 1;
              this.term.write("\x1b[?K" + inputText.slice(currentOffsetLength - this.prefix.length));
              this.term.write(cursorOffSetLength);

              inputText = `${inputText.slice(0, currentOffsetLength - this.prefix.length - 1)}${inputText.slice(
                currentOffsetLength - this.prefix.length
              )}`;

            }
            break;
          //回车
          case TERMINAL_INPUT_KEY.ENTER: {
            this.term.write("\r\n");
            // console.log("inputText", inputText);
            //ws 通信参数
            // let wsParams = { EqpCode: eqpCode, Action: "terminal", Data: inputText };
            // this.$emit("websocketSend", wsParams, server);



            // if (!inputText.trim()) {
            //   this.term.prompt();
            //   return;
            // }
            console.log('inputTextList', inputTextList, inputText);

            if (inputTextList.indexOf(inputText) === -1) {
              inputTextList.push(inputText.trim());
              console.log("inputTextList", inputTextList);
              currentIndex = inputTextList.length;
            }


            let str = this.scoketParams('command', inputText)
            this.socket.send(str)
            inputText = "";
            break;
          }

          case TERMINAL_INPUT_KEY.UP: {
            if (!inputTextList[currentIndex - 1]) break;

            const offsetLength = this.getCursorOffsetLength(inputText.length, "\x1b[D");
            console.log("offseLength", offsetLength, inputText.length);
            inputText = inputTextList[currentIndex - 1];
            this.term.write(offsetLength + "\x1b[?K");
            this.term.write(`${inputTextList[currentIndex - 1]}`);
            this.term._core.buffer.x = totalOffsetLength;
            currentIndex--;

            break;
          }

          case TERMINAL_INPUT_KEY.DOWN: {
            if ((currentIndex + 1) > inputTextList.length || !inputTextList[currentIndex + 1]) break;

            const offsetLength = this.getCursorOffsetLength(inputText.length, "\x1b[D");
            console.log("offseLength", offsetLength, inputText.length);
            inputText = inputTextList[currentIndex + 1];
            this.term.write(offsetLength + "\x1b[?K");
            this.term.write(` ${inputTextList[currentIndex + 1]}`);
            this.term._core.buffer.x = totalOffsetLength;
            currentIndex++;

            break;
          }


          case TERMINAL_INPUT_KEY.LEFT:
            if (currentOffsetLength > this.prefix.length) {
              this.term.write(key); // '\x1b[D'
            }
            break;

          case TERMINAL_INPUT_KEY.RIGHT:
            if (currentOffsetLength < totalOffsetLength) {
              this.term.write(key); // '\x1b[C'
            }
            break;
          default: {
            // 在当前的坐标写上 key 和坐标后面的字符
            // 移动停留在当前位置的光标
            console.log('ddddd');
            if (!printAble) break;
            if (totalOffsetLength >= this.term.cols) break;
            if (currentOffsetLength >= totalOffsetLength) {
              this.term.write(key);
              inputText += key;
              console.log(inputText);
              break;
            }
            let cursorOffSetLength = this.getCursorOffsetLength(totalOffsetLength - currentOffsetLength, "\x1b[D");
            console.log(cursorOffSetLength);
            this.term.write("\x1b[?K" + `${key}${inputText.slice(currentOffsetLength - this.prefix.length)}`);
            this.term.write(cursorOffSetLength);
            inputText = inputText.slice(0, currentOffsetLength) + key + inputText.slice(totalOffsetLength - currentOffsetLength);
            break;
          }
        }
      });
    },
    //限制和后端交互，只有输入回车键才显示结果
    termPromt() {
      this.term.prompt = () => {
        this.term.write("\r\n");
      };
    },
    //获取光标当前位置
    getCursorOffsetLength(offsetLength, subString) {
      let cursorOffsetLength = "";
      for (let offset = 0; offset < offsetLength; offset++) {
        cursorOffsetLength += subString;
      }
      return cursorOffsetLength;
    },
    //写入黑窗口
    wirteTerm(data) {
      console.log("写入黑窗口", data);
      this.term.writeln(data);
      this.term.prompt();
    },
    //加载基础数据
    pageLoad(data) {
      this.selectObj = data;
      this.drawerFlag = true;
      this.$nextTick(() => {
        this.initTerm();
      });
    },
    cancelClick() {
      this.drawerFlag = false;
      //关闭弹框
      this.term.dispose(document.getElementById("xterm"));
    },
  },
};
</script>

<style lang="scss">
.xterm {
  /* overflow: auto; */
  width: 100%;
  height: 100%;

  .xterm-screen {
    padding: 0 20px;
    // overflow-y: auto;
  }

  .xterm-viewport {
    height: calc(100vh - 50px);
  }

  .xterm-scroll-area {
    // height: calc(100vh - 200px) !important;
  }

  .xterm-rows {
    width: 100%;
    // padding: 20px;
    height: calc(100vh - 200px) !important;

    div {
      width: 100% !important;
      box-sizing: border-box;
    }
  }
}
</style>
