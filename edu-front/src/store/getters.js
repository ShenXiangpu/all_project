const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  companyId: state => state.user.companyId,
  roles: state => state.user.roles,
  userRolesNames: state => state.user.userRolesNames,
  permission_routes: state => state.permission.routes || JSON.parse(localStorage.getItem('accessedRoutes')),
  isScreenFull: state => state.user.isScreenFull, // 控制进入首页不是全屏
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  isLicenseEnabled: state => state.user.isLicenseEnabled,
  userInfo: state => state.user.userInfo,
  noticeData: state => state.ws.noticeData,
  unreadMsg: state => state.ws.unreadMsg,
  unreadCount: state => state.ws.unreadCount,
  studentList: state => state.ws.studentList,
  teaReply: state => state.ws.teaReply,
}
export default getters
