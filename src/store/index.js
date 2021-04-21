import { createStore } from 'vuex';
import CoachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';
import AuthModule from './modules/auth/index.js';

const store = createStore({
    modules: {
        coaches: CoachesModule,
        requests: requestsModule,
        auth: AuthModule
    }
});

export default store;