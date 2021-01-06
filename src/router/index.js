import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import Profile from '@/views/Profile'
import Privacy from '@/views/legal/Privacy'
import Terms from '@/views/legal/Terms'
import Dashboard from '@/views/instructor/dashboard/Dashboard'
import DashboardOverview from '@/views/instructor/dashboard/DashboardOverview'
import Assignments from '@/views/instructor/dashboard/Assignments'
import Assignment from '@/views/instructor/assignment/Assignment'
import AssignmentRequirements from '@/views/instructor/assignment/AssignmentRequirements'
import Courses from '@/views/instructor/dashboard/Courses'
import Course from '@/views/instructor/Course'
import AssignmentOverview from "@/views/instructor/assignment/AssignmentOverview";
import DashboardStudents from "@/views/instructor/dashboard/DashboardStudents";
import DashboardSettings from "@/views/instructor/dashboard/DashboardSettings";

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/dashboard' },
        {
            path: '/dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '',
                    name: 'Overview',
                    component: DashboardOverview,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'assignments',
                    name: 'Assignments',
                    component: Assignments,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'courses',
                    name: 'Courses',
                    component: Courses,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'students',
                    name: 'Students',
                    component: DashboardStudents,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'settings',
                    name: 'Settings',
                    component: DashboardSettings,
                    meta: {
                        requiresAuth: true
                    }
                },
            ]
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
            path: '/assignment/:assignmentId',
            component: Assignment,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '',
                    name: 'Overview',
                    component: AssignmentOverview,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'requirements',
                    name: 'Requirements',
                    component: AssignmentRequirements,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
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
        },
        {
            path: '/legal/terms',
            name: 'Terms Of Service',
            component: Terms,
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
