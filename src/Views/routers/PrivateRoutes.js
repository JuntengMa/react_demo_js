// privateRoutes.js
import { Backend } from '../Components';
export const privateRoutes = [
  {
    path: '/backend',
    component: Backend,
    exact: true,
    role: 'user',       // 当前路由需要的角色权限
    backUrl: '/login'   // 不满足权限跳转的路由
  },
];
