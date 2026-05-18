/**
 * Created by PanJiaChen on 16/11/18.
 */
import store from '@/store'
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * el组件判断有无权限
 * @param {Array,权限字符串} value 
 * @returns 
 */
export function checkPermission(value) {
  const roles = store.getters && store.getters.perms
  if (value && value instanceof Array) {
      if (value.length > 0) {
          const permissionRoles = value
          const hasPermission = roles.some(role => {
              return permissionRoles.includes(role)
          })

          return hasPermission
      }
  } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}
