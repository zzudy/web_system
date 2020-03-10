import Vue from 'vue'
import Router from "vue-router";
import Home from "../views/Home.vue";
import map from '../views/Map.vue'
import 'fullcalendar/dist/fullcalendar.css'

Vue.use(Router)
const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/Login.vue')
        }
    },
    {
        path: '/find_pw',
        name: 'find_pw',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/find_pw.vue')
        }
    },
    {
        path: '/sign_up_user',
        name: 'sign_up_user',
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/Sign_up_user.vue')
        }
    },
    {
        path: '/board',
        name: 'board',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/Board.vue')
        }
    },
    {
        path: '/mypet',
        name: 'mypet',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/Book.vue')
        }
    },
    {
        path: '/map',
        name: 'map',
        component: map
    },

    {
        path: '/map/book',
        name: 'map_book',
        component: function() {
            return import ('../views/book_pet.vue')
        }
    },
    {
        path: '/:idx',
        name: 'board_idx',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/Board.vue')
        }
    }, {
        path: '/board/register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../views/Register.vue')
        }
    },
    {
        path: '/mypet/addpet',
        name: 'addpet',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../components/Addpet.vue')
        }
    },
    {
        path: '/mypage',
        name: 'mypagee',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../components/Mypage.vue')
        }
    },
    {
        path: '/mypage/modify',
        name: 'modify',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function() {
            return import ( /* webpackChunkName: "about" */ '../components/Modify.vue')
        }
    }
]


const router = new Router({
  //  mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router