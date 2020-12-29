import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import Profile from '@/views/Profile'
import Privacy from '@/views/legal/Privacy'
import Assignments from '@/views/instructor/Assignments'
import Courses from '@/views/instructor/Courses'
import Course from '@/views/instructor/Course'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/assignments',
            name: 'Assignments',
            component: Assignments,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/courses',
            name: 'Courses',
            component: Courses,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/course/:courseId',
            name: 'Course',
            component: Course,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: '/legal/privacy',
            name: 'Privacy',
            component: Privacy,
            meta: {
                guest: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user'))

            if (to.matched.some(record => record.meta.isAdmin))
                next(user.account !== "student" ? {} : {name: 'Dashboard'})
            else
                next()
        } else {
            next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            })
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (typeof localStorage.getItem('token') !== 'undefined') {
            next()
        } else {
            next({path: '/dashboard', params: {nextUrl: to.fullPath}})
        }
    } else {
        next()
    }
})

export default router
