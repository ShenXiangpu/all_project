import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { CANCEL_REQUEST_MESSAGE } from './constant'
import qs from 'qs'
import { notification } from 'antd';
import { router } from '../utils'
import store from 'store'
import { removeAllClients } from '../services/api.js'

// 状态码错误信息
const codeMessage = {
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const { CancelToken } = axios
window.cancelRequest = new Map()

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 400) {
    notification.error({
      message: "Error",
      description: "用户名或密码错误",
    });
    return {};
  } else if (response.status === 500) {
    notification.error({
      message: "Error",
      description: "服务器连接错误",
    });
    return {};
  }
}

let timeoutId;
function checkCode(response) {

  clearTimeout(timeoutId)
  const { data } = response;
  const errorCode = data.errCode;

  // code:1000，token过期，重回登录页
  // code:401，账号重复登录
  if (!data.flag && (Number(errorCode) === 1000 || errorCode === 'INVALIDATE_TOKEN' || Number(errorCode) === 401)) {
    store.set('Token', '');
    store.set('isInit', false);
    store.set('user', {});
    store.set('menus', []);
    store.set('balance', '');
    store.set('machineHours', '');
    store.set('vmReconfig', {});
    store.set('vmRecharge', {});

    timeoutId = setTimeout(() => {
      notification.info({
        message: '登录提示',
        description: `${data.errMessage}请重新登录`,
        duration: 5
      });

      router.push({
        pathname: '/login',
        // search: stringify({
        //   from: '/',
        // }),
      })
    }, 300);

    removeAllClients();  // 关闭所有连接
  }

  if (data.code && data.code === '1111') {
    timeoutId = setTimeout(() => {
      notification.info({
        message: 'ERROR',
        description: data.msg,
        duration: 3
      });
    }, 300);  //在0.3秒内触发多次 checkCode 只会触发一次
  }
}

export default function request(options) {
  let { data, url, method = 'get', headers } = options
  const cloneData = cloneDeep(data)

  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    if (data) {
      const match = pathToRegexp.parse(url)
      url = pathToRegexp.compile(url)(data)

      for (const item of match) {
        if (item instanceof Object && item.name in cloneData) {
          delete cloneData[item.name]
        }
      }
    }

    url = domain + url
  } catch (e) {
    message.error(e.message)
  }

  options.headers = {
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',        // 强制要求缓存服务器在返回缓存的版本之前将请求提交到源头服务器进行验证, 解决360浏览器兼容模式下 GET 请求会从缓存取数据的问题
    "Auth-token": store.get('Token'),   // 请求头中设置携带token
    ...headers
  }

  options.url =
    method.toLocaleLowerCase() === 'get'
      ? `${url}${isEmpty(cloneData) ? '' : '?'}${qs.stringify(cloneData)}`
      : url

  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  return axios(options)
    .then(response => {
      // checkStatus(response)
      checkCode(response)

      const { statusText, status, data, headers } = response

      let result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        } else if (data instanceof Blob) {  // 文件下载接口返回为Blob数据结构
          result.data = data
        }
      } else {
        result.data = data
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
        headers,
      })
    })
    .catch(error => {
      const { response, message } = error

      // >>>>>>>>>>>>>> 请求失败 <<<<<<<<<<<<<<
      // 请求配置发生的错误
      if (!error.response) {
        return console.log('Error', error.message);
      }

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        }
      }

      if (response && response instanceof Object) {
        // 响应时状态码处理
        const statusCode = error.response.status;
        const msg = codeMessage[statusCode] || error.response.statusText;

        notification.error({
          message: `请求错误 ${statusCode}`,
          description: msg,
        });
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      })
    })
}
