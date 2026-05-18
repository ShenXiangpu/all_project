// drawerDragWidth.js
export default {
  bind(el, binding, vnode) {
    // 专门针对 el-drawer 组件设计的拖拽功能
    if (
      !(vnode.componentOptions && vnode.componentOptions.tag === "el-drawer")
    ) {
      console.warn(
        "v-el-draw directive should be used on el-drawer component only"
      );
      return;
    }

    console.log("document.body.style.pointerEvents ",document.body.style.pointerEvents );


    // 等待DOM更新后执行
    setTimeout(() => {
      // 获取抽屉元素
      const drawerEle = el.querySelector(".el-drawer");
      if (!drawerEle) return;

      // 设置最小和最大宽度限制
      const minWidth = binding.value?.minWidth || 300;
      const maxWidth = binding.value?.maxWidth || 800;

      // 根据抽屉方向确定手柄位置和拖拽行为
      const direction = vnode.componentOptions.propsData?.direction || "rtl";

      // 创建拖拽手柄元素
      const resizeHandle = document.createElement("div");
      resizeHandle.className = "drawer-resize-handle";

      // 根据方向设置手柄样式
      let handleStyles = "";
      switch (direction) {
        case "ltr":
          handleStyles = `
            width: 5px;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            cursor: col-resize;
          `;
          break;
        case "rtl":
        default:
          handleStyles = `
            width: 5px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            cursor: col-resize;
          `;
          break;
      }

      resizeHandle.style.cssText = `
        ${handleStyles}
        z-index: 10000;
        background: transparent;
        transition: background 0.3s;
      `;

      // 添加hover效果
      resizeHandle.addEventListener("mouseenter", () => {
        resizeHandle.style.background = "rgba(19, 78, 230, 0.1)";
      });

      resizeHandle.addEventListener("mouseleave", () => {
        if (!resizeHandle.classList.contains("resizing")) {
          resizeHandle.style.background = "transparent";
        }
      });

      // 将拖拽手柄添加到抽屉元素中
      drawerEle.style.position = "absolute";
      drawerEle.style.right = "0";
      drawerEle.appendChild(resizeHandle);

      // 鼠标按下事件处理
      resizeHandle.addEventListener("mousedown", function (downEvent) {
        downEvent.preventDefault();
        downEvent.stopPropagation();

        resizeHandle.classList.add("resizing");

        // 记录初始宽度和鼠标位置
        const initialWidth = drawerEle.offsetWidth;
        const startX = downEvent.clientX;

        // 禁用文本选择和鼠标事件穿透
        document.body.style.userSelect = "none";
        document.body.style.pointerEvents = "none";

        // 鼠标移动事件处理
        const onMouseMove = function (moveEvent) {
          moveEvent.preventDefault();

          // 计算移动距离
          const deltaX = moveEvent.clientX - startX;
          let newWidth;

          // 根据方向计算新宽度
          if (direction === "rtl") {
            newWidth = initialWidth - deltaX;
          } else {
            newWidth = initialWidth + deltaX;
          }

          // 应用宽度限制
          newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

          // 设置新宽度
          drawerEle.style.width = newWidth + "px";

          // 触发窗口大小调整事件
          window.dispatchEvent(new Event("resize"));
        };

        // 鼠标释放事件处理
        const onMouseUp = function () {
          // 清理事件监听
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);

          // 恢复文本选择和鼠标事件
          document.body.style.userSelect = "";
          document.body.style.pointerEvents = "";

          resizeHandle.classList.remove("resizing");
          resizeHandle.style.background = "transparent";
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
    }, 100);
  },

  unbind(el) {
    // 清理工作
    const drawerEle = el.querySelector(".el-drawer");
    if (drawerEle) {
      const handle = drawerEle.querySelector(".drawer-resize-handle");
      if (handle) {
        drawerEle.removeChild(handle);
      }
    }

    document.body.style.userSelect = "";
    document.body.style.pointerEvents = "";


  },

  componentUpdated(el, binding, vnode) {
    // 当组件更新时，确保手柄仍然存在
    if (
      !(vnode.componentOptions && vnode.componentOptions.tag === "el-drawer")
    ) {
      return;
    }

    setTimeout(() => {
      const drawerEle = el.querySelector(".el-drawer");
      if (!drawerEle) return;

      // 检查是否已存在手柄
      const existingHandle = drawerEle.querySelector(".drawer-resize-handle");
      if (!existingHandle) {
        // 重新创建手柄
        const resizeHandle = document.createElement("div");
        resizeHandle.className = "drawer-resize-handle";

        const direction = vnode.componentOptions.propsData?.direction || "rtl";
        let handleStyles = "";
        switch (direction) {
          case "ltr":
            handleStyles = `
              width: 5px;
              height: 100%;
              position: absolute;
              right: 0;
              top: 0;
              cursor: col-resize;
            `;
            break;
          case "rtl":
          default:
            handleStyles = `
              width: 5px;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              cursor: col-resize;
            `;
            break;
        }

        resizeHandle.style.cssText = `
          ${handleStyles}
          z-index: 10000;
          background: transparent;
          transition: background 0.3s;
        `;

        // drawerEle.style.position = "absolute";
        drawerEle.appendChild(resizeHandle);

        // 重新绑定事件
        resizeHandle.addEventListener("mouseenter", () => {
          resizeHandle.style.background = "rgba(19, 78, 230, 0.1)";
        });

        resizeHandle.addEventListener("mouseleave", () => {
          if (!resizeHandle.classList.contains("resizing")) {
            resizeHandle.style.background = "transparent";
          }
        });

        // 复用之前的 mousedown 事件处理逻辑
        resizeHandle.addEventListener("mousedown", function (downEvent) {
          downEvent.preventDefault();
          downEvent.stopPropagation();

          resizeHandle.classList.add("resizing");

          const initialWidth = drawerEle.offsetWidth;
          const startX = downEvent.clientX;
          const direction =
            vnode.componentOptions.propsData?.direction || "rtl";

          document.body.style.userSelect = "none";
          document.body.style.pointerEvents = "none";

          const onMouseMove = function (moveEvent) {
            // 检查鼠标是否仍在抽屉区域内
            if (!drawerEle.contains(moveEvent.target)) {
              return;
            }
            moveEvent.preventDefault();

            const deltaX = moveEvent.clientX - startX;
            let newWidth;

            if (direction === "rtl") {
              newWidth = initialWidth - deltaX;
            } else {
              newWidth = initialWidth + deltaX;
            }

            newWidth = Math.max(
              binding.value?.minWidth || 300,
              Math.min(binding.value?.maxWidth || 800, newWidth)
            );

            drawerEle.style.width = newWidth + "px";
            window.dispatchEvent(new Event("resize"));
          };

          const onMouseUp = function () {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            document.body.style.userSelect = "";
            document.body.style.pointerEvents = "auto";

            resizeHandle.classList.remove("resizing");
            resizeHandle.style.background = "transparent";
          };

          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        });
      }
    }, 100);
  },
};
