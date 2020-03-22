import Login from './components/Login.vue';
import Main from './components/Main.vue';
import SignUp from './components/SignUp.vue';
import Groups from './components/Groups.vue';

export default [
    {
        path: '/',
        component: Main
    },
    { 
        path: '/login',
        component: Login
    },
    {
        path: '/signup',
        component: SignUp
    },
    {
        path: '/groups',
        component: Groups
    }
]