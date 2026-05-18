<template>
    <div class='app-container'>
        <div id="xterm" class="xterm"></div>
    </div>
</template>

<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
export default {
    name: "terminal",
    data() {
        return {
            term: "",//terminal 黑窗口容器
            prefix: "[root@serverip ~]# ",//前缀
            inputText: "",//输入内容，每次回车后进行ws通信然后清空此数据
            socket: null,
            rows: 32,
            cols: 20,
            SetOut: false,
            isKey: false,
        };
    },
    created() { },
    mounted() {
        this.initSocket()
        // this.initTerm()
    },
    watch: {},
    methods: {
        async initTerm() {
            const fitAddon = new FitAddon();
            this.term = new Terminal({
                fontSize: 20,
                cursorBlink: true,
                allowProposedApi: true,
                disableStdin: false,
                LogLevel: "debug",
            });

            this.term.loadAddon(fitAddon);

            const attachAddon = new AttachAddon(this.socket);

            this.term.loadAddon(attachAddon);

            //开启Xterm终端
            this.term.open(document.getElementById("xterm"));
            this.term.writeln("\x1b[1;1;32mwellcom to web terminal!\x1b[0m");
            this.term.write(this.prefix); //黑窗口 前缀
            this.soketOnMessage()
            await this.termPromt(); //term.promt
            await this.termKeyCode(); //事件

            fitAddon.fit(); //黑窗口适应实际div宽高
            this.term.focus(); //自动聚焦
        },
        async initSocket() {
            //  const WebSocketUrl = "ws://localhost:8080/ws/ssh";
            const WebSocketUrl = "ws://172.18.0.185:30411/ws/webssh";
            let socket = new WebSocket(
                WebSocketUrl
            );
            this.socket = socket;
            this.socketOnClose(); //关闭
            this.socketOnOpen(); //
            this.socketOnError();
        },
        socketOnOpen() {
            this.socket.onopen = () => {
                // 链接成功后
                let data = {
                    operate: 'connect',
                    host: '172.18.10.20',
                    username: 'liuchengcheng',
                    password: 'wp@YuK5T'
                }
                let str = JSON.stringify(data)
                this.socket.send(str)
                this.soketOnMessage()
                this.initTerm();
            };
        },
        soketOnMessage() {
            this.socket.onmessage = (event) => {
                console.log(event.data)
                this.term.write(event.data);
            }
        },
        socketOnClose() {
            this.socket.onclose = () => {
                // console.log('close socket')
            }
        },
        socketOnError() {
            this.socket.onerror = () => {
                // console.log('socket 链接失败')
            }
        },
        //限制和后端交互，只有输入回车键才显示结果
        termPromt() {
            this.term.prompt = () => {
                this.term.write(this.prefix);
            };
        },
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
                        console.log("inputText", inputText);
                        //ws 通信参数
                        // let wsParams = { EqpCode: eqpCode, Action: "terminal", Data: inputText };
                        // this.$emit("websocketSend", wsParams, server);
                        let data = {
                            operate: 'command',
                            host: '172.18.10.20',
                            username: 'liuchengcheng',
                            password: 'wp@YuK5T',
                            command: inputText
                        }
                        let str = JSON.stringify(data)
                        this.socket.send(str)
                        if (!inputText.trim()) {
                            this.term.prompt();
                            return;
                        }

                        if (inputTextList.indexOf(inputText) === -1) {
                            inputTextList.push(inputText);
                            currentIndex = inputTextList.length;
                        }

                        this.term.prompt();
                        inputText = "";
                        break;
                    }

                    case TERMINAL_INPUT_KEY.UP: {
                        if (!inputTextList[currentIndex - 1]) break;

                        const offsetLength = this.getCursorOffsetLength(inputText.length, "\x1b[D");

                        inputText = inputTextList[currentIndex - 1];
                        this.term.write(offsetLength + "\x1b[?K");
                        this.term.write(inputTextList[currentIndex - 1]);
                        this.term._core.buffer.x = totalOffsetLength;
                        currentIndex--;

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
                        if (!printAble) break;
                        if (totalOffsetLength >= this.term.cols) break;
                        if (currentOffsetLength >= totalOffsetLength) {
                            this.term.write(key);
                            inputText += key;
                            break;
                        }
                        let cursorOffSetLength = this.getCursorOffsetLength(totalOffsetLength - currentOffsetLength, "\x1b[D");
                        this.term.write("\x1b[?K" + `${key}${inputText.slice(currentOffsetLength - this.prefix.length)}`);
                        this.term.write(cursorOffSetLength);
                        inputText = inputText.slice(0, currentOffsetLength) + key + inputText.slice(totalOffsetLength - currentOffsetLength);
                        break;
                    }
                }
            });
        },
        //webshell链接成功之后操作


    },
};
</script>


<style lang="scss" scoped></style>