import Login from './components/Login.vue';
import Main from './components/Main.vue';
import SignUp from './components/SignUp.vue';

export default [
    {
        path: '/',
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
        path: '/dashboard',
        name: 'dashboard',
        component: Main,
        meta: {
            auth: true
          }
    },
]