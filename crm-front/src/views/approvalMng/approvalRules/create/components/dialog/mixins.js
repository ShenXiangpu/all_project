import { getRoles, getEmployees } from "@/plugins/api.js";

import { getUserSelect } from "@/api/crm/approval.js";

export default {
  data() {
    return {
      visibleDialog: false,
      searchVal: "",
      activeName: "1",
      departments: {},
    };
  },
  methods: {
    async getRoleList() {
      let {
        data: { list },
      } = await getRoles();
      this.roles = list;
    },
    async getDepartmentList() {
      let userName = this.searchVal || "";
      let res = await getUserSelect(userName);
      if (res && res.flag) {
        let resData = res.resData;
        this.menuList = this.handleTreeList(resData);
        const menuList = this.menuList;

        let newMenuList = [];
        let noParentIdList = [];
        menuList.map((item) => {
          if (item && item.children && item.children.length > 0) {
            let children = item.children;
            children.map((_item) => {
              let i = {
                id: _item.id,
                employeeName: _item.label,
              };
              //save需要的格式
              newMenuList.push(i);
              noParentIdList.push(_item.id);
            });
          }
        });
        this.noParentIdList = noParentIdList;
        this.newMenuList = newMenuList;

        console.log("newMenuList", newMenuList,noParentIdList);
        
      }
    },

    handleTreeList(list) {
      let children = [];
      list &&
        list.length > 0 &&
        list.map((item) => {
          let optionItem = {
            id: item.id || "",
            label: item.name || item.userName,
            disabled: item.name && !this.isCheckedBox ? true : false, //是否禁用 发起人不禁用
          };
          if (item.userVo && item.userVo.length > 0) {
            optionItem.children = this.handleTreeList(item.userVo);
          }
          children.push(optionItem);
        });

      return children;
    },
    getDebounceData(event, type = 1) {
      this.searchVal = event.target.value;
      this.getDepartmentList();
    },
  },
};
