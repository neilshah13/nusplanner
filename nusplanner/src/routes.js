import Login from './components/Login.vue';
import Main from './components/Main.vue';
import SignUp from './components/SignUp.vue';
import Groups from './components/Groups.vue';

export default [
    {
        path: '/',
        redirect: '/home',
        meta: {
            auth: true
        }
    },
    {
        path: '/home',
        component: Main,
        meta: {
            auth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp
    },
    {
        path: '/groups',
        component: Groups
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Main,
        meta: {
            auth: true
        }
    }
]