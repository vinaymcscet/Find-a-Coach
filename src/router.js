import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// import CoachDetail from './pages/coaches/CoachDetail/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived/RequestsReceived.vue';
import NotFound from './pages/NotFound/NotFound.vue';
// import UserAuth from './pages/Auth/UserAuth.vue';
import store from './store/index.js';

const CoachDetail = defineAsyncComponent(() => import('./pages/coaches/CoachDetail/CoachDetail.vue'));
const CoachRegistration = defineAsyncComponent(() => import('./pages/coaches/CoachRegistration/CoachRegistration.vue'));
const ContactCoach = defineAsyncComponent(() => import('./pages/requests/ContactCoach/ContactCoach.vue'));
const RequestsReceived = defineAsyncComponent(() => import('./pages/requests/RequestsReceived/RequestsReceived.vue'));
const UserAuth = defineAsyncComponent(() => import('./pages/Auth/UserAuth.vue'));

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                { path: 'contact', component: ContactCoach } // -> /coaches/c1/contact 
            ]
        },
        { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
        { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});
router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})

export default router;