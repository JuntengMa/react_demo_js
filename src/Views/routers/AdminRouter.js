// adminRoutes.js
import {Admin} from '../Components';

export const adminRoutes = [
  {
    path: '/admin',
    component: Admin,
    exact: true,
    role: 'admin',       // 需要的权限是admin
    backUrl: '/backend'  // 不满足权限跳回后台页面
  },
];
