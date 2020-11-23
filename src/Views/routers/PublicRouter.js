import {
  Home,
  Login
} from '../Components';

export const publicRoutes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/',
    component: Home,
    exact: true,
  },
];

 


