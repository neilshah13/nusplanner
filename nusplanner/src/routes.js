import Login from './components/Login.vue';
import Main from './components/Main.vue';
import SignUp from './components/SignUp.vue';
import Groups from './components/Groups.vue';
import Dashboard from './components/Dashboard.vue';

export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Main,
        meta: {
            auth: true,
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
        component: SignUp,
        meta: {
            guest: true
        }
    },
    {
        path: '/groups',
        name: 'groups',
        component: Groups,
        meta: {
            auth: true
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            auth: true
        }
    }
]