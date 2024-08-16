import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layouts/Layout';

Vue.use(Router);

const routes = [
    {
        path: '/login',
        component:()=> import('@/views/Login'),
        name: 'Login'
    },
    {
        path: '/register',
        component:()=> import('@/views/Register'),
        name: 'Register'
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component:()=> import('@/views/Dashboard'),
                name: 'Dashboard'
            },
            {
                path: 'users',
                component:()=>  import('@/views/Users'),
                name: 'Users'
            },
            {
                path: 'profile',
                component:()=>  import('@/views/Profile'),
                name: 'Users'
            },
            {
                path: 'tours',
                component:()=>  import('@/views/Tours'),
                name: 'Tours'
            },
            {
                path: 'chat',
                component:()=>  import('@/views/Chat'),
                name: 'Chat'
            }
            // 其他子路由
        ]
    },
    // 其他路由
];

const router = new Router({
    mode: 'history',
    routes
});

export default router;
