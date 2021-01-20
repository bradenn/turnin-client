import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import Profile from '@/views/Profile'
import Privacy from '@/views/legal/Privacy'
import Terms from '@/views/legal/Terms'
import Dashboard from '@/views/instructor/dashboard/Dashboard'
import DashboardOverview from '@/views/instructor/dashboard/DashboardOverview'
import Assignment from '@/views/instructor/assignment/Assignment'
import AssignmentFiles from '@/views/instructor/assignment/AssignmentFiles'
import Course from '@/views/instructor/course/Course'
import AssignmentOverview from "@/views/instructor/assignment/AssignmentOverview";
import DashboardStudents from "@/views/instructor/dashboard/DashboardStudents";
import DashboardSettings from "@/views/instructor/dashboard/DashboardSettings";
import DashboardNewCourse from "@/views/instructor/dashboard/DashboardNewCourse";
import CourseOverview from "@/views/instructor/course/CourseOverview";
import DashboardAssignments from "@/views/instructor/dashboard/DashboardAssignments";
import DashboardCourses from "@/views/instructor/dashboard/DashboardCourses";
import DashboardNewAssignment from "@/views/instructor/dashboard/DashboardNewAssignment";
import brief from "@/views/instructor/assignment/brief";
import AssignmentSettings from "@/views/instructor/assignment/AssignmentSettings";
import AssignmentTests from "@/views/instructor/assignment/AssignmentTests";
import Submit from "@/views/student/Submit";
import Submission from "@/views/student/Submission";
import AssignmentSubmissions from "@/views/instructor/assignment/AssignmentSubmissions";

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {path: '/', redirect: '/dashboard'},
        {
            path: '/dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '',
                    name: 'DashboardOverview',
                    component: DashboardOverview,
                    meta: {
                        title: 'Overview',
                        requiresAuth: true
                    }
                },
                {
                    path: 'assignments',
                    name: 'DashboardAssignments',
                    component: DashboardAssignments,
                    meta: {
                        title: 'Assignments',
                        requiresAuth: true,
                        button: DashboardNewAssignment
                    }
                },
                {
                    path: 'courses',
                    name: 'DashboardCourses',
                    component: DashboardCourses,
                    meta: {
                        title: 'Courses',
                        requiresAuth: true,
                        button: DashboardNewCourse,
                    }
                },
                {
                    path: 'students',
                    name: 'DashboardStudents',
                    component: DashboardStudents,
                    meta: {
                        title: 'Students',
                        requiresAuth: true
                    }
                },
                {
                    path: 'settings',
                    name: 'DashboardSettings',
                    component: DashboardSettings,
                    meta: {
                        title: 'Settings',
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
            path: '/submission/:submissionId',
            name: 'Submission',
            component: Submission,
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
                    name: 'AssignmentOverview',
                    component: AssignmentOverview,
                    meta: {
                        title: 'Overview',
                        requiresAuth: true
                    }
                },
                {
                    path: 'brief',
                    name: 'brief',
                    component: brief,
                    meta: {
                        title: 'Brief',
                        requiresAuth: true
                    }
                },
                {
                    path: 'files',
                    name: 'AssignmentFiles',
                    component: AssignmentFiles,
                    meta: {
                        title: 'Files',
                        requiresAuth: true
                    }
                },
                {
                    path: 'settings',
                    name: 'AssignmentSettings',
                    component: AssignmentSettings,
                    meta: {
                        title: 'Settings',
                        requiresAuth: true
                    }
                },
                {
                    path: 'submissions',
                    name: 'AssignmentSubmissions',
                    component: AssignmentSubmissions,
                    meta: {
                        title: 'Submissions',
                        requiresAuth: true
                    }
                },
                {
                    path: 'tests',
                    name: 'AssignmentTests',
                    component: AssignmentTests,
                    meta: {
                        title: 'Tests',
                        requiresAuth: true
                    }
                }
            ]
        },

        {
            path: '/course/:courseId',
            component: Course,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '',
                    name: 'CourseOverview',
                    component: CourseOverview,
                    meta: {
                        title: 'Overview',
                        requiresAuth: true
                    }
                },
                {
                    path: 'grades',
                    name: 'CourseGrades',
                    component: CourseOverview,
                    meta: {
                        title: 'Grades',
                        requiresAuth: true
                    }
                },
                {
                    path: 'students',
                    name: 'CourseStudents',
                    component: CourseOverview,
                    meta: {
                        title: 'Students',
                        requiresAuth: true
                    }
                },
                {
                    path: 'settings',
                    name: 'CourseSettings',
                    component: CourseOverview,
                    meta: {
                        title: 'Settings',
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: '/submit/:assignmentId',
            name: 'Submit',
            component: Submit,
            meta: {
                title: 'Submit',
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
    if (to.fullPath === '/logout') {
        localStorage.clear();
        next({path: '/login'})
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user'))

            if (to.matched.some(record => record.meta.isAdmin)) /* Deal with this at some point */
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
