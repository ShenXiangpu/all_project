import { utimes } from "fs";

/* eslint no-useless-escape:0 */
// const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
const reg = /^https?:\/\//;

export function isUrl(path) {
  return reg.test(path);
}

// 个人中心菜单
export const basicMenuData = [
  {
    menuName: '个人中心',
    menuIcon: 'idcard',
    menuUrl: 'personalInfo',
  },
  {
    menuName: '站内信',
    menuIcon: 'mail',
    menuUrl: 'message',
  },
  {
    menuName: '账户中心',
    menuIcon: 'account-book',
    menuUrl: 'home',
  },
  {
    menuName: '收支明细',
    menuIcon: 'transaction',
    menuUrl: 'transactions',
  },
  {
    menuName: '订单管理',
    menuUrl: 'deal',
    menuIcon: 'property-safety'
  },
  {
    menuName: 'License待缴费',
    menuUrl: 'licenseToPay',
    menuIcon: 'red-envelope'
  },
  {
    menuName: '兑换机时',
    menuUrl: 'coupons',
    menuIcon: 'wallet'
  },
  {
    menuName: '优惠券',
    menuIcon: 'money-collect',
    menuUrl: 'vouchers',
  },
];

// 企业内普通员工（项目经理、工程师），权限内菜单
export const deptMenuData = [
  {
    menuName: '个人中心',
    menuIcon: 'idcard',
    menuUrl: 'personalInfo',
  },
  {
    menuName: '站内信',
    menuIcon: 'mail',
    menuUrl: 'message',
  },
  
];

function formatter(data, parentPath = '/') {
  return data && data.map(item => {
    const { menuUrl } = item;
    let path = '';
    if (isUrl(menuUrl)) {
      path = menuUrl;
    } else {
      path = parentPath + item.menuUrl;
    }

    let result = {
      path,
      name: item.menuName,
      children: item.children
    };

    if (item.menuIcon) {
      result = {
        ...result,
        icon: item.menuIcon
      }
    }

    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.menuUrl}/`);
    }
    return result;
  });
}

export const getMenuData = (menus, parentPath) => formatter(menus, parentPath);
